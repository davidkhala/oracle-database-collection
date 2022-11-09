
-- Create user
CREATE USER "&username" IDENTIFIED BY "Tr4v1an&Pa$$w0rd";

-- Common grant privilege, tested in SQL Developer
GRANT CONNECT, RESOURCE TO &username;
GRANT create session to &username;
GRANT UNLIMITED TABLESPACE TO &username;


