# IAM Auth Autonomous Database

## Workflow 1: Use IAM DB password & Map IAM user to 1 DB User only

- Setup DB password for this IAM user(OCI Console)
	- we cannot use IAM console password
	
- Set the **Database Username** under **Database Passwords** section 
	- It must match with `IAM_PRINCIPAL_NAME` in SQL for creating DB User
	- Trick: the default DB username shows as oracleidentitycloudservice/david.yx.liu@oracle.com, but `/` is InvalidParameter. Valid RegEx is `a-zA-Z0-9@.-_+`
	- The change to Database Username take 1 minute to become effect on DB Auth process. 
- Enable IAM Auth on ADB
    - Run SQL as ADMiN: `EXEC DBMS_CLOUD_ADMIN.ENABLE_EXTERNAL_AUTHENTICATION ('OCI_IAM')`
    - Validate the result via SQL: `SELECT NAME, VALUE FROM V$PARAMETER WHERE NAME='identity_provider_type'`

## Create the DB user
1. `CREATE USER oci_david IDENTIFIED GLOBALLY AS 'IAM_PRINCIPAL_NAME=david.yx.liu@oracle.com'`
2. Check by `SELECT USERNAME, EXTERNAL_NAME FROM DBA_USERS WHERE AUTHENTICATION_TYPE='GLOBAL';`
3. Run SQL `GRANT CREATE SESSION TO oci_david` to allow SQL session create (SQL Developer desktop...)
  - By default, user has `connect`, `resource` role

## Troubleshoot
**Q: ORA-01045: user OCI_DAVID lacks CREATE SESSION privilege; logon denied**
- `GRANT CREATE SESSION TO oci_david`

