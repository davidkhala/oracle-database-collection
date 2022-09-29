export default class ConnectStringBuilder {
	/**
	 *
	 * @param {string} DBUniqueName
	 * @param {string} hostDomainName
	 */
	constructor(DBUniqueName, hostDomainName) {
		this.setDatabaseUniqueName(DBUniqueName)
		this.setHostDomainName(hostDomainName)
	}

	/**
	 *
	 * @param {string} DBUniqueName - Or PDB name, Or application service name
	 * @returns {ConnectStringBuilder}
	 */
	setDatabaseUniqueName(DBUniqueName) {
		this.DBUniqueName = DBUniqueName
		return this
	}

	get serviceName() {
		return `${this.DBUniqueName}.${this.hostDomainName}`
	}

	setHostnamePrefix(hostPrefix) {
		this.hostPrefix = hostPrefix
		return this
	}

	setHostDomainName(hostDomainName) {
		this.hostDomainName = hostDomainName
		return this
	}

	setPublicIP(ip) {
		this.ip = ip
		return this
	}

	build() {
		let FQDN
		if (this.ip) {
			FQDN = this.ip
		} else {
			FQDN = `${this.hostPrefix}.${this.hostDomainName}`;
		}
		return `${FQDN}:${this.port || 1521}/${this.serviceName}`
	}
}