import org.davidkhala.oracledb.RawConnect;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;
import java.util.Properties;

class ConnectTest {
    @Test
    void ADWFree() {

//        jdbc:oracle:thin:@(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ap-seoul-1.oraclecloud.com))(connect_data=(service_name=ukyllmqvbnkwzdy_adw_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))
    }
    @Test
    void localhostDocker(){


    }
    @Test
    void trueCache() throws SQLException {
        Properties props = new Properties();
        props.setProperty("oracle.jdbc.useTrueCacheDriverConnection", "true");
        RawConnect rawConnect = new RawConnect("", "", "", props);
        rawConnect.connection.setReadOnly(true);
        rawConnect.connect();
        rawConnect.disconnect();
    }


}
