import {ConnectStringParser} from '../connectString.js';

describe('connection', function () {
    this.timeout(0);


    it('connect string parser', () => {
        const str = ` 	(description=
            (retry_count=20)
            (retry_delay=3)
            (address=(protocol=tcps)(port=1522)(host=adb.ap-singapore-1.oraclecloud.com))
        (connect_data=(service_name=g2deddcd02b6db5_adw_high.adb.oraclecloud.com))
        (security=(ssl_server_cert_dn="CN=adb.ap-singapore-1.oraclecloud.com, OU=Oracle ADB SINGAPORE, O=Oracle Corporation, L=Redwood City, ST=California, C=US"))
    )`;
        const str1 = '(abc=1)';
        const str2 = '(description=(retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.ap-singapore-1.oraclecloud.com))(connect_data=(service_name=g2deddcd02b6db5_adw_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adb.ap-singapore-1.oraclecloud.com, OU=Oracle ADB SINGAPORE, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))';
        const str3 = '(abc=1)(second = (retry_count=20))';

        console.debug(ConnectStringParser.parse(str1));
        console.debug(ConnectStringParser.parse(str3));
        console.debug(ConnectStringParser.parse(str2));
        console.debug(ConnectStringParser.parse(str))
    });


});
