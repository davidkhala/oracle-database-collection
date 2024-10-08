#  [Oracle DB in OCI Marketplace](https://cloud.oracle.com/marketplace/application/47726045)
- As `ocidb`, `Oracle Database (Single Instance)`
- **Expose 1521 at OS firewall to allow external connection to DB**
    - `curl https://raw.githubusercontent.com/davidkhala/centos-collection/main/oci/setup.sh | bash -s common password`
- Default properties
    - SIDNAME (SID name) default: "ORCL"
    - DBNAME (Database names) default "ORCL"
    - DBCA_PLUGGABLE_DB_NAME (Pluggable database name) defaults 'orclpdb'
    - Password for `sys`, `system`, `pdbadmin` and `sysman` all default to `Ora_DB4U`
    - Default owner of the database: `oracle`, switch user by `$ sudo su - oracle` in order to use `sqlplus`, `lsnrctl`
# Drawback
- DB service is far from ready status when Instance become ready
    - DB creation time for Oracle DB EE: 18 ~ 22 minutes
      - use `tail -f /u01/ocidb/buildsingle.log` to keep track of progress percentage
    - Validate status of the Oracle Database Listener
      - By `lsnrctl status` or `lsnrctl services` with DB owner `Oracle`
    
        
