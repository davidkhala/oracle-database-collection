# AutoUpgrade.jar
[Main Page](https://support.oracle.com/epmos/faces/DocumentDisplay?id=2485457.1)

## Download
check the latest version from main page
## Configure
```
[your-label].source_home=/u01/app/oracle/product/12.2.0.1
[your-label].target_home=/u01/app/oracle/product/19
[your-label].sid=[SID of your CDB/PDB, like CDB1]
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

The `-mode deploy` consists of a sequence of `-mode analyze`, `-mode fixups` and `-mode upgrade`

While your are waiting with a cup of coffee, you can monitor the upgrade process by
```
upg> lsj
```
and 
```
upg> status -job <job number>
```
**These two are command in AutoUpgrade console, not Bash** 
or open your browser with 
`http://<log-dir>/cfgtoollogs/upgrade/auto/state.html`

## Advanced options
### Different Server
specify your target server hostname in config file with adding line
- `[your-label].upgrade_node=<test_server01.mycorp.net>`

### workflow hooker
```
[your-label].before_action=<your shell script> Y
[your-label].after_action=<your shell script> Y
```
The `Y` option here to instruct AutoUpgrade halts on non-zero return code
### Restore point
default enabled as 
```
[your-label].restoration=yes
```
Use this to enable auto-remove Guaranteed Restore Points when upgrade completed successfully
```
[your-label].drop_grp_after_upgrade=yes
```

### Job console
- `resume -job <number>`
- `status -job <number>`
- `restore -job <number>`
- `abort -job <number>`
