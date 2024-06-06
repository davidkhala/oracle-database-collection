import org.davidkhala.oracledb.RawConnect;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;

class ConnectTest {
    String adwConnectionString = "oracle:thin:@(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ap-seoul-1.oraclecloud.com))(connect_data=(service_name=ukyllmqvbnkwzdy_adw_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))";
    @Test
    void ADWFree() throws SQLException {
        RawConnect db = new RawConnect(adwConnectionString, "ADMIN", System.getenv("adw_password"));
        db.connect();
        db.disconnect();
    }


}
