import DB from '@davidkhala/db/index.js'
import oracledb from 'oracledb';

/**
 * non-pooled connection
 */
export default class ConnectionManager extends DB {
    constructor({domain, username, password}, connectString, logger = console, walletDir) {
        super({domain, username, password, dialect: 'oracle', port: 1521}, connectString, logger)
        if (walletDir) {
            oracledb.initOracleClient({configDir: walletDir});
        }
    }


    async ping() {
        return this.connection.ping();
    }

    async connect() {

        const {username: user, password, connectionString} = this
        this.connection = await oracledb.getConnection({user, password, connectionString});
    }

    async disconnect() {
        await this.connection.close();
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
