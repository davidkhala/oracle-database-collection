import org.davidkhala.oracledb.RawConnect;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.testcontainers.oracle.OracleContainer;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import static org.junit.jupiter.api.Assertions.*;

public class LocalhostDockerTest {
    private static OracleContainer underTest;
    private static Connection connection;

    public static final String name = "testDB";
    public static final String username = "testUser";
    public static final String password = "testPassword";

    Statement statement;

    @BeforeAll
    public static void setUp() throws SQLException {
        underTest = new OracleContainer("gvenzl/oracle-free:slim-faststart")
                .withDatabaseName(name)
                .withUsername(username).withPassword(password)
                .withExposedPorts(1521);
        underTest.start();
        connection = underTest.createConnection("");
    }

    @Test
    void sanCheck() throws SQLException {
        statement = connection.createStatement();
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

    @AfterEach
    void close() throws SQLException {
        if (statement != null) statement.close();

    }

    @AfterAll
    public static void cleanup() throws SQLException {
        connection.close();
        underTest.stop();
    }
}
