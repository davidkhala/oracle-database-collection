
-- Create user
CREATE USER "&username" IDENTIFIED BY "Tr4v1an&Pa$$w0rd";

-- Common grant privilege, tested in SQL Developer
GRANT CONNECT, RESOURCE TO &username;
GRANT create session to &username;
GRANT UNLIMITED TABLESPACE TO &username;



-- ODB classic only privilege
GRANT DBA TO &username;
Grant ALL PRIVILEGES TO &username

-- Autonomous DB
GRANT DW_ROLE to $username

-- Unsupported in ADB
Grant ADP$IMPL, APEX_GRANTS_FOR_NEW_USERS_ROLE, APPLICATION_TRACE_VIEWER, AVTUNE_PKG_ROLE, BDSQL_ADMIN, BDSQL_USER, C##ADWC_ADMIN,AVTUNE_PKG_ROLE, CDB_DBA, DATAPATCH_ROLE
    TO &username
