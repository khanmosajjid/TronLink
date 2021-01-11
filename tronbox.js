module.exports = {
	networks: {
		development: {
			// For trontools/quickstart docker image
			privateKey: 'ba98877707981d04f7279954a275dbc05bd47eeb089a39ec67a377fa7fbba51a',
			consume_user_resource_percent: 30,
			fee_limit: 500000000,
			fullNode: 'http://127.0.0.1:8090',
			solidityNode: 'http://127.0.0.1:8091',
			eventServer: 'http://127.0.0.1:8092',
			network_id: '*'
		},
		shasta: {
			privateKey: 'ba98877707981d04f7279954a275dbc05bd47eeb089a39ec67a377fa7fbba51a',
			consume_user_resource_percent: 30,
			fee_limit: 600000000,
			fullHost: 'https://api.shasta.trongrid.io',
			network_id: '*'
		},
		mainnet: {
			// Don't put your private key here, pass it using an env variable, like:
			// PK=da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0 tronbox migrate --network mainnet
			privateKey: process.env.PK,
			consume_user_resource_percent: 30,
			fee_limit: 100000000,
			fullHost: 'https://api.trongrid.io',
			network_id: '*'
		}
	}
};
