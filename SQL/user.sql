
-- Create user
CREATE USER username IDENTIFIED BY "Tr4v1&Pa$$w0rd";

-- Common grant privilege
GRANT CONNECT, RESOURCE, DBA TO username;
GRANT create session, grant any privilege to username;
GRANT UNLIMITED TABLESPACE TO username;

