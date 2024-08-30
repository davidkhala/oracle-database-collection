# Oracle Base Database on OCI
aka. DB VM

Oracle recommends that you [create a default application service](https://docs.oracle.com/en-us/iaas/base-database/doc/overview-connecting-db-system.html#DBSCB-GUID-D6BC986C-1D99-4320-A56B-0201EEF29E3F) for the initial database after you create your DB system


## Connect 
find the IP addresses & DNS name in the Console as follows on the DB System Details page, under **Resources**, click **Nodes**.

### ssh connect
SSH user `opc` has been configured to the provided public key in provision.

### DB connect
find the **Database unique name** on the DB System Details page, under **Resources**, click **Databases**.


#### Password Policy
PDB on DB VM system, has the following password policy:
- A minimum of 9 and a maximum of 30 characters.
- At least two uppercase characters.
- At least two lowercase characters.
- At least two special characters. 
  - The valid special characters are underscore ( _ ), a pound or hash sign (#) and dash (-).
- At least two numeric characters (0 - 9).

## Scale
- When we change shape of DB VM, it will gracefully drain connections, and OCI console showing `UPDATING`




    
