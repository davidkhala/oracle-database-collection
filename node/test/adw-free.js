import Oracle from "../connection.js";

describe('adw', function () {
    this.timeout(0);
    it('connect', async () => {
        const username = "ADMIN"
        const password = process.env.adw_password;
        const db = new Oracle({username, password})
        await db.connect('(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ap-seoul-1.oraclecloud.com))(connect_data=(service_name=ukyllmqvbnkwzdy_adw_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))')
        await db.disconnect()
    })
})
