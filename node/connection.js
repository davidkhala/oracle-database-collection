import DB from '@davidkhala/db/index.js'
import oracledb from 'oracledb';
import Builder from "./connectString.js";

/**
 * non-pooled connection
 */
export default class Oracle extends DB {
    /**
     *
     * @param domain
     * @param username
     * @param password
     * @param name
     * @param [connectString]
     * @param [logger]
     * @param [configDir] wallet directory
     * @param [libDir] InstantClient directory. Use to enable node-oracledb Thick mode
     */
    constructor({domain, username, password, name, libDir, configDir}, connectString, logger = console) {
        super({domain, username, password, port: 1521, name}, connectString, logger)

        if (configDir || libDir) {
            oracledb.initOracleClient({configDir, libDir});
        }
    }

    get connectionString() {
        if (this._connectionString) {
            return this._connectionString;
        }
        return `${this.domain}:${this.port}/${this.name}`
    }


    async ping() {
        return this.connection.ping();
    }

    async connect() {
        const {username: user, password, domain, name, port} = this
        const builder = new Builder(name, port)
        builder.ip = domain
        const config = builder.buildDBConfig({user, password})

        this.connection = await oracledb.getConnection(config);
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
