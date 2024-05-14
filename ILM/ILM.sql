ALTER SYSTEM SET HEAT_MAP = 'ON'; -- required for ADO

-- TODO
CREATE TABLE sales_ado
 (PROD_ID NUMBER NOT NULL,
  CUST_ID NUMBER NOT NULL,
  TIME_ID DATE NOT NULL,
  CHANNEL_ID NUMBER NOT NULL,
  PROMO_ID NUMBER NOT NULL,
  QUANTITY_SOLD NUMBER(10,2) NOT NULL,
  AMOUNT_SOLD NUMBER(10,2) NOT NULL )
 PARTITION BY RANGE (time_id)
 ( PARTITION sales_q1_2012 VALUES LESS THAN (TO_DATE('01-APR-2012','dd-MON-yyyy')),
   PARTITION sales_q2_2012 VALUES LESS THAN (TO_DATE('01-JUL-2012','dd-MON-yyyy')),
   PARTITION sales_q3_2012 VALUES LESS THAN (TO_DATE('01-OCT-2012','dd-MON-yyyy')),
   PARTITION sales_q4_2012 VALUES LESS THAN (TO_DATE('01-JAN-2013','dd-MON-yyyy')) )
  ILM ADD POLICY COMPRESS FOR ARCHIVE HIGH SEGMENT
      AFTER 12 MONTHS OF NO ACCESS; -- Create an example table with an ILM ADO policy


/* Add a row-level compression policy after 30 days of no modifications */
ALTER TABLE sales MODIFY PARTITION sales_q1_2002
  ILM ADD POLICY ROW STORE COMPRESS ADVANCED ROW
  AFTER 30 DAYS OF NO MODIFICATION;

/* Add a segment level compression policy for data after 6 months of no modifications */
ALTER TABLE sales MODIFY PARTITION sales_q1_2001
  ILM ADD POLICY COMPRESS FOR ARCHIVE HIGH SEGMENT
  AFTER 6 MONTHS OF NO MODIFICATION;

/* Add a segment level compression policy for data after 12 months of no access */
ALTER TABLE sales MODIFY PARTITION sales_q1_2000
      ILM ADD POLICY COMPRESS FOR ARCHIVE HIGH SEGMENT
      AFTER 12 MONTHS OF NO ACCESS;

/* Add storage tier policy to move old data to a different tablespace */
/* that is on low cost storage media */
ALTER TABLE sales MODIFY PARTITION sales_q1_1999
  ILM ADD POLICY
  TIER TO my_low_cost_sales_tablespace;

/* View the existing polices */
SELECT SUBSTR(policy_name,1,24) POLICY_NAME, policy_type, enabled
   FROM USER_ILMPOLICIES;

POLICY_NAME              POLICY_TYPE   ENABLE
------------------------ ------------- ------
P1                       DATA MOVEMENT YES
P2                       DATA MOVEMENT YES
P3                       DATA MOVEMENT YES
P4                       DATA MOVEMENT YES
P5                       DATA MOVEMENT YES

-- add an ILM ADO policy to an existing table.


SELECT SUBSTR(policy_name, 1, 24) POLICY_NAME, policy_type, enabled
FROM USER_ILMPOLICIES; -- View the existing ILM ADO polices
