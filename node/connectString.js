export default class ConnectStringBuilder {
    /**
     *
     * @param {string} DBUniqueName
     * @param {string} hostDomainName
     */
    constructor(DBUniqueName, hostDomainName) {
        this.databaseUniqueName = DBUniqueName
        this.setHostDomainName(hostDomainName)
    }

    set databaseUniqueName(DBUniqueName) {
        this.DBUniqueName = DBUniqueName
    }
    set pdbName(name){
        this.DBUniqueName = name
    }
    set applicationServiceName(name){
        this.DBUniqueName = name
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

    get FQDN(){

        if (this.ip) {
            return this.ip
        } else {
            return `${this.hostPrefix}.${this.hostDomainName}`;
        }
    }
    build() {

        return `${this.FQDN}:${this.port || 1521}/${this.serviceName}`
    }
    buildForAnalyticServer(){
        return `${this.FQDN}:${this.port || 1521}:${this.serviceName}`
    }
}

export class ConnectStringParser {


    // TODO
    static unitParse(str) {
        const strTrimmed = str.trim()
        const noBrackets = strTrimmed.replace(/^\(|\)$/g, '');

        console.debug(noBrackets)
        const tokens = noBrackets.match(/.*(?<==)/)

        console.debug({tokens})

        // const [key, value] = noBrackets.split('=')
        // console.debug({key,value})
        //
        // return {
        //     [key.trim()]: ConnectStringParser.unitParse(value)
        // }
    }

}
