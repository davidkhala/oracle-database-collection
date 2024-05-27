# https://github.com/oracle/docker-images/blob/main/OracleDatabase/SingleInstance/README.md#running-oracle-true-cache-in-a-container-supported-from-version-2340-onwards
password=${password:-password}
subnet=${subnet:-tc_net}
primary=pri-db-free
truecache=tru-cc-free
podman-start() {
  echo "$password" | podman secret create oracle_pwd -
  podman network create --subnet 10.89.0.0/24 $subnet
  local PRI_DB_FREE_IP="10.89.0.0"
  local TRU_CC_FREE_IP="10.89.0.1"

  podman run -td --name $primary --hostname $primary --net=$subnet --ip $PRI_DB_FREE_IP -p :1521 --secret=oracle_pwd \
    -e ENABLE_ARCHIVELOG=true \
    -e ENABLE_FORCE_LOGGING=true \
    -v truecache:/opt/oracle/oradata \
    container-registry.oracle.com/database/free

  # podman run -td --name tru-cc-free --hostname tru-cc-free --net=$subnet --ip $TRU_CC_FREE_IP -p :1521 --secret=oracle_pwd \
  #   -e TRUE_CACHE=true \
  #   -e PRIMARY_DB_PWD_FILE=/var/tmp/orapwFREE \
  #   -e PRIMARY_DB_CONN_STR=$PRI_DB_FREE_IP:1521/FREE \
  #   container-registry.oracle.com/database/free

}
podman-stop(){
  podman rm -f $primary
  podman rm -f $truecache
}
setup() {
  docker cp primary:/opt/oracle/product/23ai/dbhomeFree/dbs/orapwFREE ./orapwFREE
  docker cp ./orapwFREE true-cache:/var/tmp/orapwFREE
  #  podman cp primary:/opt/oracle/product/23ai/dbhomeFree/dbs/orapwFREE
  # [FATAL] [DBT-19953] True Cache is not in redo apply mode.
  #   CAUSE: True Cache should be in READ ONLY WITH APPLY mode

  dbca -configureDatabase -configureTrueCacheInstanceService -sourceDB FREE -trueCacheConnectString primary:1521/FREE -trueCacheServiceName sales_tc -serviceName FREE -sysPassword password -silent
  dbca -configureDatabase -configureTrueCacheInstanceService -sourceDB FREE -trueCacheConnectString true-cache:1521/FREE -trueCacheServiceName sales_pdb_tc -serviceName FREEPDB1 -pdbName FREEPDB1 -sysPassword $(cat /run/secrets/oracle_pwd) -silent
}
podman-exec() {
  podman exec -it $primary sqlplus sys/$password as sysdba
}
podman-status() {
  podman inspect pri-db-free | jq -e ".[0].State.Health.Status"
}
$@
