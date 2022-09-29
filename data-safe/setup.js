/**
 * Reference: https://docs.oracle.com/en-us/iaas/data-safe/doc/register-db-systems-that-have-public-ip-addresses.html#UDSCS-GUID-06A42C4E-1132-4E80-8F83-E553FB3A8AED
 */
export default class DataSafeSetup {
	/**
	 *
	 * @param {ConnectionManager} connectionManager
	 */
	constructor(connectionManager) {
		this.connectionManager = connectionManager
		this.logger = connectionManager.logger
	}

	/**
	 * Common user is CDB user: https://docs.oracle.com/database/121/ADMQS/GUID-DA54EBE5-43EF-4B09-B8CC-FAABA335FBB8.htm
	 * @param {string} DATASAFE_ADMIN
	 * @param {string} password
	 * @param {string} defaultTablespace
	 */
	async createServiceAccount(DATASAFE_ADMIN, password, defaultTablespace = 'USERS') {
		if (['SYSTEM', 'SYSAUX'].includes(defaultTablespace.toUpperCase())) {
			throw Error(`Do not use 'SYSTEM' or 'SYSAUX' as the default tablespace. You cannot mask data if you use these tableSpaces.`)
		}

		const row1 = `CREATE USER ${DATASAFE_ADMIN} identified by "${password}" DEFAULT TABLESPACE "${defaultTablespace}" TEMPORARY TABLESPACE "TEMP"`
		try {
			await this.connectionManager.execute(row1)
		} catch (err) {
			if (err.errorNum === 65096) {
				this.logger.error(`Mostly you should connect to Pluggable DB than Container DB. Please inspect 'connectString':${this.connectionManager.config.connectString}`)
			}
			throw err
		}

		const row2 = `GRANT CONNECT,RESOURCE TO ${DATASAFE_ADMIN}`
		await this.connectionManager.execute(row2)
	}

	async deleteServiceAccount(DATASAFE_ADMIN) {
		const SQL = `DROP USER ${DATASAFE_ADMIN} CASCADE`
		await this.connectionManager.execute(SQL)
	}

}

/**
 *
 * @enum {string}
 */
DataSafeSetup.DataSafeFeatures = {
	AUDIT_COLLECTION: 'AUDIT_COLLECTION',
	AUDIT_SETTING: 'AUDIT_SETTING',
	DATA_DISCOVERY: 'DATA_DISCOVERY',
	MASKING: 'MASKING',
	ASSESSMENT: 'ASSESSMENT',
	ALL: 'ALL'
}

