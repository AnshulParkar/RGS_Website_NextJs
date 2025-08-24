# Email Configuration Setup

This project can use your Hostinger domain email (via SMTP) for sending transactional emails. Follow these steps to set up email functionality:

## 1. Hostinger SMTP Setup

1. Log in to Hostinger and go to Emails → Email Accounts.
2. Create or use an existing email (e.g., noreply@yourdomain.com).
3. Click “Connect Devices” to find your SMTP server, port, username, and password.
4. Save these credentials for the next step.

## 2. Environment Variables

Create a `.env.local` file in your project root and add:

\`\`\`env
# Hostinger SMTP Configuration
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=infoy@roopglass.com
SMTP_PASS=Anshul@1832004

# Email Configuration
FROM_EMAIL=info@roopglass.com
CONTACT_EMAIL=info@roopglass.com
SALES_EMAIL=info@roopglass.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.roopglass.com
\`\`\`

## 3. Update Email Sending Logic

1. Install Nodemailer:
   ```sh
   pnpm add nodemailer
   ```
2. Update the `sendEmail` function in `lib/email.ts` to use Nodemailer with your Hostinger SMTP credentials. Example:
   ```js
   import nodemailer from "nodemailer";

   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: Number(process.env.SMTP_PORT),
     secure: true, // true for port 465, false for 587
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS,
     },
   });

   export async function sendEmail({ to, subject, html }) {
     await transporter.sendMail({
       from: `"Your Name" <${process.env.FROM_EMAIL}>`,
       to,
       subject,
       html,
     });
   }
   ```

## 4. Domain Verification (Recommended)

For best deliverability, ensure your domain's DNS records (SPF, DKIM) are set up in Hostinger. See Hostinger's email documentation for details.

## 5. Email Templates

The system includes professionally designed HTML email templates for:

- **Contact Form Notifications**: Sent to your business email when someone submits the contact form
- **Contact Confirmations**: Sent to customers confirming their message was received
- **Quote Request Notifications**: Sent to sales team with detailed quote information
- **Quote Confirmations**: Sent to customers confirming their quote request

## 6. Testing

For development, you can:

1. Use a test email account
2. Set up email forwarding to your personal email
3. Check the console logs for email content if needed

## 7. Features

✅ **Professional HTML Templates**: Modern, responsive email designs
✅ **Automatic Notifications**: Business receives immediate notifications
✅ **Customer Confirmations**: Customers get instant confirmation emails
✅ **Priority Handling**: Emergency quotes get special formatting
✅ **File Attachment Support**: Support for uploaded sketches and documents
✅ **Error Handling**: Graceful fallback when email services are unavailable
✅ **Mobile Responsive**: Emails look great on all devices

## 8. Customization

To customize email templates:

1. Edit the HTML templates in `lib/email.ts`
2. Modify the email content, styling, and structure
3. Update company information and branding
4. Add additional email types as needed

## 9. Alternative Email Services

If you prefer a different email service, you can easily swap out Hostinger SMTP for:

- **SendGrid**: API-based, popular for transactional email
- **Mailgun**: Popular alternative with similar API
- **AWS SES**: Cost-effective for high volume
- **Postmark**: Great for transactional emails

Simply update the `sendEmail` function in `lib/email.ts` to use your preferred service.
