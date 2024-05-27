# https://github.com/oracle/docker-images/blob/main/OracleDatabase/SingleInstance/README.md#running-oracle-true-cache-in-a-container-supported-from-version-2340-onwards
podman-start() {
    echo "PassW0rd__" | podman secret create oracle_pwd -
    podman network create tc_net
      podman inspect tc_net | grep -iw 'subnet'
      local PRI_DB_FREE_IP="10.89.0.0"
      local TRU_CC_FREE_IP="10.89.0.1"

      podman run -td --name pri-db-free --hostname pri-db-free --net=tc_net --ip $PRI_DB_FREE_IP -p :1521 --secret=oracle_pwd \
        -e ENABLE_ARCHIVELOG=true \
        -e ENABLE_FORCE_LOGGING=true \
        -v truecache:/opt/oracle/oradata \
        container-registry.oracle.com/database/free

      podman run -td --name tru-cc-free --hostname tru-cc-free --net=tc_net --ip $TRU_CC_FREE_IP -p :1521 --secret=oracle_pwd \
          -e TRUE_CACHE=true \
          -e PRIMARY_DB_PWD_FILE=/var/tmp/orapwFREE \
          -e PRIMARY_DB_CONN_STR=$PRI_DB_FREE_IP:1521/FREE \
      container-registry.oracle.com/database/free
      podman cp pri-db-free:/opt/oracle/product/23ai/dbhomeFree/dbs/orapwFREE tru-cc-free:/var/tmp/

      # configure
      podman exec -it pri-db-free bash
      --


  $ORACLE_HOME/bin/dbca -configureDatabase -configureTrueCacheInstanceService -sourceDB FREE \
  -trueCacheConnectString <TRU_CC_FREE_IP>:1521/FREE -trueCacheServiceName sales_pdb_tc -serviceName FREEPDB1 \
  -pdbName FREEPDB1 -sysPassword $(cat /run/secrets/oracle_pwd) -silent
}
setup(){
  dbca -configureDatabase -configureTrueCacheInstanceService -sourceDB FREE -trueCacheConnectString primary:1521/FREE -trueCacheServiceName sales_tc -serviceName FREE -sysPassword "password" -silent

}
podman-inspect(){
  podman inspect pri-db-free | jq -e ".[0].State.Health"
}
$@