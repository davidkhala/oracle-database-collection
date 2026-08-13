
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
list system schemas
```
SELECT *
FROM all_users
WHERE APPLICATION = 'Y' OR CLOUD_MAINTAINED = 'YES'
ORDER BY username;
```

# Connect
Connect from DataGrip
- [blog: For non-mTLS](https://haczek.blog/how-to-connect-to-oracle-autonomous-database-using-datagrip-or-sql-developer/)
  - `Connection type`: `URL only`
  - URL format: `jdbc:oracle:thin:@${connection_string_from_ADB}`
  - as code: [data-grip.connect](data-grip.connect) is exported by menu item `Copy Data Source`

Connect from SQL Developer
- Connection Type: Custom JDBC
- Custom JDBC URL: `jdbc:oracle:thin:@${connection_string_from_ADB}`
  - e.g. `jdbc:oracle:thin:@(description=(address=(protocol=tcps)(port=1521)(host=adb.ap-seoul-1.oraclecloud.com))(connect_data=(service_name=ukyllmqvbnkwzdy_adw_high.adb.oraclecloud.com))))`
- Role: Default
- Username: ADMIN


# Advanced Security
[Label Security, Database Vault, Data Safe are included](https://docs.oracle.com/en-us/iaas/autonomous-database-shared/doc/gs-security-and-authentation-autonomous-database.html)
