# Oracle Database Preinstallation RPM


## Registry
- Oracle Unbreakable Linux Network (ULN)
    - already configured in Oracle Linux
- Oracle Linux DVDs.
    - [Oracle yum](https://yum.oracle.com/oracle-linux-isos.html)
    - [Oracle Software Delivery Cloud website](https://edelivery.oracle.com/linux)


## Please DO NOT...
- **Retry**. Do not install Oracle Database Preinstallation RPM again on the same system
- **Oracle-managed**. Do not install Oracle Database Preinstallation RPM on Oracle Engineered Systems, such as Oracle Exadata Database Machine.

## How it works
- Automatically downloads and installs any additional RPM packages needed for
  installing Oracle Database, and resolves any dependencies
- Creates an oracle user, and creates the oraInventory (oinstall) and OSDBA
  (dba) groups for that user
- As needed, sets sysctl.conf settings, system startup parameters, and driver
  parameters to values based on recommendations from the Oracle Database
  Preinstallation RPM program
- Sets hard and soft resource limits
- Sets other recommended parameters, depending on your kernel version
- Sets numa=off in the kernel for Linux x86_64 machines.


# Installation
- Oracle Linux 7
    - $ `yum install oracle-database-preinstall-19c -y`
    - Use the `-y` option if you want yum to skip the package confirmation prompt.
- Oracle Linux 8
    - $ `dnf install oracle-database-preinstall-19c`
