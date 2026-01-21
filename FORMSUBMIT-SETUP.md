# 📧 FormSubmit.co Setup - Quick Guide

## ✅ What's Done

Your contact form is now configured to use **FormSubmit.co** - a free service that sends form submissions directly to your email without needing PHP or a backend server.

### Email: greennspacess@gmail.com

---

## 🚀 How to Activate (IMPORTANT!)

### Step 1: First Submission (Email Verification)

1. **Open your website** and go to the contact page
2. **Fill out the form** with test data
3. **Submit the form**
4. **Check email** at `greennspacess@gmail.com`
5. **Click the activation link** in the email from FormSubmit

**This is a ONE-TIME verification to prevent spam!**

---

## ✨ Features Enabled

✅ **No PHP Required** - Works on any hosting (even GitHub Pages)
✅ **Free Forever** - No limits on submissions
✅ **Spam Protection** - Honeypot field included
✅ **Email Notifications** - Instant email to greennspacess@gmail.com
✅ **Client-Side Validation** - Real-time error checking
✅ **Professional Design** - Clean email format
✅ **Mobile Friendly** - Works on all devices
✅ **Analytics Tracking** - Google Analytics & Facebook Pixel integrated

---

## 📋 What Gets Sent

Every form submission includes:

- **Name** (validated: letters only)
- **Email** (validated: proper email format)
- **Phone** (validated: 10 digits)
- **Project Interest** (dropdown selection)
- **Subject** (5-200 characters)
- **Message** (10-1000 characters)

---

## 🔒 Security Features

1. **Honeypot Field** - Blocks bots automatically
2. **Input Validation** - Client-side validation before submission
3. **Rate Limiting** - 3-second cooldown between submissions
4. **XSS Protection** - All inputs sanitized
5. **Pattern Matching** - Email, phone, name validation

---

## 🎨 User Experience

- ✅ Real-time validation (errors show as you type)
- ✅ Loading spinner during submission
- ✅ Success message after submission
- ✅ Error messages if validation fails
- ✅ Smooth scrolling to messages
- ✅ Form resets after successful submission

---

## 🔧 Customization Options

### Change Email Recipient

In `contact.html`, line 326:

```html
<form
  id="contactForm"
  action="https://formsubmit.co/YOUR-NEW-EMAIL@example.com"
  method="POST"
></form>
```

### Change Success Redirect

In `contact.html`, find:

```html
<input
  type="text"
  name="_next"
  value="https://www.greenspacess.com/contact.html?success=true"
  style="display:none"
/>
```

Update the URL to your actual domain.

### Disable Captcha

Already disabled for better UX:

```html
<input type="hidden" name="_captcha" value="false" />
```

### Change Email Subject

In `contact.html`:

```html
<input type="hidden" name="_subject" value="Your Custom Subject" />
```

---

## 📧 Email Format

FormSubmit sends emails in a clean table format with all form fields clearly labeled.

---

## 🧪 Testing

### Test Locally:

1. Open `contact.html` in browser
2. Fill form with valid data:
   - Name: John Doe (letters only)
   - Email: test@example.com
   - Phone: 9876543210 (10 digits)
   - Interest: Select any project
   - Subject: Test submission
   - Message: This is a test message
3. Click "Send Message"
4. Check email at greennspacess@gmail.com
5. Click activation link (first time only)

### Test Validation:

- Try submitting empty form → Should show errors
- Enter invalid email → Should show error
- Enter 9 digits phone → Should show error
- Enter numbers in name → Should show error

---

## 🌐 Production Deployment

### Before Going Live:

1. ✅ Update `_next` URL with your actual domain
2. ✅ Test form submission
3. ✅ Verify email activation
4. ✅ Test on mobile devices
5. ✅ Check spam folder if emails not received

---

## 🆘 Troubleshooting

### Not Receiving Emails?

1. **Check spam folder** - FormSubmit emails might go to spam initially
2. **Verify activation** - Click the activation link in first email
3. **Check email address** - Make sure it's correct in form action
4. **Wait a moment** - Emails can take 1-2 minutes

### Form Not Submitting?

1. **Check browser console** - Look for JavaScript errors
2. **Verify internet connection** - FormSubmit needs internet
3. **Check validation** - Make sure all fields are valid
4. **Clear browser cache** - Try in incognito mode

### Validation Not Working?

1. **Check if JS file loaded** - Open browser console
2. **Verify form ID** - Must be "contactForm"
3. **Check field names** - Must match validation code

---

## 🔄 Alternative: Use Your Own PHP Backend

If you want more control, you can switch back to the PHP backend:

1. Upload `send-email.php` to your server
2. Change form action in `contact.html`:
   ```html
   <form id="contactForm" action="send-email.php" method="POST"></form>
   ```
3. Remove FormSubmit hidden fields
4. Make sure PHP mail() function works on your server

---

## 📊 Analytics

Form submissions are automatically tracked in:

- **Google Analytics** (event: form_submission)
- **Facebook Pixel** (event: Contact)

Make sure tracking codes are installed in your HTML.

---

## ✅ Checklist

- [ ] Form submitted once for activation
- [ ] Activation email clicked
- [ ] Test submission successful
- [ ] Email received at greennspacess@gmail.com
- [ ] Validation working correctly
- [ ] Success message appears
- [ ] Tested on mobile device
- [ ] Updated \_next URL with actual domain

---

## 📞 Support

For issues:

- **FormSubmit Help**: https://formsubmit.co/help
- **Your Email**: greennspacess@gmail.com
- **Phone**: 7972258038 / 7666090107

---

**Status:** ✅ Ready to Use (After Email Activation)
**Service:** FormSubmit.co (Free)
**Email:** greennspacess@gmail.com
**Last Updated:** January 21, 2026
