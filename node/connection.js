import oracledb from 'oracledb';

/**
 * non-pooled connection
 */
export default class ConnectionManager {
	/**
	 * @param user
	 * @param password
	 * @param connectString
	 * @param walletDir
	 * @param [logger]
	 */
	constructor({user, password, connectString}, walletDir, logger = console) {

		Object.assign(this, {user, password, connectString, logger});
		if (walletDir) {
			oracledb.initOracleClient({configDir: walletDir});
		}
	}

	async _connectIfNotExist() {
		if (!this.connection) {
			await this.connect();
		}
	}

	async ping() {
		return this.connection.ping();
	}

	async connect() {
		const connection = await oracledb.getConnection(this);
		this.logger.info('Connection was successful!');
		this.connection = connection;
	}

	async close() {
		const connection = this.connection;
		if (connection) {
			await connection.close();
		}
	}

	/**
	 * @typedef {Error} ExecuteError
	 * @property {number} errorNum
	 * @property {number} offset
	 */

	/**
	 * @param {string} SQL
	 * @throws {ExecuteError}
	 */
	async execute(SQL) {
		await this._connectIfNotExist();
		if (SQL.includes(';')) {
			const sentences = SQL.split(';');
			const resultSet = [];
			for (const sentence of sentences) {
				const trimmed = sentence.trim();
				if (trimmed) {
					const result = await this.connection.execute(trimmed);
					resultSet.push(result);
				}
			}
			return resultSet;
		} else {
			const result = await this.connection.execute(SQL);
			return [result];
		}
	}

}
