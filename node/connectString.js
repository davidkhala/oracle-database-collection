import assert from 'assert';
import oracledb from 'oracledb';
import {SQLAlchemy} from '@davidkhala/sql-alchemy/index.js';

const {SYSDBA} = oracledb;
export default class ConnectStringBuilder {
	/**
	 *
	 * @param {string} DBUniqueName
	 * @param {string} hostDomainName
	 */
	constructor(DBUniqueName, hostDomainName) {
		this.DBUniqueName = DBUniqueName;
		this.hostDomainName = hostDomainName;
		this.port = 1521;
	}

	set databaseUniqueName(DBUniqueName) {
		this.DBUniqueName = DBUniqueName;
	}

	set pdbName(name) {
		this.DBUniqueName = name;
	}

	set applicationServiceName(name) {
		this.DBUniqueName = name;
	}

	get serviceName() {
		return `${this.DBUniqueName}.${this.hostDomainName}`;
	}

	setHostnamePrefix(hostPrefix) {
		this.hostPrefix = hostPrefix;
		return this;
	}

	setPublicIP(ip) {
		this.ip = ip;
		return this;
	}

	get FQDN() {

		if (this.ip) {
			return this.ip;
		} else {
			return `${this.hostPrefix}.${this.hostDomainName}`;
		}
	}

	build() {

		return `${this.FQDN}:${this.port}/${this.serviceName}`;
	}

	buildAnalyticServer() {
		return `${this.FQDN}:${this.port}:${this.serviceName}`;
	}

	static isSYSUser(user) {
		return ['SYS'].includes(user.toUpperCase());
	}

	buildDBConfig({user, password}) {
		const config = {
			user, password, connectString: this.build()
		};
		if (ConnectStringBuilder.isSYSUser(user)) {
			config.privilege = SYSDBA;
		}
		return config;
	}

	buildSQLAlchemy({user, password}) {
		const builder = new SQLAlchemy({host: this.FQDN, port: this.port, username: user, password});
		builder._driver = 'oracle';
		return builder.uri();
	}

	buildSQLPlus({user = 'sys', password}) {
		let str = `${user}/${password}@${this.FQDN}/${this.serviceName}`;
		if (ConnectStringBuilder.isSYSUser(user)) {
			str += ' as sysdba';
		}
		return str;
	}
}

export class ConnectStringParser {


	static parse(str) {

		const findEndBracket = (_) => {
			let level = 0;
			let escapeStatus = false;
			for (let i = 0; i < _.length; i++) {
				const char = _[i];
				if (escapeStatus) {
					continue;
				}
				switch (char) {
					case '(':
						level++;
						break;
					case ')':
						level--;
						break;
					case '"':
						escapeStatus = !escapeStatus;
						break;
				}
				if (level === 0) {
					return i;
				}
			}
			return -1;
		};

		const trim = str.replace(/\s/g, '');

		let escapeStatus = false;
		let keyStart = 0, valueStart = 0, valueEnd = 0;
		let key;
		let expectValue = false, isArrayValue = false;
		const result = {};
		for (let charIndex = 0; charIndex < trim.length; charIndex++) {
			const char = trim[charIndex];
			if (char.match(/\w/)) {
				continue;
			}
			if (char === '"') {
				escapeStatus = !escapeStatus;
				if (escapeStatus && expectValue) {
					valueStart = charIndex + 1;
				}
				if (!escapeStatus && expectValue) {
					valueEnd = charIndex;
				}


				continue;
			}
			if (escapeStatus) {
				continue;
			}
			switch (char) {
				case '(':
					if (expectValue) {
						const bracketIndex = findEndBracket(trim.slice(charIndex));
						assert.ok(bracketIndex > 0, 'Invalid format: End bracket not found');
						if (!result[key]) {
							result[key] = {};
						}
						for (const [_key, _value] of Object.entries(this.parse(trim.slice(charIndex, charIndex + bracketIndex + 1)))) {
							result[key][_key] = _value;
						}

						charIndex += bracketIndex;
						isArrayValue = true;
					} else {
						keyStart = charIndex + 1;
					}


					break;
				case '=':
					key = trim.slice(keyStart, charIndex);
					valueStart = charIndex + 1;
					expectValue = !expectValue;
					break;
				case ')':
					if (!isArrayValue) {
						expectValue = !expectValue;
						if (valueEnd === 0) {
							valueEnd = charIndex;
						}
						result[key] = trim.slice(valueStart, valueEnd);
						valueEnd = 0;
					}
					break;
			}
		}
		return result;
	}

}
