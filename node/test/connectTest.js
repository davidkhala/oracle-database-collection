import ConnectionManager from '../connection.js'
import Builder, {ConnectStringParser} from '../connectString.js'
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

    it('connect string parser', () => {
        const str = ` 	(description=
            (retry_count=20)
            (retry_delay=3)
            (address=(protocol=tcps)(port=1522)(host=adb.ap-singapore-1.oraclecloud.com))
        (connect_data=(service_name=g2deddcd02b6db5_adw_high.adb.oraclecloud.com))
        (security=(ssl_server_cert_dn="CN=adb.ap-singapore-1.oraclecloud.com, OU=Oracle ADB SINGAPORE, O=Oracle Corporation, L=Redwood City, ST=California, C=US"))
    )`
        const str1 = '(abc=1)'
        const str2 = `(description=(retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.ap-singapore-1.oraclecloud.com))(connect_data=(service_name=g2deddcd02b6db5_adw_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adb.ap-singapore-1.oraclecloud.com, OU=Oracle ADB SINGAPORE, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))`

        const result = ConnectStringParser.parse(str2)
        console.debug({result})
    })

})
