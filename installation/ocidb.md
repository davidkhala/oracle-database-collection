#  [Oracle DB in OCI Marketplace](https://cloud.oracle.com/marketplace/application/47726045)
- As `ocidb`, `Oracle Database (Single Instance)`
- Supported VM OS： Oracle Linux 7.9; Oracle Autonomous Linux 7.9
- Provided versions: 12.2.0.1; 18.12.0.0; 19.9.0.0;
- **Expose 1521 at OS firewall to allow external connection to DB**
    - [default cloud-init.sh](./cloud-init.sh)
- Default properties
    - SIDNAME (SID name) default: "ORCL"
    - DBNAME (Database names) default "ORCL"
    - DBCA_PLUGGABLE_DB_NAME (Pluggable database name) defaults 'orclpdb'
    - Password for `sys`, `system`, `pdbadmin` and `sysman` all default to `Ora_DB4U`
    - Default owner of the database: `oracle`, switch user by `$ sudo su - oracle` in order to use `sqlplus`, `lsnrctl`
- DB service is far from ready status when Instance become ready
    - DB creation time for OracleDB19-AL7: 18 ~ 22 minutes, use `tail -f /u01/ocidb/buildsingle.log` to keep track of progress percentage
    - Validate status of the Oracle Database Listener, by `lsnrctl status` or `lsnrctl services` with DB owner `Oracle`
    
        
