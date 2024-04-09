# Oracle Data Safe


## Target DB
- Only PDB as target DB is supported
- Service Account for Oracle Data Safe should be a PDB local user, not CDB common user
   - `CDB$ROOT cannot be registered as a Target`
   - exception: if set `common_user_prefix` to something without special characters, or to null, then create a common user without special characters, and then this is common user can work as service account
### Type: Oracle Cloud Database

- provide `ocid`
  - valid (for DB system): `ocid1.dbsystem.oc1.iad.abc`
  - valid (for autonomous Database): `ocid1.autonomousdatabase.oc1.iad.abc`
  - invalid: `ocid1.database...`
  
### Type: Oracle Database on Compute

### Type: Oracle On-Premises Database
- option `connector-port`: Oracle Connection Manager listener port
- Setup TLS between On-Prem CMAN and target DB
    - Prerequisite: Database wallet copy and ensure Database wallet is in use 
   - [WIP] Run CMANTLSDB.sh in on-prem connector root




## Documentation
- https://docs.oracle.com/en/cloud/paas/data-safe/udscs/get-started-oracle-data-safe.html
- https://docs.oracle.com/en-us/iaas/data-safe/index.html
