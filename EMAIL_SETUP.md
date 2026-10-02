# Email Configuration Setup (Gmail SMTP)

This project uses **Gmail SMTP** with Nodemailer to send and receive transactional emails (contact form inquiries and quote requests) using `info.roopglass@gmail.com`.

---

## 1. How to Generate a Google App Password

> [!IMPORTANT]
> Google does **not** allow regular Gmail account passwords for automated SMTP access. You **must** generate a 16-character **App Password**.

Follow these exact steps:

1. **Log in to Google**:
   Open [Google Account Management](https://myaccount.google.com/) and ensure you are logged into **`info.roopglass@gmail.com`**.

2. **Enable 2-Step Verification** (if not already enabled):
   - In the left sidebar, click **Security**.
   - Under the *"How you sign in to Google"* section, click **2-Step Verification** and complete setup with your phone number.

3. **Generate App Password**:
   - In the top search bar of your Google Account page, type **"App passwords"** and click on it, or navigate directly to:  
     👉 **https://myaccount.google.com/apppasswords**
   - Under **App name**, enter: `RoopGlass Website`
   - Click **Create**.
   - A modal will show a **16-character password** (e.g. `abcd efgh ijkl mnop`).
   - Copy this 16-character code.

---

## 2. Environment Variables Configuration

Open your `.env` file in the project root and enter your credentials:

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=info.roopglass@gmail.com
SMTP_PASS=paste_your_16_character_app_password_here

# Email Configuration
FROM_EMAIL=info.roopglass@gmail.com
CONTACT_EMAIL=info.roopglass@gmail.com
SALES_EMAIL=info.roopglass@gmail.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> [!NOTE]
> When deploying to production (e.g. Vercel, Netlify, VPS), remember to add these exact same environment variables to your deployment provider's dashboard and set `NEXT_PUBLIC_SITE_URL` to `https://www.roopglass.com`.

---

## 3. Verify and Test Email Setup

You can verify your email configuration directly from your terminal without opening a browser:

```sh
node scripts/test-email.mjs
```

If configured correctly, you will receive a test email in `info.roopglass@gmail.com` confirming that SMTP authentication succeeded.

---

## 4. How Email Routing Works

- **Contact Form**:
  - Notification sent to: `CONTACT_EMAIL` (`info.roopglass@gmail.com`)
  - Confirmation sent to: Customer's submitted email
  - `replyTo` header is set to customer's email, so clicking **Reply** in Gmail directly replies to the customer!
- **Quote Form**:
  - Notification sent to: `SALES_EMAIL` (`info.roopglass@gmail.com`)
  - Confirmation sent to: Customer's submitted email
  - Urgent/Emergency badges applied to email subjects

---

## 5. Troubleshooting Common Gmail Issues

| Issue / Error | Cause | Solution |
|---|---|---|
| `Invalid login: 535-5.7.8 Username and Password not accepted` | Using standard account password instead of App Password, or typo in email | Ensure 2-Step Verification is ON and use the 16-character App Password generated from `myaccount.google.com/apppasswords`. |
| `ETIMEDOUT` or connection hanging | Port blocked by network or ISP | Ensure `SMTP_PORT=465` (SSL) or try `SMTP_PORT=587` (TLS). |
| Emails landing in Spam | Google / recipient spam filtering | Sending from the authenticated address (`info.roopglass@gmail.com`) as `FROM_EMAIL` resolves reputation mismatches. |
