# Privacy Policy

> This is the official English convenience translation of the Please! Privacy Policy.
> The Korean version is the governing version. If the two versions differ, the Korean version controls.
> Public URL: https://yellodevs.notion.site/e44015dbafa3824882c601d1930dc56c

Please! (the “Service”) collects only the personal information needed to provide the Service and takes care to protect it. This Policy explains what we collect, why we use it, how long we keep it, and when we delete it.

---

## 1. Personal Information We Collect

The Service does **not** collect your legal name, phone number, date of birth, photo, contacts, location, or advertising identifier. The app does not separately collect or store your email address, although an account email may be held by the authentication service during social sign-in.

| Category | Information | When collected or created |
|---|---|---|
| Account | Social sign-in identifier issued by Apple or Google | First sign-in |
| Profile | Display name, character, representative color, morning and evening reminder times, app language | Onboarding and settings changes |
| Family | Family name, time zone, invite token, and expiration time | Family creation or invite-link refresh |
| Missions | One-line text, assignee, due date, status, completer, and completion time | Mission creation, editing, and completion |
| Reactions | User sending a heart and reaction time | When a heart is sent |
| Device | Push token, device model, OS version, crash logs, and diagnostics | When notifications are enabled or a runtime error occurs |

- **Sign-in information:** The native Apple sign-in on iOS does not request additional name or email scopes. The Google sign-in SDK includes email and profile in its default scopes, and the Apple browser sign-in on Android may also send an account email to Supabase Auth. The app does not ask you to enter an email, store it separately in the family or profile database, or use an email string to automatically link accounts from different sign-in methods.
- **Automatic collection and analytics:** We do not use cookies or advertising identifiers such as IDFA or GAID for marketing tracking. We use Sentry to diagnose crashes and runtime errors. Sentry data is used only for reliability and performance, never advertising or tracking.

---

## 2. How We Use Information

We use collected information only to:

1. Manage family groups, invite links, and member identity
2. Create, edit, and complete missions and calculate the shared candy jar and activity levels
3. Send mission-event notifications and scheduled morning and evening reminders
4. Show daily missions in iOS and Android Home Screen widgets
5. Diagnose crashes and runtime errors and improve reliability and performance

We do **not** use personal information for advertising, marketing, profiling, or sale to third parties.

---

## 3. Processors and International Transfers

### A. Service Providers

| Provider | Purpose | Information shared |
|---|---|---|
| Supabase Inc. | Cloud database and authentication | Information listed in Section 1 |
| 650 Industries, Inc. (Expo) | Push-notification relay | Device token and notification content, including mission text |
| Apple Inc. (APNs) and Google LLC (FCM) | Final delivery of push notifications | Device token and notification content, including mission text |
| Apple Inc. and Google LLC | Social sign-in | Sign-in identifier |
| Functional Software, Inc. (Sentry) | Crash detection, diagnostics, and performance monitoring | Device model and OS, error logs, diagnostics, and sign-in identifier |

Core Service data is stored in a database region located in Seoul, Republic of Korea.

### B. International Transfers

Push delivery and error monitoring use global networks and infrastructure.

| Item | Details |
|---|---|
| Recipients | Expo, Apple (APNs), Google (FCM), and Sentry |
| Countries | The United States and other countries where each provider operates servers |
| Timing and method | Electronic transfer over HTTPS/TLS when a notification, crash, or monitored event occurs |
| Information | Device token, notification content including one-line mission text, device and OS information, error logs, diagnostics, and sign-in identifier |
| Purpose | Push delivery, crash diagnosis, and Service quality improvement |
| Retention | Until push delivery is complete; Sentry diagnostics for up to 90 days under its retention policy |

If a user disables notification permission in device settings, push-related international transfers do not occur.

---

## 4. Retention and Deletion

### A. Retention Periods

| Information | Deletion time |
|---|---|
| Completed missions and heart reactions | Permanently deleted 90 days after completion |
| Departing family member | Profile and device token deleted immediately; existing missions remain with requester and assignee references anonymized |
| Entire family | Family and all remaining data deleted immediately when the last member leaves |
| Deleted account | Account identifier, profile, device token, and related data deleted immediately on request in the app |
| Error logs and diagnostics | Permanently deleted no later than 90 days after collection |

Completed missions are retained for 90 days only to calculate recent activity, levels, and candy. They are deleted once that purpose ends.

### B. Deletion Procedure and Method

- **Procedure:** Data is deleted immediately or on schedule through server jobs, database triggers, and functions when a deletion condition occurs.
- **Method:** Electronic records are permanently deleted using technical methods that prevent recovery.

---

## 5. Your Rights and How to Exercise Them

You may request access, correction, deletion, or restriction of processing at any time.

- **In the app:**
  - Edit your nickname, character, color, reminder times, and app language in profile or app settings.
  - Edit or delete missions and manage reactions under the applicable mission rules.
  - Use Leave family or Delete account at the bottom of the profile screen to remove data immediately.
- **By email:** If you cannot use the app, contact `yellodevs@gmail.com` and we will respond without undue delay.

---

## 6. Children Under 14

- Only users aged 14 or older may register, and users confirm their age during sign-up and onboarding.
- We do not accept registration by children under 14. If we learn that information from a child under 14 was collected without consent from a legal guardian, we will delete it without delay.

---

## 7. Security Measures

1. **Encryption in transit:** Communication between the app and servers uses HTTPS/TLS.
2. **Access control:** Row Level Security at the database layer prevents access to data outside the user’s family.
3. **Least privilege:** The server administrator key is never included in the client app and is used only in an isolated server environment.

---

## 8. Privacy Contact

- **Operator:** yellodevs (Junyoung Suh and Heesung Kim)
- **Privacy contact:** Junyoung Suh, yellodevs
- **Email:** `yellodevs@gmail.com`

---

## 9. Remedies for Privacy Violations

Users may contact the following Korean authorities for privacy consultation or remedies:

- Personal Information Dispute Mediation Committee: 1833-6972 ([www.kopico.go.kr](https://www.kopico.go.kr))
- Personal Information Infringement Report Center: 118 ([privacy.kisa.or.kr](https://privacy.kisa.or.kr))
- Supreme Prosecutors’ Office Cyber Investigation: 1301 ([www.spo.go.kr](https://www.spo.go.kr))
- Korean National Police Cyber Bureau: 182 ([ecrm.police.go.kr](https://ecrm.police.go.kr))

---

## 10. Changes to this Policy

We may add, remove, or revise this Policy to reflect changes in law, policy, or security technology. We will provide notice in the app at least seven days before a change takes effect, or 30 days before a material or unfavorable change.

- **Published:** September 24, 2026
- **Effective:** September 24, 2026
