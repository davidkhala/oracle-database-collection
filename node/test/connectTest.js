import ConnectionManager from '../connection.js'
import Builder from '../connectString.js'
import DBConfig from '../dbConfig.js'
describe('non-pool connection', () => {
	const {password, DBUniqueName, hostDomainName, ip} = process.env;
	it('touch', async () => {
		const config = new DBConfig({
			user: "sys",
			password,
			connectString: new Builder(DBUniqueName, hostDomainName).setPublicIP(ip).build()
		})
		const connectionBuilder = new ConnectionManager(config)
		await connectionBuilder.connect()
		await connectionBuilder.close()
	})


})