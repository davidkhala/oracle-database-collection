# IAM Auth Autonomous Database

## Pre-requisite

- Optional: Setup DB password for this IAM user(OCI Console)
	- Otherwise we can use IAM console password?
    	- Trick: the default DB username shows as oracleidentitycloudservice/davidkhala@gmail.com, but `/` is not a right username character.
	- InvalidParameter - name must be one or more of the following characters: a-zA-Z0-9@.-_+ 
    
- Enable IAM Auth on ADB
    - Run SQL as ADMiN: `EXEC DBMS_CLOUD_ADMIN.ENABLE_EXTERNAL_AUTHENTICATION ('OCI_IAM')`
    - Validate the result via SQL: `SELECT NAME, VALUE FROM V$PARAMETER WHERE NAME='identity_provider_type'`

## Create the DB user

### Option: Group mapping
choose your user name like `oci_admin` here
`CREATE USER oci_admin IDENTIFIED GLOBALLY AS 'IAM_GROUP_NAME=Administrators'`


### Option: User mapping
choose your user name like `oci_david` here

`CREATE USER oci_idcs_david IDENTIFIED GLOBALLY AS 'IAM_PRINCIPAL_NAME=oracleidentitycloudservice/david.yx.liu@oracle.com'`

?

`CREATE USER oci_david IDENTIFIED GLOBALLY AS 'IAM_PRINCIPAL_NAME=david.yx.liu@oracle.com'`


### Validate
Check by `SELECT USERNAME, EXTERNAL_NAME FROM DBA_USERS WHERE AUTHENTICATION_TYPE='GLOBAL';`
