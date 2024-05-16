
- Released in 19c (even with 19.12 patch)
  - The implementation is until version 21.3
# Blockchain table
- Detects end user impersonation and insertion of data in a user's name but without their authR
  - User need to provide their digital signature for inserting
- Support archiving rows after retention period
- procure a countersignature for the row that is being signed by the end-user or delegate
  - countersignature: additional signature added to a document that has already been signed.
- Can be indexed and partitioned in the normal manner.

# Immutable table

## compared to blockchain table
- db prebuilt functions are the same as blockchain table
- less secure than blockchain table
- better performance than blockchain table
  - rows are not chained together
  - inserting rows does not require additional processing at commit time.
