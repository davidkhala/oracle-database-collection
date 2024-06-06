-- Use DataGrip syntax: See [Substitute inside SQL strings](https://www.jetbrains.com/help/datagrip/settings-tools-database-user-parameters.html)
-- Create user
CREATE USER ${username} IDENTIFIED BY "${password}";
-- Update password
ALTER USER ${username} IDENTIFIED BY "${password}";

-- Common grant privilege
GRANT CONNECT, RESOURCE TO ${username};
GRANT create session to ${username};
GRANT UNLIMITED TABLESPACE TO ${username};

-- View privileges

select *
from DBA_ROLE_PRIVS; -- Roles granted to users and roles

select *
from role_role_privs; -- Roles which are granted to roles

select *
from role_sys_privs; -- System privileges granted to roles

select *
from role_tab_privs;
-- Table privileges granted to roles


-- listAllUsers
SELECT *
FROM dba_users;


select user
from dual; --  get currently login user