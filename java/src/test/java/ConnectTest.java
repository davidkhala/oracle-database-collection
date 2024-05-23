import org.davidkhala.oracledb.RawConnect;
import org.junit.jupiter.api.Test;

import java.sql.SQLException;
import java.util.Properties;

class ConnectTest {
    String adwConnectionString = "oracle:thin:@(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ap-seoul-1.oraclecloud.com))(connect_data=(service_name=ukyllmqvbnkwzdy_adw_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))";
    @Test
    void ADWFree() throws SQLException {
        RawConnect db = new RawConnect(adwConnectionString, "ADMIN", System.getenv("adw_password"));
        db.connect();
        db.disconnect();
    }

    @Test
    void localhostDocker() throws SQLException {
        RawConnect db = new RawConnect("oracle:thin:@//localhost:1521/FREE", "sys", "password");
        db.connect();
        db.disconnect();
    }
    @Test // TODO WIP
    void localhostDockerTrueCache() throws SQLException {
        Properties props = new Properties();
        props.setProperty("oracle.jdbc.useTrueCacheDriverConnection", "true");
        RawConnect db = new RawConnect("oracle:thin:@//localhost:1521/FREE", "sys", "password", props);
        db.connect();
        db.connection.setReadOnly(true);
        db.disconnect();
    }

    @Test
    void trueCache() throws SQLException {
        Properties props = new Properties();
        props.setProperty("oracle.jdbc.useTrueCacheDriverConnection", "true");
        RawConnect rawConnect = new RawConnect(adwConnectionString, "ADMIN", System.getenv("adw_password"), props);
        try {
            rawConnect.connect(); rawConnect.connection.setReadOnly(true);
        }catch (java.sql.SQLException e){
            assert e.getMessage().contains("ORA-18719: The database does not support True Cache. Minimum supported version is 23ai");
        }

    }


}
