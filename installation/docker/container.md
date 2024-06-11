# Oracle DB in container
- From [Oracle Container Registry](https://container-registry.oracle.com/ords/ocr/ba/database/free)
- Use Oracle account to `docker login container-registry.oracle.com`
## [Free](https://container-registry.oracle.com/ords/ocr/ba/database/free)

## EE
`docker pull container-registry.oracle.com/database/enterprise:latest`

- The highlighted configuration options are:
  - `ORACLE_SID`=`ORCLCDB`
  - `ORACLE_PDB`=`ORCLPDB1`
  - `ORACLE_PWD`, randomly generated
  
Connecting from outside of the container
- [ORA-12637: Packet receive failed](https://franckpachot.medium.com/19c-instant-client-and-docker-1566630ab20e)
    - Solution 1: change container DB config
        ```
        docker exec -t <oracle-db> bash -c 'file=$ORACLE_HOME/network/admin/sqlnet.ora; grep DISABLE_OOB $file && sed s/DISABLE_OOB/DISABLE_OOB=ON/ -i $file || echo DISABLE_OOB=ON >> $file'
        ```

## Caveats
- Oracle Data Guard is not supported.
- The minimum requirements for the container is 8 GB of disk space and 2 GB of memory.
