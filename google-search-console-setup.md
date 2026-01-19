# Google Search Console Setup Guide

## GREENSPACESS Website Indexing

---

## 📋 Step-by-Step Setup

### Step 1: Access Google Search Console

1. Go to: https://search.google.com/search-console/
2. Sign in with your Google account
3. Click "Add Property"

### Step 2: Choose Property Type

**Option A: Domain Property (Recommended)**

- Enter: `greenspacess.com`
- Requires DNS verification
- Covers all subdomains and protocols

**Option B: URL Prefix**

- Enter: `https://www.greenspacess.com`
- Easier verification
- Covers only specified URL

---

## 🔐 Verification Methods

### Method 1: HTML File Upload (Easiest)

1. Download verification file from Search Console
2. Upload to website root directory
3. Access: `https://www.greenspacess.com/google[xxxxx].html`
4. Click "Verify" in Search Console

### Method 2: HTML Tag (Recommended)

1. Copy meta tag from Search Console
2. Add to `<head>` section of index.html:

```html
<meta name="google-site-verification" content="your-verification-code" />
```

3. Click "Verify"

### Method 3: Google Analytics

- If GA4 already installed
- Use same Google account
- Automatic verification

### Method 4: DNS Record

- Add TXT record to domain DNS
- Best for domain-level property

---

## 📤 Submit Sitemap

### After Verification:

1. Go to "Sitemaps" in left menu
2. Enter sitemap URL: `https://www.greenspacess.com/sitemap.xml`
3. Click "Submit"
4. Wait 24-48 hours for indexing

---

## 🎯 Important Settings

### 1. Set Preferred Domain

- www vs non-www
- Recommended: `https://www.greenspacess.com`

### 2. Set Target Country

- Go to Settings → International Targeting
- Select: India

### 3. Set Crawl Rate

- Usually automatic
- Can request changes if needed

---

## 📊 Monitor These Metrics

### Performance Tab

- Total clicks
- Total impressions
- Average CTR (Click-through rate)
- Average position
- Top queries
- Top pages

### Coverage Tab

- Valid pages
- Errors
- Warnings
- Excluded pages

### Enhancements

- Mobile usability
- Core Web Vitals
- Breadcrumbs
- Sitelinks

---

## 🚀 Request Indexing (For New Pages)

### Manual Indexing:

1. Go to URL Inspection tool
2. Enter page URL
3. Click "Request Indexing"
4. Wait 1-7 days

### Priority Pages to Index First:

1. ✅ Homepage (index.html)
2. ✅ Purandhar Project
3. ✅ Konkan Project
4. ✅ Mulshi Project
5. ✅ Khed Project
6. ✅ Contact Page
7. ✅ About Page
8. ✅ Services Page
9. ✅ Projects Page

---

## ⚠️ Common Issues & Solutions

### Issue 1: "Submitted URL not found (404)"

**Solution:** Check if page exists and is accessible

### Issue 2: "Submitted URL blocked by robots.txt"

**Solution:** Check robots.txt file, ensure Allow: /

### Issue 3: "Crawled - currently not indexed"

**Solution:** Improve content quality, add more text, internal links

### Issue 4: "Duplicate content"

**Solution:** Use canonical tags (already added)

---

## 📈 Expected Timeline

- **Day 1:** Submit sitemap
- **Day 2-3:** Google starts crawling
- **Day 4-7:** Pages start appearing in index
- **Week 2-4:** Full indexing complete
- **Month 1-3:** Rankings improve

---

## 🔗 Important URLs

- Search Console: https://search.google.com/search-console/
- Sitemap: https://www.greenspacess.com/sitemap.xml
- Robots.txt: https://www.greenspacess.com/robots.txt

---

## ✅ Checklist

- [ ] Create Search Console account
- [ ] Verify website ownership
- [ ] Submit sitemap.xml
- [ ] Set target country (India)
- [ ] Request indexing for all 9 pages
- [ ] Set up email alerts
- [ ] Link with Google Analytics
- [ ] Monitor coverage report weekly
- [ ] Check mobile usability
- [ ] Review Core Web Vitals

---

## 📞 Support

If you face issues:

- Google Search Console Help: https://support.google.com/webmasters/
- Community Forum: https://support.google.com/webmasters/community
