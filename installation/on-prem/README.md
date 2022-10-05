# On-prem installation (classic)
## Prerequisite
- Server Display Cards: At least 1024 x 768 display resolution, which Oracle Universal Installer requires.
- At least 1 GB RAM for Oracle Database installations. 2 GB RAM recommended.
- At least 1 GB of space in the /tmp directory
- Minimum local disk storage
    - 7.2 GB for Linux x86-64
    - 5.9 GB for Linux on System z

## Supported Operating Systems
- Linux x86-64
    - Oracle Linux [7.5, 8]
        - Oracle recommends that you run the [Oracle Database Preinstallation RPM](Preinstall-RPM.md)
    - Red Hat Enterprise Linux [7.5, 8]
    - SUSE Linux Enterprise Server [12-SP3, 15]
- Linux on System z: Oracle recommends using Oracle RPM Checker utility to verify the required packages have been installed
    - Red Hat Enterprise Linux 7.4
    - SUSE Linux Enterprise Server 12

## Oracle recommends
- Oracle recommends that you disable Transparent HugePages and use standard HugePages for enhanced performance.
- Oracle recommends that you allocate approximately 100 GB for applying any future patches

## Download
- I recommend to download from [Oracle Software Delivery Cloud Portal](https://edelivery.oracle.com/)
- Browser-based download
    - Categories and their shortname
        - License:          DLP
        - Release:          REL
        - Download Package: DLP
    - Choose `REL:Oracle Database 19.3.0.0.0 - Long Term Release` and your platform/OS (such as Linux-x86_64)
- Shell-based download
    - Execute [wget.sh](./wget.sh) to download Oracle Database 19.3.0.0.0 (interactively authN included)
## Installation
- Ensure cron jobs do not run during installation    
