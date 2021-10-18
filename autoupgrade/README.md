# AutoUpgrade.jar
[Main Page](https://support.oracle.com/epmos/faces/DocumentDisplay?id=2485457.1)

## Download
check the latest version from main page
## Configure
```
[your-label].source_home=/u01/app/oracle/product/12.2.0.1
[your-label].target_home=/u01/app/oracle/product/19
[your-label].sid=[point to your CDB/PDB, like CDB1]
```

## Analyze
The AutoUpgrade tool can automatically fix 98.5% of all cases
And the rest 1.5% need **your** fix can be found out by
```
java -jar autoupgrade.jar -config <CDB1.cfg> -mode analyze
```

Then Check the output as html.


## Upgrade
```
java -jar autoupgrade.jar -config <CDB1.cfg> -mode deploy
```
While your are waiting with a cup of coffee, you can monitor the upgrade process by
`lsj` and  

```
status -job <job number shown in $lsj>
```

