# https://github.com/oracle/docker-images/blob/main/OracleDatabase/SingleInstance/README.md#running-oracle-true-cache-in-a-container-supported-from-version-2340-onwards
password=${password:-password}
subnet=${subnet:-tc_net}
primary=pri-db-free
truecache=tru-cc-free
volume=truecache
start() {
  echo "$password" | podman secret create oracle_pwd -
  podman network create --subnet 10.89.0.0/24 $subnet
  local PRI_DB_FREE_IP="10.89.0.0"
  local TRU_CC_FREE_IP="10.89.0.1"

  podman run -td --name $primary --hostname $primary --net=$subnet --ip $PRI_DB_FREE_IP -p :1521 --secret=oracle_pwd \
    -e ENABLE_ARCHIVELOG=true \
    -e ENABLE_FORCE_LOGGING=true \
    -e ORACLE_SID=FREE \
    -v $volume:/opt/oracle/oradata \
    container-registry.oracle.com/database/free
  waitUntil $primary
  # enable archivelog
  echo -e "shutdown immediate;\n startup mount;\n exit;" | run $primary
  echo -e "alter database archivelog;\n alter database open; \n exit;" | run $primary
  echo -e "select name,log_mode from v\$database;\n exit;" | run $primary


  podman run -td --name $truecache --hostname $truecache --net=$subnet --ip $TRU_CC_FREE_IP -p :1521 --secret=oracle_pwd \
    -e TRUE_CACHE=true \
    -e PRIMARY_DB_PWD_FILE=/var/tmp/orapwFREE \
    -e PRIMARY_DB_CONN_STR=$PRI_DB_FREE_IP:1521/FREE \
    container-registry.oracle.com/database/free
  
  podman cp $primary:/opt/oracle/product/23ai/dbhomeFree/dbs/orapwFREE $truecache:/var/tmp/
  waitUntil $truecache
  # TODO WIP do we need mount point at truecache node?
}
stop() {
  podman rm -f $primary
  podman rm -f $truecache
  podman volume rm $volume
}
setup() {
  #   podman exec -it pri-db-free bash

  # $ORACLE_HOME/bin/dbca -configureDatabase -configureTrueCacheInstanceService -sourceDB FREE \
  # -trueCacheConnectString <TRU_CC_FREE_IP>:1521/FREE -trueCacheServiceName sales_tc -serviceName FREE \
  # -sysPassword $(cat /run/secrets/oracle_pwd) -silent

  # $ORACLE_HOME/bin/dbca -configureDatabase -configureTrueCacheInstanceService -sourceDB FREE \
  # -trueCacheConnectString <TRU_CC_FREE_IP>:1521/FREE -trueCacheServiceName sales_pdb_tc -serviceName FREEPDB1 \
  # -pdbName FREEPDB1 -sysPassword $(cat /run/secrets/oracle_pwd) -silent

  # TODO TrueCache node is not in archive mode: FREE      NOARCHIVELOG READ WRITE
  podman exec $primary dbca -configureDatabase -configureTrueCacheInstanceService -sourceDB FREE -trueCacheConnectString $TRU_CC_FREE_IP:1521/FREE -trueCacheServiceName sales_tc -serviceName FREE -sysPassword $password -silent
  # dbca -configureDatabase -configureTrueCacheInstanceService -sourceDB FREE -trueCacheConnectString tru-cc-free:1521/FREE -trueCacheServiceName sales_pdb_tc -serviceName FREEPDB1 -pdbName FREEPDB1 -sysPassword $password -silent
}
exec() {
  podman exec -it $1 sqlplus sys/$password as sysdba
  # select name,log_mode,open_mode from v$database;
}
run(){
  podman exec -it $1 sqlplus -s sys/$password as sysdba
}
waitUntil() {
  local s=$(status $1)
  
  while [ $s == starting ]
  do
    sleep 1
    s=$(status $1)
  done
  echo $s
}
status() {
  podman inspect $1 | jq -e -r ".[0].State.Health.Status"
}
inspect() {
  podman inspect $1 | jq -e ".[0].State.Health"
  podman logs -f $1
}
$@
