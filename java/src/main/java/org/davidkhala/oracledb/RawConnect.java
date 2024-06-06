package org.davidkhala.oracledb;

import oracle.jdbc.logging.annotations.Blind;
import oracle.jdbc.pool.OracleDataSource;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class RawConnect {
    private final OracleDataSource ods;
    public Connection connection;
    private Statement statement;

    public RawConnect(String connectionString, String username, @Blind String password, Properties props) throws SQLException {
        ods = new oracle.jdbc.pool.OracleDataSource();
        ods.setURL(connectionString.startsWith("jdbc")?connectionString:"jdbc:" + connectionString);
        ods.setUser(username);
        ods.setPassword(password);
        if (username.equalsIgnoreCase("SYS")) props.setProperty("internal_logon", "sysdba");

        ods.setConnectionProperties(props);
    }

    public RawConnect(String connectionString, String username, String password) throws SQLException {
        this(connectionString, username, password, new Properties());
    }

    public void connect() throws SQLException {
        connection = ods.getConnection();
        statement = connection.createStatement();
    }

    public void disconnect() throws SQLException {
        if (statement != null) statement.close();
        connection.close();
    }
}

