#!/bin/sh

#
# Generated on Sun Jan 31 16:28:42 PST 2021
# Start of user configurable variables
#
LANG=C
export LANG

#Trap to cleanup cookie file in case of unexpected exits.
trap 'rm -f $COOKIE_FILE; exit 1' 1 2 3 6

# SSO username
printf 'SSO User Name:'
read SSO_USERNAME

# Path to wget command
WGET=/usr/bin/wget

# Log directory and file
LOGDIR=.
LOGFILE=$LOGDIR/wgetlog-$(date +%m-%d-%y-%H:%M).log

# Print wget version info
echo "Wget version info:
------------------------------
$($WGET -V)
------------------------------" > "$LOGFILE" 2>&1

# Location of cookie file
COOKIE_FILE=$(mktemp -t wget_sh_XXXXXX) >> "$LOGFILE" 2>&1
if [ $? -ne 0 ] || [ -z "$COOKIE_FILE" ]
then
 echo "Temporary cookie file creation failed. See $LOGFILE for more details." |  tee -a "$LOGFILE"
 exit 1
fi
echo "Created temporary cookie file $COOKIE_FILE" >> "$LOGFILE"

# Output directory and file
OUTPUT_DIR=.
#
# End of user configurable variable
#

# The following command to authenticate uses HTTPS. This will work only if the wget in the environment
# where this script will be executed was compiled with OpenSSL.
#
 $WGET  --secure-protocol=auto --save-cookies="$COOKIE_FILE" --keep-session-cookies --http-user "$SSO_USERNAME" --ask-password  "https://edelivery.oracle.com/osdc/cliauth" -O /dev/null 2>> "$LOGFILE"

# Verify if authentication is successful
if [ $? -ne 0 ]
then
 echo "Authentication failed with the given credentials." | tee -a "$LOGFILE"
 echo "Please check logfile: $LOGFILE for more details."
else
 echo "Authentication is successful. Proceeding with downloads..." >> "$LOGFILE"
 $WGET --load-cookies="$COOKIE_FILE" "https://edelivery.oracle.com/osdc/softwareDownload?fileName=V982063-01.zip&token=N00xNVVBN3I5NVpDUUhtM01uanZIQSE6OiFmaWxlSWQ9MTA0NDg4MDA2JmZpbGVTZXRDaWQ9OTAxMzc3JnJlbGVhc2VDaWRzPTg5NDk4MiZwbGF0Zm9ybUNpZHM9MzUmZG93bmxvYWRUeXBlPTk1NzYxJmFncmVlbWVudElkPTczMjA2ODgmZW1haWxBZGRyZXNzPWRhdmlkLnl4LmxpdUBvcmFjbGUuY29tJnVzZXJOYW1lPUVQRC1EQVZJRC5ZWC5MSVVAT1JBQ0xFLkNPTSZpcEFkZHJlc3M9MTI1LjU5LjExMC4xNzgmdXNlckFnZW50PU1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzg4LjAuNDMyNC45NiBTYWZhcmkvNTM3LjM2JmNvdW50cnlDb2RlPUhL" -O "$OUTPUT_DIR/V982063-01.zip" >> "$LOGFILE" 2>&1
fi

# Cleanup
rm -f "$COOKIE_FILE"
echo "Removed temporary cookie file $COOKIE_FILE" >> "$LOGFILE"

