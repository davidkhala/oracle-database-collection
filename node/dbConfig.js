import oracledb from 'oracledb'

const {SYSDBA} = oracledb

export default class DbConfig {
	/**
	 *
	 * @param user
	 * @param password
	 * @param connectString
	 * @param [walletDir]
	 */
	constructor({user, password, connectString}, walletDir) {
		const config = {user, password, connectString}
		if (['SYS'].includes(user.toUpperCase())) {
			config.privilege = SYSDBA
		}
		Object.assign(this, config)
		if (walletDir) {
			oracledb.initOracleClient({configDir: walletDir});
		}
	}
}
