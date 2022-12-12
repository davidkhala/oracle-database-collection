
-- Create user
CREATE USER &username IDENTIFIED BY "&password";
-- Update password
ALTER USER &username IDENTIFIED BY "&password";

-- Common grant privilege, tested in SQL Developer
GRANT CONNECT, RESOURCE TO &username;
GRANT create session to &username;
GRANT UNLIMITED TABLESPACE TO &username;


