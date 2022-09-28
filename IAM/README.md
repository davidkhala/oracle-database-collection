# IAM Auth Autonomous Database

## Pre-requisite

- Optional: Setup DB password for this IAM user(OCI Console)
	- Otherwise we can use IAM console password?
    	- Trick: the default DB username shows as oracleidentitycloudservice/davidkhala@gmail.com, but `/` is not a right username character.
	- InvalidParameter - name must be one or more of the following characters: a-zA-Z0-9@.-_+ 
    
- Enable IAM Auth on ADB
    - Run SQL as ADMiN: `EXEC DBMS_CLOUD_ADMIN.ENABLE_EXTERNAL_AUTHENTICATION ('OCI_IAM')`
    - Validate the result via SQL: `SELECT NAME, VALUE FROM V$PARAMETER WHERE NAME='identity_provider_type'`
- 
## Create the DB user
1. `CREATE USER oci_david IDENTIFIED GLOBALLY AS 'IAM_PRINCIPAL_NAME=david.yx.liu@oracle.com'`
2. Check by `SELECT USERNAME, EXTERNAL_NAME FROM DBA_USERS WHERE AUTHENTICATION_TYPE='GLOBAL';`
3. Run SQL `GRANT CREATE SESSION TO oci_david` to create session
  - By default, user has `connect`, `resource` role



## Troubleshoot
**Q: ORA-01045: user OCI_DAVID lacks CREATE SESSION privilege; logon denied**
- `GRANT CREATE SESSION TO oci_david`

