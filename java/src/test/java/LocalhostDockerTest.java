import org.davidkhala.oracledb.RawConnect;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.oracle.OracleContainer;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Testcontainers
public class LocalhostDockerTest {


    public static final String name = "testDB";
    public static final String username = "testUser";
    public static final String password = "testPassword";
    @Container
    private static final OracleContainer underTest= new OracleContainer("gvenzl/oracle-free:slim-faststart")
                .withDatabaseName(name)
                .withUsername(username).withPassword(password)
                .withExposedPorts(1521);
    private static Connection connection;
    private static Statement statement;

    @BeforeAll
    public static void setUp() throws SQLException {
        assertTrue(underTest.isRunning());
        connection = underTest.createConnection("");
        statement = connection.createStatement();
    }

    @Test
    void sanCheck() throws SQLException {
        ResultSet resultSet = statement.executeQuery("select user from dual");
        resultSet.next();
        assertEquals(username.toUpperCase(), resultSet.getString("user"));

        resultSet.close();
    }

    @Test
    void rawConnectTest() throws SQLException {
        RawConnect db = new RawConnect(underTest.getJdbcUrl(), username, password);

        db.connect();
        db.disconnect();

    }

    @AfterAll
    public static void cleanup() throws SQLException {
        statement.close();
        connection.close();
    }
}
