
# Data Actions
## SQL
Web version of SQL Developer Desktop

## Data Studio
Prerequisite
- To have Data Studio tiles displayed for your user, please grant role `DWROLE` as `Granted` and **also 'Default'**. 
- Alternatively, if using SQL, `GRAND DWROLE TO &username` can give you both implicitly.
## Data Modeler
- Diagrams are stored in table `OSDDMW_DIAGRAMS` in current user schema. The table is created when you use Data Modeler for the first time.
- Data Modeler can import from or export to the `OSDDMW_DIAGRAMS` table if a connection is provided. 





## Database Users
Pre-defined roles
### Preserved pre-defined roles (Oct 2022)
Although displayed in web side pane, these roles cannot be granted by `ADMIN` user

- ADP$IMPL
- APEX_GRANTS_FOR_NEW_USERS_ROLE
- APPLICATION_TRACE_VIEWER
- AVTUNE_PKG_ROLE
- BDSQL_ADMIN
- BDSQL_USER
- C##ADWC_ADMIN
- C##ADWC_MONITOR
- C##ADWC_OPERATOR
- C##DNSREST_ADMIN
- AVTUNE_PKG_ROLE
- CDB_DBA
- DATAPATCH_ROLE
- DBA
- DATAPUMP_EXP_FULL_DATABASE
- DATAPUMP_IMP_FULL_DATABASE
- DBFS_ROLE
- DBMS_MDX_INTERNAL
- DV_REALM_OWNER
- DV_REALM_RESOURCE
- EM_EXPRESS_ALL
- EM_EXPRESS_BASIC
- EXECUTE_CATALOG_ROLE
- EXP_FULL_DATABASE
- GDS_CATALOG_SELECT
- GGSYS_ROLE
- GSM_POOLADMIN_ROLE
- GSMADMIN_ROLE
- GSMROOTUSER_ROLE
- GSMUSER_ROLE
- HS_ADMIN_EXECUTE_ROLE
- HS_ADMIN_ROLE
- IMP_FULL_DATABASE
- LOGSTDBY_ADMINISTRATOR
- MAINTPLAN_APP
- NOTIFICATIONS_ADMIN
- NOTIFICATIONS_USER
- OEM_ADVISOR
- OEM_MONITOR
- PYQADMIN
- RDFCTX_ADMIN
- RECOVERY_CATALOG_OWNER
- RECOVERY_CATALOG_OWNER_VPD
- RECOVERY_CATALOG_USER
- RQADMIN
- SCHEDULER_ADMIN
- SYSUMF_ROLE

# Connect
Connect from DataGrip
- [blog: For non-mTLS](https://haczek.blog/how-to-connect-to-oracle-autonomous-database-using-datagrip-or-sql-developer/)
  - `Connection type`: `URL only`
  - URL format: `jdbc:oracle:thin:@${connection_string_from_ADB}`
  - as code: [data-grip.connect](data-grip.connect)

Connect from SQL Developer
- mTLS: Wallet might be the most simple way to connect 
  


# Advanced Security
[Label Security, Database Vault, Data Safe are included](https://docs.oracle.com/en-us/iaas/autonomous-database-shared/doc/gs-security-and-authentation-autonomous-database.html)
