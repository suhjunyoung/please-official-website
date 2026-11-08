# Correction to Notification Record Retention Information

We are clarifying the retention rules currently used for notification processing records.

Section 4 of our Privacy Policy describes all temporary notification records as being cleaned up after they are more than 24 hours old. In operation, account-level morning/evening reminder deduplication records have a separate retention rule.

| Records | Actual retention and deletion rule |
|---|---|
| Account-level morning/evening reminder deduplication records | Deleted at the next hourly cleanup after they are more than 48 hours old |
| Other temporary notification records | Deleted at the next cleanup for that record type after they are more than 24 hours old |

Account-level reminder records contain the account identifier, notification type, date in the account's time zone, and creation timestamp. They do not contain nicknames, request text, or push tokens. They prevent the same reminder type from being sent more than once to the same account on the same local date.

Deletion takes place during the next automatic cleanup, rather than immediately at the retention threshold. Account-level reminder records are also deleted when the account is deleted. These rules are separate from push-message delivery lifetimes and external providers' retention periods.

This notice corrects information about processing already in operation. It is separate from the announcement and effective dates of the planned v3 Terms of Service and Privacy Policy updates, including support for multiple families.

Questions and privacy requests: [yellodevs@gmail.com](mailto:yellodevs@gmail.com)

* **Published**: YYYY-MM-DD, HH:MM KST (UTC+9)
