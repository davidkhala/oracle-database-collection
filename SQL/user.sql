-- Use DataGrip syntax: See [Substitute inside SQL strings](https://www.jetbrains.com/help/datagrip/settings-tools-database-user-parameters.html)
-- Create user
CREATE USER ${username} IDENTIFIED BY "${password}";
-- Update password
ALTER USER ${username} IDENTIFIED BY "${password}";

-- Common grant privilege
GRANT CONNECT, RESOURCE TO ${username};
GRANT create session to ${username};
GRANT UNLIMITED TABLESPACE TO ${username};

-- listAllUsers
SELECT * FROM dba_users;


