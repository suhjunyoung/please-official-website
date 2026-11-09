# Privacy Policy

> This English version is provided for convenience. The Korean version governs if the two versions differ.

Please! (the “Service”) collects only the minimum personal information required to provide the Service and takes great care to protect it. This Policy explains what we collect, why we use it, how long we keep it, and how we destroy it.

## 1. Personal Information We Collect

The Service does not require legal names, phone numbers, dates of birth, photos, address books, or precise location for general registration, and does not perform marketing tracking via advertising identifiers.

| Category | Items | Collection or Creation Timing |
|---|---|---|
| Account & Authentication | Social sign-in identifier, internal account identifier, authentication metadata provided by sign-in providers (email, name, profile image URL) | Initial sign-in and authentication refresh |
| Family Profile | Display name (nickname), character number, and theme color set for each family | Direct user entry when creating or joining a family and when editing the profile |
| Account Settings | Morning/evening reminder times, app language | Direct user entry during onboarding and settings changes |
| Account Settings — Device Time Zone | Time zone name set on the device (e.g., `Asia/Seoul`). This is not location information | Read from device settings when the app opens or returns to the foreground after sign-in, and updated only when it differs from the server value |
| Family | Family identifier and name, time zone, invite link token and expiration time, last activity time | Family creation or invite link generation. The server updates the last activity time when a request is created or completed, an open request is deleted, a member joins, or a heart is sent |
| Request | Request identifier and text, creator and creation time, assignee tag, due date, status, person who completed it and completion time | Request creation, editing, and completion |
| Reaction | User sending a heart, target request, and reaction time | When tapping a heart on a completed request |
| Push Registration | Expo push token, account/member/device registration identifiers and registration time | When the app verifies notification permissions and registers or updates a token |
| Error & Diagnostics | Device model, OS, language, memory, app/update version, error messages, stack trace locations, screen transitions, touches, network diagnostics, internal account or SDK installation ID, approximate region (country/city) | Automatically collected during app runtime and diagnostics |
| App Updates | Device operating system and update request information, including randomized identifiers used to determine whether an update was downloaded | When the app checks for or downloads updates |
| Consent Record | Account identifier, consent text version, and consent timestamp | Upon completing sign-up consent checklist and signing in |
| Temporary Notification Records | Delivery identifiers, status, and processing timestamps for scheduled, deletion, or event notifications | Created on the server during delivery and duplicate prevention (see Section 4 for retention and deletion timing) |

* **Social Sign-in Details**: Google sign-in requests email and profile information as part of its default authentication scopes on both iOS and Android. Provider-supplied account information, including email, is transmitted to and stored in Supabase Auth as part of the Service’s authentication process. Android Apple web sign-in may also provide email and other account information. iOS native Apple sign-in does not request additional name or email scopes. The app does not separately store emails or legal names in the family/profile database, using only the nickname and character chosen during onboarding. The store-review email sign-in sends the email and password required for authentication to Supabase Auth. Social sign-in providers (Apple, Google) are independent services directly used by users, not data processors contracted by the Service.
* **Identifying Your Sign-in Account**: The “Linked sign-in methods” section in account settings displays your sign-in method and provider-supplied email so you can identify your own account. If no email is available or Apple provides a Hide My Email address, only the sign-in method’s name is displayed. This account information is shown to you; your email is not shared with other family members.
* **Diagnostics & Analytics**: Sentry is used to ensure service stability and analyze app crashes. Internal account identifiers help connect repeated errors and support reports affecting the same user. Approximate location, such as country, helps identify regional connection and performance problems. We do not use this information for advertising or marketing tracking. Current diagnostics may also include city information.
* **On-device Storage**: Login sessions, push tokens, local notice acknowledgment records, and the following information are stored locally on the device. Notice acknowledgments remain local and are separate from server-side sign-up consent records.
  * Request snapshots for Home Screen widgets from the families the user belongs to, the family list (family and membership identifiers, names, and family time zones), and the family chosen for each widget
  * The family last viewed and the last-checked time for each family. These are used to open the app in the last viewed family and to show whether other families have new activity
* **Multiple Families**: One account can join multiple families, and a family profile is stored separately for each family. Members of one family are not shown the names, family profiles, or requests of the user's other families, or the fact that the user belongs to them.

## 2. Purposes of Using Personal Information

Collected information is used strictly for the following purposes and is **never used for advertising, marketing, profiling, or sale to third parties.**

1. **Authentication and Account Identification**: Authenticating sign-in, managing accounts, and displaying your sign-in method and email so you can identify your own account
2. **Family Group Management**: Family creation, invite link verification, member identification, providing the list of families the user belongs to, switching between families, and showing new activity in other families
3. **Requests & Rewards**: Request management, shared family candy jar and recent 14-day activity level calculations
4. **Notification Delivery & Processing**: Request, family-joining and heart-reaction notifications from every family the user belongs to, morning/evening reminders that combine those families' to-dos, and duplicate prevention
5. **Reminders in the User's Current Time Zone**: Calculating the user's chosen morning/evening times in the device time zone. The "today" shown for each family in a reminder follows that family's time zone
6. **Widget Service**: Displaying and updating request snapshots of the family chosen for each iOS / Android Home Screen widget
7. **Diagnostics & Quality Improvement**: Analyzing crash causes, diagnosing runtime errors, and enhancing stability and performance
8. **App Updates**: Checking for and downloading compatible updates, checking update status, and asking users of app versions older than the supported version to update
9. **Consent Verification**: Recording and maintaining the version of the Terms the user agreed to and the time of consent

**Legal basis for processing the device time zone**: The device time zone is needed to send reminders at the times the user chooses, and is processed to perform the service agreement (Article 15(1)4 of the Personal Information Protection Act of Korea). Only a time zone name, not location information, is received. Only the latest value is kept, with no history of changes.

## 3. Delegation of Processing and International Transfers

Members of the same family can view the nicknames, characters, and colors used in that family, shared requests and creation, completion and heart activity. Information about the user's other families, and the fact that the user belongs to them, is not shared. Anyone with a valid invitation link can access the family name, member count and characters/colors in use before joining. Please share invitation links only with people you wish to invite.

### A. Delegation of Processing

We entrust storage, authentication, notification and diagnostic operations to the providers below. Push notifications pass through Expo to Apple’s or Google’s delivery service. The core database is securely hosted in the **Seoul (Republic of Korea) region**.

| Entrusted Entity | Delegated Processing Scope | Information Transferred |
|---|---|---|
| Supabase Pte. Ltd. | Cloud database storage and authentication | Account/authentication, family profiles, account settings (including device time zone), family, request, reaction, push registration, consent and notification-processing records |
| 650 Industries, Inc. (Expo) | Push notification relay and app update download verification | Push token, notification title/body (nicknames and request text, plus the family name for recipients who belong to two or more families), navigation/widget update data, update request metadata |
| Apple Inc. (APNs) · Google LLC (FCM) | Final delivery of push notifications to devices | Push token, notification title/body, navigation/widget update data |
| Functional Software, Inc. (Sentry) | Crash detection, error analysis, and performance monitoring | Device/OS/app information, diagnostic logs, internal account or SDK installation ID, approximate region |

* For users who belong to two or more families, the notification title may include the family name so they can tell which family the notification is from. This title is sent to Expo, Apple, and Google as the "title/body" in the international transfer table below. The device time zone is not included in notifications and is not transferred abroad.
* When Sentry errors occur, summary alerts (error title, location, Sentry link) may be forwarded to a Discord webhook for developer response. The app’s diagnostic transmission paths apply filters to fields identified as passwords or authentication tokens and patterns such as email addresses. These filters cannot identify all user-written text in error messages; error summaries may therefore include user-entered content such as request text.

### B. International Data Transfers

Push delivery, app update checks, diagnostics, and infrastructure operations involve the international transfers described below. Supabase's core database, authentication, and backups are hosted in Seoul; overseas processing for technical support and operational logs is listed separately.

| Recipient | Country & Contact | Information Transferred | Purpose, Timing & Method | Retention & Processing Period |
|---|---|---|---|---|
| Supabase Pte. Ltd. | USA and Singapore (support/operations), European Union (operational logs)<br>privacy@supabase.io | Service request and operational logs; information needed for technical support | Encrypted communications and restricted remote access for operations, security, and technical support | Retained as needed for operations, security, and support under the [Supabase DPA](https://supabase.com/legal/customer-resources/data-processing-addendum) and [processing/retention notice](https://supabase.com/legal/privacy-resources/data-residency-and-transfers-faq). Service database records are deleted under Section 4 |
| 650 Industries, Inc. (Expo) — push | USA<br>[Contact form](https://expo.dev/contact) | Push token, title/body, navigation/widget data | HTTPS relay request when a notification is sent | Notification content is kept only in memory and queues as needed to relay to Apple/Google. Tokens and operational logs are retained as needed for relay and service operations under the retention terms in [Expo's policy](https://expo.dev/privacy) |
| 650 Industries, Inc. (Expo) — updates | USA<br>[Contact form](https://expo.dev/contact) | Update request metadata | HTTPS transmission when the app checks for or downloads updates | Retained as needed for update delivery, download verification, and service operations under the retention terms in [Expo's policy](https://expo.dev/privacy) |
| Apple Inc. (APNs) | USA, etc. (Apple global infrastructure)<br>[Privacy contact](https://www.apple.com/legal/privacy/contact/) | Push token, title/body, navigation/widget data | Network delivery through Expo to iOS devices when sending notifications | Delivery lifetime for undelivered messages: 24 hours. Device tokens and system logs are retained as needed to provide services and meet legal obligations under the retention terms in [Apple's policy](https://www.apple.com/legal/privacy/en-ww/) |
| Google LLC (FCM) | USA, etc. ([Google global processing locations](https://firebase.google.com/support/privacy#data_storage_and_processing_locations))<br>[Privacy contact](https://support.google.com/policies/contact/general_privacy_form) | Push token, installation identifiers, title/body, navigation/widget data | Network delivery through Expo to Android devices when sending notifications | Delivery lifetime for undelivered messages: 24 hours. Firebase installation IDs are retained until an API deletion request, then removed from live and backup systems within 180 days. Operational logs follow the retention terms in [Firebase's notice](https://firebase.google.com/support/privacy) and [Google's policy](https://policies.google.com/privacy) |
| Functional Software, Inc. (Sentry) | USA (Iowa storage); Austria, Canada, and the Netherlands (affiliate technical support)<br>compliance@sentry.io | Device/OS/app data, error logs, diagnostics, internal account or SDK installation ID, approximate region (country/city) | HTTPS transmission during app use, error reporting, and performance diagnostics; restricted access for necessary technical support | Error events: 30 days. Event backups are deleted within a maximum of 90 days after each backup is created, depending on the data type |
| Discord Inc. | USA, etc. (Discord global infrastructure)<br>privacy@discord.com | Error title, location, environment and Sentry link (may include user-written text) | HTTPS webhook from the server when an error alert is triggered | Retained without scheduled automatic deletion or automatic expiry until individual message/channel deletion or user deletion request under Section 5 (Discord database backups are kept for 30–45 days) |

**Notification lifetime**: To avoid delivering outdated notifications, we set the push message delivery lifetime to 24 hours. This is separate from retention of push tokens, operational logs and update requests.

Removing a device's notification registration from the app's server does not also delete identifiers or logs held by Apple, Google, or other external providers. Requests to delete externally retained information can be sent to the contact in Section 5.

**To turn off notifications**:
* Turn off Please! notifications in device settings, then reopen the app while connected to the internet. Once the app removes this device’s notification registration from the server, it will no longer be targeted for new notifications.
* If a connection or server problem prevents removal, the app retries when you next open or return to it. Delivery may still be attempted until removal succeeds. Notifications already being sent or delivered cannot be recalled.
* If you use multiple devices, change the setting on each device. Turning notifications back on and reopening the app allows it to register again.
* Notification registration is per device of your account, so turning off notifications on a device turns them off for every family you belong to. The Service does not offer a way to turn off notifications for a single family.
* This setting applies to push notifications. Update checks and diagnostics operate separately. To request restriction or deletion for these or other processing activities, email `yellodevs@gmail.com`. We will explain the outcome and any effect on your use of the service.

## 4. Retention Periods and Deletion Procedures

### A. Retention Periods

| Target Data | Retention & Deletion Criteria |
|---|---|
| Incomplete requests | Retained until deleted by an authorized member or the family group is deleted (completed requests follow the rule below) |
| Completed requests & hearts | Retained for 14-day activity calculations and calculation anomaly verification; **records older than 90 days from completion are deleted from the service database by the next daily cleanup** |
| Departing member data | The family profile (nickname, character, and color) in the family the user left is deleted once leaving the family succeeds on the server. The account and consent records, account settings, and the user's other families remain. Device registrations follow the "Device registrations" row below. See below for shared requests |
| Device registrations (push tokens) | Registrations of devices that receive notifications are kept per account, not per family. After leaving a family, they are kept while the user still belongs to another family so the user keeps receiving that family's notifications, and deleted when the user leaves the last family they belong to. Signing out or turning off notifications on a device unregisters that device (Section 3). Successful server-side account deletion removes the registrations of all devices |
| Entire family data | Family and related service database records are deleted once the last member successfully leaves. Temporary notification records and external copies follow the criteria below |
| Account settings (reminder times, app language, device time zone) | Retained while the account exists. Only the latest device time zone is kept, with no history of changes. Deleted when account deletion succeeds on the server |
| Account & consent records | Retained while the account exists. Successful server-side account deletion first removes the user from every family and then deletes the authentication account, family profiles in every family, account settings, device registrations and consent records. Shared requests and temporary/external records follow the criteria below |
| Temporary notification logs | Account-level morning/evening reminder deduplication records are deleted at the next hourly cleanup after they are more than 48 hours old. Other temporary notification records are deleted at the next automatic cleanup after they are more than 24 hours old. Cleanup runs every minute, hour or day depending on the record type, so deletion is not immediate at the respective retention threshold |
| Operational error summaries | Discord summaries have no scheduled deletion or automatic expiry and may remain until the message or channel is deleted. Deleting a Please! account does not remove them. Personal-data deletion requests can be sent to the contact in Section 5. Discord database backups are retained for 30–45 days; this is not the message expiry period |
| Error diagnostics | Sentry error events are retained for **30 days**. Event backups are deleted **within a maximum of 90 days after each backup is created**, depending on the data type. Discord summaries follow their separate row in this table |

* Activity levels and candy counts use activity from the latest 14 calendar days, including today, based on the family's time zone. The 90-day retention of completed requests is a separate retention window for statistical verification and operational stability.

When other members remain in the family, shared requests remain. Information linking the departing member to those requests as their creator, assignee, or the person who completed them is removed. Names or other text written directly in request contents are not automatically erased.

Temporary identifiers used to process notifications for deleted requests may remain until the cleanup described above, even after account or family deletion. These records do not contain nicknames, request text or push tokens.

Local login sessions are cleared during sign-out or account deletion. When the app confirms the user no longer belongs to any family, it clears widget snapshots and the family list for all families; when the user leaves one family, it clears only that family's widget snapshot. A widget set to a family the user left does not show another family instead; it asks the user to choose a family again. The app clears stored push registrations after successful unregistration or account deletion. Local notice acknowledgments, the family last viewed, and each family's last-checked time remain per account without automatic expiry and are removed when the app’s stored data is cleared. Device backup and restoration may affect retention depending on OS settings.

### B. Deletion Procedures and Methods
* **Procedure**: Records are deleted under the criteria above when account/family deletion succeeds or the retention period ends. Records subject to time limits are removed by automatic cleanup jobs.
* **Method**: Affected service database records are deleted; external information is handled through the provider’s deletion tools and request procedures. Backups follow their separate retention cycles described above and are not deleted simultaneously with service database records.

## 5. User Rights and How to Exercise Them

Users may request access to, correction of, deletion of, or suspension of processing of their personal information at any time.

* **In-App Management**:
  * Family Profiles: Nicknames, characters, and colors can be modified for each family at any time on the Edit my profile screen.
  * Account Settings: Reminder times and app language can be modified on the App settings screen. The device time zone follows the device settings automatically and is not entered separately.
  * Requests & Reactions: Users can manage requests and heart reactions directly in the app under the Service's rules, including the rules for editing or deleting requests and undoing completion.
  * Leaving Family & Account Deletion: Users can request 'Leave family' for each family or 'Delete account' on the Account settings screen. Leaving a family does not delete the service account or the user's other families. Section 4 explains the deletion scope of each action.
* **Email Inquiries**: If experiencing difficulties in the app, contact `yellodevs@gmail.com` for prompt assistance following identity verification. You may also request deletion of related information in external operational channels, such as Discord error summaries. The operator will locate and delete the relevant records and explain what was processed and the retention rules for remaining information, such as external backups.

## 6. Protection of Children Under 14

* The Service is available only to users **aged 14 and older**, confirmed by the user during sign-up and onboarding.
* The Service does not knowingly collect personal information from children under 14 without legal guardian consent. If discovered, such data will be deleted without delay.

## 7. Measures to Ensure Personal Information Security

1. **Transmission Encryption**: All client-server communications are encrypted via secure protocols (HTTPS/TLS).
2. **Access Control (Row Level Security)**: Database-level RLS policies block access to data outside the families the user belongs to. Even when one account belongs to several families, members of one family cannot access that account's other families or the fact that it belongs to them. Valid invite links provide only limited preview information prior to joining.
3. **Privilege Minimization**: Server admin keys (service_role) are never bundled in client applications and are used only in isolated server environments.

## 8. Privacy Officer and Contact

* **Service Operator**: yellodevs (Junyoung Suh, Heesung Kim)
* **Privacy Officer**: Junyoung Suh (yellodevs)
* **Official Contact**: `yellodevs@gmail.com`

## 9. Remedies for Rights Infringement

* Personal Information Dispute Mediation Committee: +82-1833-6972 (kopico.go.kr)
* Personal Information Infringement Report Center: +82-118 (privacy.kisa.or.kr)
* Supreme Prosecutors' Office Cybercrime Investigation: +82-1301 (spo.go.kr)
* National Police Agency Cyber Bureau: +82-182 (ecrm.police.go.kr)

## 10. Amendments to the Privacy Policy

This Policy may be amended to reflect changes in laws, policies, or technical operations. Users will be notified via in-app notices at least 7 days prior to changes, or 30 days prior for significant or unfavorable changes. We will also publish a comparison of the changes and the previous Policy.

Corrections to factual statements will be announced promptly when confirmed. Correction notices and the application of protective measures will be explained separately from the announcement and effective dates of the amended Policy as a whole.

* **Announcement Date**: YYYY-MM-DD, HH:MM KST (UTC+9)
* **Effective Date**: YYYY-MM-DD, HH:MM KST (UTC+9)

---

## Key Changes from the Previous Version

The table below summarizes key changes from the Policy effective October 12, 2026. “Previous Description” summarizes the earlier guidance and does not describe current processing. Please refer to the full Policy above for the complete amended text.

| Provision | Previous Description | Amended Description | Reason for Change |
|---|---|---|---|
| Section 1 — Information collected | Described nickname, character, color, reminder times and app language as one “profile” | Separates the “family profile” set for each family from “account settings” shared across families. Adds the **device time zone** as a newly collected account setting, and the last activity time of a family updated by the server | Distinction between account-level and family-specific information and disclosure of processing items |
| Section 1 — On-device storage | Stored widget snapshots for one family | Adds widget snapshots and the family list for the families the user belongs to, the family chosen for each widget, the family last viewed and each family’s last-checked time | Clarification of on-device storage and its purposes |
| Sections 1, 3 and 7 — Separation between families | Described only what is shared within the same family | States that members of one family are not shown the user’s other families’ names, family profiles or requests, or the fact that the user belongs to them | Clarification of information separation between families |
| Section 2 — Purposes and legal basis | Notification and widget purposes for one family | Adds family switching and new-activity indicators, notifications from every family and combined reminders, reminders in the device time zone, per-widget family display and update prompts for older app versions. States the legal basis and retention for the device time zone | Disclosure of new processing purposes and legal grounds |
| Section 3 — Notification titles and processors | Notification titles/bodies included nicknames and request text | Adds that titles may include the family name for recipients in two or more families. States that the device time zone is not included in notifications or transferred abroad. Adds account settings to the Supabase row | Clarification of notification data sent to external providers |
| Section 3 — Turning off notifications | How to unregister each device | Adds that registration is per device of the account, so turning off notifications applies to every family, and that there is no per-family setting | Clarification of account-wide notification settings |
| Section 4 — Retention and deletion | Leaving a family deleted the profile and device registrations | Deletes only the family profile for the family the user left. Adds a separate row for device registrations kept per account: kept while another family remains, deleted when the user leaves the last family or deletes the account, and unregistered on sign-out or when notifications are turned off. Adds retention for account settings and no history for the device time zone. Account deletion removes the user from every family first. Adds cleanup rules for per-family widget data on the device | Clarification of retention and deletion across multiple families |
| Section 5 — In-app management | Changes in Settings/profile screens; leaving and deletion at the bottom of the profile screen | Points to Edit my profile (family profiles), App settings (reminder times and language) and Account settings (leaving a family and deleting the account). States that the device time zone updates automatically | Guidance on exercising privacy rights in the updated screens |
| Section 4 — Notification record retention | Described all temporary notification records as using a 24-hour cleanup threshold | Distinguishes the 48-hour threshold already used for account-level morning/evening reminder deduplication records; other records retain the 24-hour threshold | Correction of retention information (separate from the v3 revision schedule) |
