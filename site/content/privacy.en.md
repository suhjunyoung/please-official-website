# Privacy Policy

> This English version is provided for convenience. The Korean version governs if the two versions differ.

Please! (the “Service”) collects only the minimum personal information required to provide the Service and takes great care to protect it. This Policy explains what we collect, why we use it, how long we keep it, and how we destroy it.

## 1. Personal Information We Collect

The Service does not require legal names, phone numbers, dates of birth, photos, address books, or precise location for general registration, and does not perform marketing tracking via advertising identifiers.

| Category | Items | Collection or Creation Timing |
|---|---|---|
| Account & Authentication | Social sign-in identifier, internal account identifier, authentication metadata provided by sign-in providers (email, name, profile image URL) | Initial sign-in and authentication refresh |
| Profile | Display name (nickname), character number, theme color, morning/evening reminder times, app language | Direct user entry during onboarding and settings changes |
| Family | Family identifier and name, time zone, invite link token and expiration time | Family creation or invite link generation |
| Mission | Mission identifier and text, creator and creation time, assignee tag, due date, status, completer and completion time | Mission creation, editing, and completion |
| Reaction | User sending a heart, target mission, and reaction time | When tapping a heart on a completed mission |
| Push Registration | Expo push token, member/device registration identifiers and registration time | When the app verifies notification permissions and registers or updates a token |
| Error & Diagnostics | Device model, OS, language, memory, app/update version, error messages, stack trace locations, screen transitions, touches, network diagnostics, internal account or SDK installation ID, approximate region (country/city) | Automatically collected during app runtime and diagnostics |
| App Updates | Device operating system and update request information, including randomized identifiers used to determine whether an update was downloaded | When the app checks for or downloads updates |
| Consent Record | Account identifier, consent text version, and consent timestamp | Upon completing sign-up consent checklist and signing in |
| Temporary Notification Records | Delivery identifiers, status, and processing timestamps for scheduled, deletion, or event notifications | Created on the server during delivery and duplicate prevention (see Section 4 for retention and deletion timing) |

* **Social Sign-in Details**: iOS native Apple sign-in does not request additional name or email scopes. Google sign-in and Android Apple web sign-in may provide account information to Supabase Auth. The app does not separately store emails or legal names in the family/profile database, using only the nickname and character chosen during onboarding. The store-review email sign-in sends the email and password required for authentication to Supabase Auth. Social sign-in providers (Apple, Google) are independent services directly used by users, not data processors contracted by the Service.
* **Diagnostics & Analytics**: Sentry is used to ensure service stability and analyze app crashes. Internal account identifiers help connect repeated errors and support reports affecting the same user. Approximate location, such as country, helps identify regional connection and performance problems. We do not use this information for advertising or marketing tracking. Current diagnostics may also include city information.
* **On-device Storage**: Login sessions, push tokens, mission snapshots for Home Screen widgets, and local notice acknowledgment records are stored locally on the device. Notice acknowledgments remain local and are separate from server-side sign-up consent records.

## 2. Purposes of Using Personal Information

Collected information is used strictly for the following purposes and is **never used for advertising, marketing, profiling, or sale to third parties.**

1. **Family Group Management**: Family creation, invite link verification, and member identification
2. **Missions & Rewards**: Mission management, shared family candy jar and recent 14-day activity level calculations
3. **Notification Delivery & Processing**: Mission, family-joining and heart-reaction notifications, scheduled morning/evening reminders, and duplicate prevention
4. **Widget Service**: Displaying and updating mission snapshots on iOS / Android Home Screen widgets
5. **Diagnostics & Quality Improvement**: Analyzing crash causes, diagnosing runtime errors, and enhancing stability and performance
6. **App Updates**: Checking for and downloading compatible updates and checking update status
7. **Consent Verification**: Maintaining proof of agreed policy version and consent timestamps

## 3. Delegation of Processing and International Transfers

Members of the same family can view nicknames, characters, colors, shared missions and creation, completion and heart activity. Anyone with a valid invitation link can access the family name, member count and characters/colors in use before joining. Please share invitation links only with people you wish to invite.

### A. Delegation of Processing

We entrust storage, authentication, notification and diagnostic operations to the providers below. Push notifications pass through Expo to Apple’s or Google’s delivery service. The core database is securely hosted in the **Seoul (Republic of Korea) region**.

| Entrusted Entity | Delegated Processing Scope | Information Transferred |
|---|---|---|
| Supabase Pte. Ltd. | Cloud database storage and authentication | Account/authentication, profile, family, mission, reaction, push registration, consent and notification-processing records |
| 650 Industries, Inc. (Expo) | Push notification relay and app update download verification | Push token, notification title/body (nicknames and mission text), widget data, update request metadata |
| Apple Inc. (APNs) · Google LLC (FCM) | Final delivery of push notifications to devices | Push token, notification title/body, navigation/widget update data |
| Functional Software, Inc. (Sentry) | Crash detection, error analysis, and performance monitoring | Device/OS/app information, diagnostic logs, internal account or SDK installation ID, approximate region |

* When Sentry errors occur, summary alerts (error title, location, Sentry link) may be forwarded to a Discord webhook for developer response. The app’s diagnostic transmission paths apply filters to fields identified as passwords or authentication tokens and patterns such as email addresses. These filters cannot identify all user-written text in error messages; error summaries may therefore include user-entered content such as mission text.

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

Removing a device registration from the app's server is separate from deleting identifiers or logs held by Apple, Google, or other external providers. Requests to delete externally retained information can be sent to the contact in Section 5.

**To turn off notifications**:
* Turn off Please! notifications in device settings, then reopen the app while connected to the internet. Once the app removes this device’s notification registration from the server, it will no longer be targeted for new notifications.
* If a connection or server problem prevents removal, the app retries when you next open or return to it. Delivery may still be attempted until removal succeeds. Notifications already being sent or delivered cannot be recalled.
* If you use multiple devices, change the setting on each device. Turning notifications back on and reopening the app allows it to register again.
* This setting applies to push notifications. Update checks and diagnostics operate separately. To request restriction or deletion for these or other processing activities, email `yellodevs@gmail.com`. We will explain the outcome and any effect on your use of the service.

## 4. Retention Periods and Deletion Procedures

### A. Retention Periods

| Target Data | Retention & Deletion Criteria |
|---|---|
| Incomplete missions | Retained until deleted by an authorized member or the family group is deleted (completed missions follow the rule below) |
| Completed missions & hearts | Retained for 14-day activity calculations and calculation anomaly verification; **records older than 90 days from completion are deleted from the service database by the next daily cleanup** |
| Departing member data | Profile and device registrations are deleted once leaving the family succeeds on the server. The account and consent records remain. See below for shared missions |
| Entire family data | Family and related service database records are deleted once the last member successfully leaves. Temporary notification records and external copies follow the criteria below |
| Account & consent records | Retained while the account exists. Successful server-side account deletion removes the authentication account, profile, device registrations and consent records. Shared missions and temporary/external records follow the criteria below |
| Temporary notification logs | Deleted at the next automatic cleanup after they are more than 24 hours old. Cleanup runs every minute, hour or day depending on the record type, so deletion is not immediate at the 24-hour mark |
| Operational error summaries | Discord summaries have no scheduled deletion or automatic expiry and may remain until the message or channel is deleted. Deleting a Please! account does not remove them. Personal-data deletion requests can be sent to the contact in Section 5. Discord database backups are retained for 30–45 days; this is not the message expiry period |
| Error diagnostics | Sentry error events are retained for **30 days**. Event backups are deleted **within a maximum of 90 days after each backup is created**, depending on the data type. Discord summaries follow their separate row in this table |

* Activity levels and candy counts are calculated based on the latest 14 calendar days in the family's time zone. The 90-day retention of completed missions is a separate retention window for statistical verification and operational stability.

When other members remain in the family, shared missions remain but references to the departing member as creator, assignee or completer are removed. Names or other text written directly in mission contents are not automatically erased.

Temporary identifiers used to process notifications for deleted missions may remain until the cleanup described above, even after account or family deletion. These records do not contain nicknames, mission text or push tokens.

Local login sessions are cleared during sign-out or account deletion. The app clears widget snapshots when it confirms there is no family membership, and clears stored push registrations after successful unregistration or account deletion. Local notice acknowledgments remain per account without automatic expiry and are removed when the app’s stored data is cleared. Device backup and restoration may affect retention depending on OS settings.

### B. Deletion Procedures and Methods
* **Procedure**: Records are deleted under the criteria above when account/family deletion succeeds or the retention period ends. Records subject to time limits are removed by automatic cleanup jobs.
* **Method**: Affected service database records are deleted; external information is handled through the provider’s deletion tools and request procedures. Backups follow their separate retention cycles described above and are not deleted simultaneously with service database records.

## 5. User Rights and How to Exercise Them

Users may request access to, correction of, deletion of, or suspension of processing of their personal information at any time.

* **In-App Management**:
  * Profile & Settings: Nicknames, characters, colors, reminder times, and language can be modified anytime in Settings.
  * Missions & Reactions: Can be managed, edited, or deleted directly in the app according to domain rules.
  * Leaving Family & Account Deletion: Users can request 'Leave family' or 'Delete account' in the Profile menu. Leaving a family keeps the service account; Section 4 explains the deletion scope of each action.
* **Email Inquiries**: If experiencing difficulties in the app, contact `yellodevs@gmail.com` for prompt assistance following identity verification. You may also request deletion of related information in external operational channels, such as Discord error summaries. The operator will locate and delete the relevant records and explain what was processed and the retention rules for remaining information, such as external backups.

## 6. Protection of Children Under 14

* The Service is available only to users **aged 14 and older**, confirmed by the user during sign-up and onboarding.
* The Service does not knowingly collect personal information from children under 14 without legal guardian consent. If discovered, such data will be deleted without delay.

## 7. Measures to Ensure Personal Information Security

1. **Transmission Encryption**: All client-server communications are encrypted via secure protocols (HTTPS/TLS).
2. **Access Control (Row Level Security)**: Database-level RLS policies strictly isolate family data. Valid invite links provide only limited preview information prior to joining.
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

* **Announcement Date**: Upon app update release
* **Effective Date**: Upon app update release

---

## Key Changes from the Previous Version

The table below summarizes key changes from the Policy effective September 24, 2026. “Previous Description” summarizes the earlier guidance and does not describe current processing. Please refer to the full Policy above for the complete amended text.

| Provision | Previous Description | Amended Description | Reason for Change |
|---|---|---|---|
| Section 1 — Account and authentication | Stated that legal names, photos and similar information were not collected; described social identifiers and authentication email | Distinguishes information not separately requested during general registration from provider-supplied email, name and profile image URLs; specifies reviewer email/password transmission | To distinguish app inputs from authentication-service processing |
| Sections 1 and 2 — Diagnostics | Grouped device/error information with notification permission and runtime-error timing | Specifies collection during app use/diagnostics, screen/touch/network records, internal account or installation identifiers, country/city and diagnostic purposes | To accurately explain diagnostic data, timing and purposes |
| Sections 1, 2 and 4 — Updates, consent and temporary records | No separate explanation of update requests, sign-up consent or temporary notification-processing records | Adds items and purposes; explains cleanup of temporary records at the next scheduled run for each type once they are more than 24 hours old | To clarify previously omitted processing and retention schedules |
| Sections 1 and 4 — On-device storage | No separate explanation of local storage or notice acknowledgments | Explains local sessions, push registrations, widget snapshots and account-specific notice acknowledgments and their cleanup; distinguishes acknowledgments from sign-up consent | To distinguish device records from server consent records |
| Section 2 — Notification purposes | Described mission creation/completion/deletion and morning/evening reminders | Adds family-join/heart notifications and duplicate prevention | To specify notification features and processing purposes |
| Sections 3 and 7 — Sharing and access | Described access to other families’ data as completely blocked | Distinguishes family sharing from limited pre-join previews through valid invitation links | To accurately explain access restrictions and invitation previews |
| Sections 1 and 3 — Providers and international transfers | Included sign-in providers in the processor table and grouped countries, data and retention | Separates social sign-in providers as independent services; specifies provider countries, contacts, data, timing, methods and retention, update/Discord processing, notification titles and navigation/widget data | To distinguish provider roles and actual transmission/retention scope |
| Section 3 — Turning off notifications and delivery lifetime | Stated that disabling device notifications stopped push-related overseas transfers | Attempts server unregistration when the app opens/returns after permission is disabled; excludes the device from new sends after success. Explains retries, device scope, in-flight messages and the 24-hour delivery lifetime | To correct inaccurate opt-out guidance and explain protective measures |
| Section 4 — Mission retention | Described immediate permanent deletion at 90 days when activity-calculation purposes ended | Distinguishes incomplete-mission retention, 14-day activity calculation, 90-day investigation retention and the next daily cleanup after more than 90 days | To distinguish calculation periods from actual retention/deletion timing |
| Sections 4 and 5 — Leaving and deletion | Described immediate deletion, anonymized shared missions and deletion of all data upon account deletion | Distinguishes leaving a family from account deletion; explains person-reference removal, preserved text, temporary/external records, backups and email-request procedures | To accurately explain deletion scope and rights-request methods |
| Sections 3 and 4 — Sentry and Discord retention | Described Sentry diagnostics as retained for up to 90 days; no separate Discord retention explanation | Distinguishes 30-day Sentry error events from backups deleted within 90 days of creation. Discord summaries have no scheduled deletion or expiry and can be subject to deletion requests; DB backups last 30–45 days | To explain different retention rules for events, summary copies and backups |
| Section 10 — Amendments | At least 7 days’ notice, or 30 days for significant or unfavorable changes | Preserves notice periods; adds publication of comparisons/previous versions and distinguishes factual corrections/protective-measure notices from the amended Policy’s announcement and effectiveness | To distinguish correction notices from the Policy’s formal announcement and effectiveness |
