import ConnectionManager from '../connection.js'
import Builder, {ConnectStringParser} from '../connectString.js'
import DBConfig from '../dbConfig.js'
const touch = async ({password, DBUniqueName, hostDomainName, ip, connectString}) => {
    if (!connectString) {
        connectString = new Builder(DBUniqueName, hostDomainName).setPublicIP(ip).build()
    }
    const config = new DBConfig({
        user: "sys",
        password,
        connectString,
    })
    const connectionBuilder = new ConnectionManager(config)
    await connectionBuilder.connect()
    await connectionBuilder.close()
}
describe('connection', function () {
    this.timeout(0)

    it('from env', async () => {
        const {password, DBUniqueName, hostDomainName, ip} = process.env;
        await touch({password, DBUniqueName, hostDomainName, ip})
    })
    it('for oas pdb', async () => {
        const password = 'David-KL04#';
        const connectString = '138.2.80.190:1521/DBSystem_pdb1.public.insecure.oraclevcn.com'
        await touch({password, connectString})
    })
    it('for oas cdb: builder', async () => {
        // work within subnet
        const password = 'David-KL04#';
        const DBUniqueName = 'DBSystem_oas';
        const hostDomainName = 'public.insecure.oraclevcn.com';
        const ip = '138.2.80.190'
        await touch({password, DBUniqueName, hostDomainName, ip})
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
        const str3 = '(abc=1)(second = (retry_count=20))'

        console.debug(ConnectStringParser.parse(str1))
        console.debug(ConnectStringParser.parse(str2))
        console.debug(ConnectStringParser.parse(str3))
    })
    it('dev', ()=>{

        const str = `
         	(description=
                (retry_count=20)
                (retry_delay=3)
                (address=
                    (protocol=tcps)
                    (port=1522)
                    (host=adb.ap-singapore-1.oraclecloud.com)
                )
                (connect_data=(service_name=g2deddcd02b6db5_adw_high.adb.oraclecloud.com))
                (security=(ssl_server_cert_dn="CN=adb.ap-singapore-1.oraclecloud.com, OU=Oracle ADB SINGAPORE, O=Oracle Corporation, L=Redwood City, ST=California, C=US"))
    )`
        console.warn(JSON.stringify(ConnectStringParser.parse(str)))
    })

})
