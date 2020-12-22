pragma solidity >=0.5.4;

contract MyTron{
    using SafeMath for uint256;
    
    uint256 constant MIN_AMOUNT =100000000;             // 100 TRX
    uint256 constant BASE_PERCENT = 120;                // 1.2% base profit
    uint256 constant internal MILLION = 1000;
    uint256 constant internal TIME_STAMP = 2;      // 1 day
    uint256 constant internal TRX = 1000000;
    uint256 constant internal THOUS = 1;
    
    uint256 public totalUsers;
	uint256 public totalInvested;
	uint256 public totalWithdrawn;
	uint256 public totalDeposits;
	uint256 public maxBalance;
	uint256 public adminWallet;
	
	address payable internal tradingPool;   //70% trading amount goes to this address
	address payable internal owner;

    struct Deposit {
		uint256 amount;
		uint256 withdrawn;
		uint256 start;
		bool isExpired;
	}

	struct User{
	    uint256 referrals;
	    Deposit[] deposits;
	    address referrer;
	    uint256 checkpoint;
	    uint256 weeklyLastWithdraw;
	    uint256 total_structure;
	    uint256 totalDownlineBalance;
	    uint256 level;
	    bool isExist;
	    uint256 totalWithdrawn_;
	    uint256 levelIncome;
	    uint256 binaryCommissionEarned;
	    uint256 dailyProfitEarned;
	}
	
	struct UserLevels{
	    uint256 level1;
	    uint256 level2;
	    uint256 level3;
	    uint256 level4;
	    uint256 level5;
	    uint256 level6;
	    uint256 level7;
	    uint256 level8;
	    uint256 level9;
	    uint256 level10;
	}
	
	mapping(address => User) public users;
	mapping(address => UserLevels) internal usersLevels;
	
	event Newbie(address indexed user);
	event NewDeposit(address indexed user, uint256 amount);
    event Withdrawn(uint256 amount, uint256 prev, uint256 curr, uint256 diff);
    event binaryEvent(uint256 amount, uint256 prev, uint256 curr, uint256 diff);

    constructor(address payable _tradingPool, address payable _owner) public {
		require(!isContract(_tradingPool));
	    tradingPool = _tradingPool;
		owner = _owner;
	}


    // function to deposit amount
    function invest(address _referrer) public payable{
        require(msg.value>=MIN_AMOUNT , "It should be greater than min value");
        
	    User storage user = users[msg.sender];
	    _referrer = setReferrer(_referrer);
	    
	    if (user.deposits.length == 0) {
    		user.checkpoint = block.timestamp;
    		user.weeklyLastWithdraw = block.timestamp;
    		user.level = 3;
    		user.isExist=true;
    		totalUsers = totalUsers.add(1);
    		emit Newbie(msg.sender);
    	}
    	
	    users[_referrer].referrals =  users[_referrer].referrals.add(1);
	    users[msg.sender].referrer = _referrer;
	    
	    user.deposits.push(Deposit(msg.value, 0, block.timestamp, false));
	    emit NewDeposit(msg.sender, msg.value);
	    
	    if (address(this).balance > maxBalance) {
    		maxBalance = address(this).balance;
    	}
    
    	totalInvested = totalInvested.add(msg.value);
    	totalDeposits = totalDeposits.add(1);
    	
    	setDownlineVolume(msg.value);
    	
    	//give 70% to admin
        adminWallet = adminWallet.add(msg.value.mul(7).div(10));
        tradingPool.transfer(msg.value.mul(7).div(10));
        
        setUplines(msg.sender);
        giveCommission(msg.sender,msg.value);
    }
    
    // function to set the referrer (invest)
    function setReferrer(address _referrer) internal view returns(address){
        User storage user = users[msg.sender];
	    if(user.referrer==address(0)){
    	    if((_referrer == msg.sender || _referrer==address(0) || users[_referrer].isExist==false) && msg.sender!=owner ){
    	        _referrer=owner;
    	    }
    	    
    	    else if(msg.sender==owner){
    	        _referrer=address(0);
    	    }
	    }
	    else{
	        _referrer = user.referrer;
	    }
	    return _referrer;
    }
    
    // function to check if valid address or not (cconstructor)
    function isContract(address addr) internal view returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }
    
    // function to set the downline volume (invest)
    function setDownlineVolume(uint256 _amount) internal{
        address upline = users[msg.sender].referrer;
        for(uint256 i=0;i<10;i++){
            if(upline==address(0)){
                break;
            }
            users[upline].totalDownlineBalance = users[upline].totalDownlineBalance.add(_amount);
            setLevel(upline);
            upline = users[upline].referrer;
        }
    }
    
    // function to decrement the downline volume upto 10 levels if the investment of downline expired (withdraw)
    function decrementDownlineVolume(uint256 _amount) internal{
        address upline = users[msg.sender].referrer;
        for(uint256 i=0;i<10;i++){
            if(upline==address(0)){
                break;
            }
            users[upline].totalDownlineBalance = users[upline].totalDownlineBalance.sub(_amount);
            upline = users[upline].referrer;
        }
    }

    // function to give level commision (invest)   
    function giveCommission(address _user,uint256 _amount) internal{
        address _upline = users[_user].referrer;
        for(uint256 i=1;i<=10;i++){
            if(_upline==address(0))
            break;
            
            if(i==1){
                if(users[_upline].level>=i){
                    users[_upline].levelIncome = users[_upline].levelIncome.add(_amount.mul(4).div(100));
                    address(uint256(_upline)).transfer(_amount.mul(4).div(100));
                    totalWithdrawn = totalWithdrawn.add(_amount.mul(4).div(100));
                }
            }
             if(i==2){
                if(users[_upline].level>=i){
                    users[_upline].levelIncome = users[_upline].levelIncome.add(_amount.mul(3).div(100));
                    address(uint256(_upline)).transfer(_amount.mul(3).div(100));
                    totalWithdrawn = totalWithdrawn.add(_amount.mul(3).div(100));
                }
            }
             if(i==3){
                if(users[_upline].level>=i){
                    users[_upline].levelIncome = users[_upline].levelIncome.add(_amount.mul(2).div(100));
                    address(uint256(_upline)).transfer(_amount.mul(2).div(100));
                    totalWithdrawn = totalWithdrawn.add(_amount.mul(2).div(100));
                }
            }
             if(i==4){
                if(users[_upline].level>=i){
                    users[_upline].levelIncome = users[_upline].levelIncome.add(_amount.mul(1).div(100));
                    address(uint256(_upline)).transfer(_amount.mul(1).div(100));
                    totalWithdrawn = totalWithdrawn.add(_amount.mul(1).div(100));
                }
            }
             if(i==5){
                if(users[_upline].level>=i){
                    users[_upline].levelIncome = users[_upline].levelIncome.add(_amount.mul(1).div(100));
                    address(uint256(_upline)).transfer(_amount.mul(1).div(100));
                    totalWithdrawn = totalWithdrawn.add(_amount.mul(1).div(100));
                }
            }
             if(i==6){
                if(users[_upline].level>=i){
                    users[_upline].levelIncome = users[_upline].levelIncome.add(_amount.mul(1).div(100));
                    address(uint256(_upline)).transfer(_amount.mul(1).div(100));
                    totalWithdrawn = totalWithdrawn.add(_amount.mul(1).div(100));
                }
            }
             if(i==7){
                if(users[_upline].level>=i){
                    users[_upline].levelIncome = users[_upline].levelIncome.add(_amount.mul(5).div(1000));
                    address(uint256(_upline)).transfer(_amount.mul(5).div(1000));
                    totalWithdrawn = totalWithdrawn.add(_amount.mul(5).div(1000));
                }
            }
             if(i==8){
                if(users[_upline].level>=i){
                    users[_upline].levelIncome = users[_upline].levelIncome.add(_amount.mul(5).div(1000));
                    address(uint256(_upline)).transfer(_amount.mul(5).div(1000));
                    totalWithdrawn = totalWithdrawn.add(_amount.mul(5).div(1000));
                }
            }
             if(i==9){
                if(users[_upline].level>=i){
                    users[_upline].levelIncome = users[_upline].levelIncome.add(_amount.mul(5).div(1000));
                    address(uint256(_upline)).transfer(_amount.mul(5).div(1000));
                    totalWithdrawn = totalWithdrawn.add(_amount.mul(5).div(1000));
                }
            }
             if(i==10){
                if(users[_upline].level>=i){
                    users[_upline].levelIncome = users[_upline].levelIncome.add(_amount.mul(5).div(1000));
                    address(uint256(_upline)).transfer(_amount.mul(5).div(1000));
                    totalWithdrawn = totalWithdrawn.add(_amount.mul(5).div(1000));
                }
            }
            _upline = users[_upline].referrer;
        }
    }
    
    // function to get binary commision (withdraw)
    function getBinaryBalance(address _user) public view returns(uint256){
        uint256 vol=getTotalTeamDepositVolume(_user);
        if(vol>=MILLION.mul(500).mul(TRX)){
            return vol.mul(2).div(100);
        }
         if(vol>=MILLION.mul(100).mul(TRX)){
            return vol.mul(15).div(1000);
        }
        
        if(vol>=MILLION.mul(50).mul(TRX)){
            return vol.mul(1).div(100);
        }
       
        if(vol>=MILLION.mul(10).mul(TRX)){
            return (vol.mul(5).div(1000));
        }
        return 0;
    }
    
    // function to unlock levels of upline when downline invests (invest) 
    function setLevel(address _user) internal{
         uint256 vol=getTotalTeamDepositVolume(_user);
   
        if(vol>=TRX.mul(500).mul(MILLION)){
            if(users[_user].level<10)
            if(users[_user].level!=10){
            users[_user].level = 10;
            users[_user].weeklyLastWithdraw = block.timestamp;
            }
        }

        if(vol>=TRX.mul(100).mul(MILLION)){
            if(users[_user].level<9)
            if(users[_user].level!=9){
            users[_user].level = 9;
            users[_user].weeklyLastWithdraw = block.timestamp;
            }
        }
        
        if(vol>=TRX.mul(50).mul(MILLION)){
            if(users[_user].level<8)
            if(users[_user].level!=8){
            users[_user].level = 8;
            users[_user].weeklyLastWithdraw = block.timestamp;
            }
        }
    
        if(vol>=TRX.mul(10).mul(MILLION)){
            if(users[_user].level<7)
            if(users[_user].level!=7){
            users[_user].level = 7;
            users[_user].weeklyLastWithdraw = block.timestamp;
            }
        }

        if(vol>=TRX.mul(5).mul(MILLION)){
            if(users[_user].level<6)
            users[_user].level = 6;
        }
                    
        if(vol>=TRX.mul(1).mul(MILLION)){
            if(users[_user].level<5)
            users[_user].level = 5;
        }

        if(vol>=TRX.mul(100).mul(THOUS)){
            if(users[_user].level<4)
            users[_user].level = 4;
        }
    }
    
    // function to set upline i.e. to set levels count and total team size (invest)
    function setUplines(address _user) internal{
	    address _upline=users[_user].referrer;
	   
	    for(uint8 i = 0; i < 10; i++) {
                if(_upline == address(0)) break;
                users[_upline].total_structure = users[_upline].total_structure.add(1);
                if(i==0){
                    usersLevels[_upline].level1 =  usersLevels[_upline].level1.add(1);
                }
                if(i==1){
                    usersLevels[_upline].level2 =  usersLevels[_upline].level2.add(1);
                }
                if(i==2){
                    usersLevels[_upline].level3 =  usersLevels[_upline].level3.add(1);
                }
                if(i==3){
                    usersLevels[_upline].level4 =  usersLevels[_upline].level4.add(1);
                }
                if(i==4){
                    usersLevels[_upline].level5 =  usersLevels[_upline].level5.add(1);
                }
                if(i==5){
                    usersLevels[_upline].level6 =  usersLevels[_upline].level6.add(1);
                }
                if(i==6){
                    usersLevels[_upline].level7 =  usersLevels[_upline].level7.add(1);
                }
                if(i==7){
                    usersLevels[_upline].level8 =  usersLevels[_upline].level8.add(1);
                }
                if(i==8){
                    usersLevels[_upline].level9 =  usersLevels[_upline].level9.add(1);
                }
                if(i==9){
                    usersLevels[_upline].level10 =  usersLevels[_upline].level10.add(1);
                }
                _upline = users[_upline].referrer;
            }
	}
	
	// function to get personal referral bonus %
	function getExtraProfit(address _user) public view returns(uint256){
	    uint256 percent = 0;
	    if(getUserTotalDeposits(_user)>=TRX.mul(100).mul(THOUS)){
	        percent = (getUserTotalDeposits(_user).div(TRX.mul(100).mul(THOUS))).mul(5);
	    }
	   
	    if(percent>=50)
	    percent = 50;
	    
	    return percent;
	}
    
    // function to get total percent (base+personal)
    function totalDailyPercent(address _user) public view returns(uint256){
        return 120+getExtraProfit(_user);
    }
    
    // function to withdraw amount (base+personal+binary)
	function withdraw() public{
	    User storage user = users[msg.sender];

        require(isActive(msg.sender),"User is not an active user");
		uint256 totalAmount;
		uint256 dividends;

    // amount for all deposits which can be maximum 200%
		for (uint256 i = 0; i < user.deposits.length; i++) {

			if (user.deposits[i].withdrawn < user.deposits[i].amount.mul(2)) {

				if (user.deposits[i].start > user.checkpoint) {

					dividends = (user.deposits[i].amount.mul(totalDailyPercent(msg.sender)))
						.mul(block.timestamp.sub(user.deposits[i].start))
						.div(TIME_STAMP.mul(10000));

				} else {

				    dividends = (user.deposits[i].amount.mul(totalDailyPercent(msg.sender)))
						.mul(block.timestamp.sub(user.checkpoint))
						.div(TIME_STAMP.mul(10000));
				}

				if (user.deposits[i].withdrawn.add(dividends) > user.deposits[i].amount.mul(2)) {
					dividends = (user.deposits[i].amount.mul(2)).sub(user.deposits[i].withdrawn);
					decrementDownlineVolume(user.deposits[i].amount);
					user.deposits[i].isExpired = true;
				}
                
                emit Withdrawn(dividends,user.checkpoint,block.timestamp,block.timestamp.sub(user.checkpoint));
				user.deposits[i].withdrawn = user.deposits[i].withdrawn.add(dividends); /// changing of storage data
				totalAmount = totalAmount.add(dividends);

			}
			
		}
		if(totalAmount>0){
		    user.checkpoint = block.timestamp;
		}

		user.dailyProfitEarned = user.dailyProfitEarned.add(totalAmount);
			
		uint256 binaryBalance;
		if(getBinaryBalance(msg.sender)>0 && block.timestamp.sub(users[msg.sender].weeklyLastWithdraw)>TIME_STAMP.mul(7)){
		   binaryBalance = getBinaryBalance(msg.sender).mul(block.timestamp.sub(users[msg.sender].weeklyLastWithdraw)).div(TIME_STAMP.mul(7));
	        emit binaryEvent(binaryBalance,user.weeklyLastWithdraw,block.timestamp,block.timestamp.sub(user.weeklyLastWithdraw));
	        user.weeklyLastWithdraw = block.timestamp;
		    user.binaryCommissionEarned = user.binaryCommissionEarned.add(binaryBalance);
		}
        
        totalAmount = totalAmount.add(binaryBalance);
		require(totalAmount > 0, "User has no dividends");

		uint256 contractBalance = address(this).balance;
		if (contractBalance < totalAmount) {
			totalAmount = contractBalance;
		}

	

		msg.sender.transfer(totalAmount);

		totalWithdrawn = totalWithdrawn.add(totalAmount);
	    users[msg.sender].totalWithdrawn_ = users[msg.sender].totalWithdrawn_.add(totalAmount);
	}
	
	// function to add fund to contract
	function deposit() external payable{
	    adminWallet = adminWallet.sub(msg.value);
	}
    
    // function to get referrer
	function getUserReferrer(address userAddress) public view returns(address) {
		return users[userAddress].referrer;
	}
    
    // function to get user's deposit info -->deposit amount, withdrawn amount, timestamp of deposit time and isExpired
	function getUserDepositInfo(address userAddress, uint256 index) public view returns(uint256 _amount, uint256 _withdrawn, uint256 _start, bool _isExpired) {
	    User storage user = users[userAddress];

		return (user.deposits[index].amount, user.deposits[index].withdrawn, user.deposits[index].start, user.deposits[index].isExpired);
	}

    // function to count total deposits number
	function getUserTotalNumberOfDeposits(address userAddress) public view returns(uint256) {
		return users[userAddress].deposits.length;
	}

    // function to count total deposits amount
	function getUserTotalDeposits(address userAddress) public view returns(uint256) {
	    User storage user = users[userAddress];

		uint256 amount;

		for (uint256 i = 0; i < user.deposits.length; i++) {
			amount = amount.add(user.deposits[i].amount);
		}

		return amount;
	}
    
    // function to get total active deposits amount
    function getUserTotalActiveDeposits(address userAddress) public view returns(uint256) {
	    User storage user = users[userAddress];

		uint256 amount;

		for (uint256 i = 0; i < user.deposits.length; i++) {
		    if(!user.deposits[i].isExpired)
			amount = amount.add(user.deposits[i].amount);
		}

		return amount;
	}
	
	// function to get total expired deposits amount
	function getUserTotalExpiredDeposits(address userAddress) public view returns(uint256) {
	    User storage user = users[userAddress];

		uint256 amount;

		for (uint256 i = 0; i < user.deposits.length; i++) {
		    if(user.deposits[i].isExpired)
			amount = amount.add(user.deposits[i].amount);
		}

		return amount;
	}
	
	// function to get total amount withdrawn by user
	function getUserTotalWithdrawn(address userAddress) public view returns(uint256) {
	    User storage user = users[userAddress];

		uint256 amount;

		for (uint256 i = 0; i < user.deposits.length; i++) {
			amount = amount.add(user.deposits[i].withdrawn);
		}

		return amount;
	}
    
    // function to get binary balance left for withdrawl
    function getBinaryBalanceLeftForWithdrawl(address _user) public view returns(uint256){
        uint256 binaryBalance = 0;
        if(isActive(_user)){
         binaryBalance = getBinaryBalance(_user).mul(block.timestamp.sub(users[msg.sender].weeklyLastWithdraw)).div(TIME_STAMP.mul(7));
        }
    }
        
    // function to check if user is active ie. it has withdrawn 200% of all investment
    function isActive(address userAddress) public view returns (bool) {
		User storage user = users[userAddress];

		if (user.deposits.length > 0) {
			if (user.deposits[user.deposits.length-1].withdrawn < user.deposits[user.deposits.length-1].amount.mul(5).div(2)) {
				return true;
			}
		}
	}
	
	// function to get personal referrals bonus percent
    function getUserDailyProfit(address _user) public view returns(uint256){
        User storage user = users[_user];
        uint256 totalAmount;
		uint256 dividends;

    // amount for all deposits which can be maximum 200%
		for (uint256 i = 0; i < user.deposits.length; i++) {

			if (user.deposits[i].withdrawn < user.deposits[i].amount.mul(2)) {

				if (user.deposits[i].start > user.checkpoint) {

					dividends = (user.deposits[i].amount.mul(totalDailyPercent(msg.sender)))
						.mul(block.timestamp.sub(user.deposits[i].start))
						.div(TIME_STAMP.mul(10000));

				} else {

				dividends = (user.deposits[i].amount.mul(totalDailyPercent(msg.sender)))
						.mul(block.timestamp.sub(user.checkpoint))
						.div(TIME_STAMP.mul(10000));
				}

				if (user.deposits[i].withdrawn.add(dividends) > user.deposits[i].amount.mul(2)) {
					dividends = (user.deposits[i].amount.mul(2)).sub(user.deposits[i].withdrawn);
				}
                
             	totalAmount = totalAmount.add(dividends);

			}
		}
		return totalAmount;
    }
    
    // function to get total earned amount through daily profit till now
    function totalEarnedFromDailyProfit(address _user) public view returns(uint256){
        return users[_user].dailyProfitEarned;
    }
    
    // function to get referral commision earned so far
    function getTotalReferralCommissionEarned(address _user)public view returns(uint256){
        return users[_user].levelIncome;
    }
    
    // function to get levels unlocked
    function getReferralsLevelsUnlocked(address _user) public view returns(uint256){
       return users[_user].level;
    }
    
    // function to get total of all the deposits in the downline  (only active investments counted)
    function getTotalTeamDepositVolume(address _user) public view returns(uint256){
        return users[_user].totalDownlineBalance;
    }
    
    // function to get binary commision earned so far
    function getBinaryCommissionEarnedSoFar(address _user) public view returns(uint256){
        return users[_user].binaryCommissionEarned;
    }
    
    // function to get referrals count 
    function getReferrals(address _user) public view returns(uint256){
        return users[_user].referrals;
    }
    
    // function to get total team size
    function getTotalTeamMembers(address _user) public view returns(uint256){
       return  users[_user].total_structure;
    }
    
    // function to get count of users in each level
    function getLevelWiseCount(address _user,uint256 _level) public view returns(uint256){
	    if(_level==1){
	        return usersLevels[_user].level1;
	    }
	     if(_level==2){
	        return usersLevels[_user].level2;
	    }
	     if(_level==3){
	        return usersLevels[_user].level3;
	    }
	     if(_level==4){
	        return usersLevels[_user].level4;
	    }
	     if(_level==5){
	        return usersLevels[_user].level5;
	    }
	     if(_level==6){
	        return usersLevels[_user].level6;
	    }
	     if(_level==7){
	        return usersLevels[_user].level7;
	    }
	     if(_level==8){
	        return usersLevels[_user].level8;
	    }
	     if(_level==9){
	        return usersLevels[_user].level9;
	    }
	     if(_level==10){
	        return usersLevels[_user].level10;
	    }
	}
	
    // function to get total users in the system
	function getTotalVolume() public view returns(uint256){
	    return totalUsers;
	}
	
	// function to get total deposit amount in the contract
	function getTotalDepositsAmount() public view returns(uint256){
	    return totalInvested;
	}
	
	// function to get total amount withdrawn so far
	function getTotalWithdrawn() public view returns(uint256){
	    return totalWithdrawn;
	}
	
    // function to get amount stored in tradingPool
	function getAmountInTradingPool() public view returns(uint256){
	    return adminWallet;
	}
	
	// function to get contract balance
	function getContractBalance() public view returns(uint256){
	    return address(this).balance;
	}
    
}

library SafeMath {

    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;

        return c;
    }
}