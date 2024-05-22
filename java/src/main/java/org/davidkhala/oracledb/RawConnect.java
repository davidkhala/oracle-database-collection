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

    public RawConnect(String url, String username, @Blind String password, Properties props) throws SQLException {
         ods = new oracle.jdbc.pool.OracleDataSource();
         ods.setURL(url);
         ods.setUser(username);
         ods.setPassword(password);
         ods.setConnectionProperties(props);
    }
    public void connect() throws SQLException {
        connection = ods.getConnection();
        statement= connection.createStatement();
    }
    public void disconnect() throws SQLException {
        statement.close();
        connection.close();
    }
}

