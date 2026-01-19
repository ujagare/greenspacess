# 🔍 Find & Replace Tutorial - Add Lazy Loading

## Step-by-Step Guide with Screenshots

---

## Method 1: VS Code (Recommended)

### Step 1: Open VS Code

1. Open VS Code
2. Open your project folder (File → Open Folder)
3. Select the folder containing all HTML files

### Step 2: Open Find & Replace in Files

**Option A:** Press `Ctrl + Shift + H` (Windows/Linux)  
**Option B:** Press `Cmd + Shift + H` (Mac)  
**Option C:** Click Edit → Replace in Files

### Step 3: Enter Find & Replace Text

**In the "Find" box, type:**

```
<img src="
```

**In the "Replace" box, type:**

```
<img loading="lazy" src="
```

### Step 4: Select Files to Search

**In "files to include" box, type:**

```
*.html
```

This will search only HTML files.

### Step 5: Preview Changes

1. Click the "Replace All" icon (or press `Ctrl + Alt + Enter`)
2. VS Code will show you how many replacements will be made
3. Example: "Replace 161 occurrences across 9 files"

### Step 6: Confirm Replace

1. Click "Replace All" button
2. All images will now have `loading="lazy"`

### Step 7: Remove from Logos (Important!)

Now we need to remove lazy loading from logos:

**Find:**

```
<img loading="lazy" src="img/LOGO
```

**Replace with:**

```
<img src="img/LOGO
```

Click "Replace All" again.

---

## Method 2: Notepad++ (Alternative)

### Step 1: Open Notepad++

1. Open Notepad++
2. Click File → Open
3. Select all HTML files (hold Ctrl and click each file)

### Step 2: Open Find & Replace

**Press:** `Ctrl + H`

### Step 3: Enter Text

**Find what:**

```
<img src="
```

**Replace with:**

```
<img loading="lazy" src="
```

### Step 4: Replace in All Open Files

1. Click "Replace All in All Opened Documents"
2. Notepad++ will show count of replacements

### Step 5: Remove from Logos

**Find what:**

```
<img loading="lazy" src="img/LOGO
```

**Replace with:**

```
<img src="img/LOGO
```

Click "Replace All in All Opened Documents"

---

## Method 3: Manual (One File at a Time)

### For Each HTML File:

#### Step 1: Open File

Open `index.html` in any text editor

#### Step 2: Press Ctrl + H

This opens Find & Replace dialog

#### Step 3: Enter Text

**Find:** `<img src="`  
**Replace:** `<img loading="lazy" src="`

#### Step 4: Click "Replace All"

#### Step 5: Save File (Ctrl + S)

#### Step 6: Repeat for Other Files

- about.html
- service.html
- project.html
- contact.html
- purandhar.html
- kokan.html
- khed.html
- mulshi.html

---

## 🎯 Visual Guide

### Before:

```html
<img src="img/project.jpg" alt="Project" class="img-fluid" />
```

### After:

```html
<img loading="lazy" src="img/project.jpg" alt="Project" class="img-fluid" />
```

---

## ⚠️ Important: Don't Add to These

### Logo Images (Remove if added):

```html
<!-- CORRECT (No lazy loading) -->
<img src="img/LOGO/Greenspacess_Black BG Logo.png" alt="Logo" />

<!-- WRONG (Remove lazy loading from logos) -->
<img loading="lazy" src="img/LOGO/Greenspacess_Black BG Logo.png" alt="Logo" />
```

### First Hero Image (Keep as is):

```html
<!-- CORRECT (No lazy loading for above-the-fold hero) -->
<img src="img/purnadar/purnadarhero.png" alt="Hero" class="w-full h-full" />
```

---

## ✅ Verification Steps

### Step 1: Check One File

Open `index.html` and search for `loading="lazy"`

You should see many results like:

```html
<img loading="lazy" src="img/about.jpg" alt="About" />
<img loading="lazy" src="img/project-1.jpg" alt="Project" />
```

### Step 2: Count Replacements

**In VS Code:**

1. Press `Ctrl + F`
2. Search for: `loading="lazy"`
3. It will show count (e.g., "30 of 30")

**Expected counts:**

- index.html: ~30
- purandhar.html: ~15
- kokan.html: ~25
- khed.html: ~20
- mulshi.html: ~17

### Step 3: Test in Browser

1. Open your website
2. Press F12 (DevTools)
3. Go to Network tab
4. Filter by "Img"
5. Reload page
6. Scroll down slowly
7. You should see images loading as you scroll

---

## 🚨 Common Mistakes

### Mistake 1: Adding to Logo

```html
<!-- WRONG -->
<img loading="lazy" src="img/LOGO/logo.png" />

<!-- CORRECT -->
<img src="img/LOGO/logo.png" />
```

### Mistake 2: Wrong Syntax

```html
<!-- WRONG -->
<img loading="lazy" src="..." />

<!-- CORRECT -->
<img loading="lazy" src="..." />
```

### Mistake 3: Adding Twice

```html
<!-- WRONG -->
<img loading="lazy" loading="lazy" src="..." />

<!-- CORRECT -->
<img loading="lazy" src="..." />
```

---

## 🎬 Video Tutorial Steps

### If you're following a video:

**Minute 0:00-0:30:** Open VS Code  
**Minute 0:30-1:00:** Press Ctrl+Shift+H  
**Minute 1:00-1:30:** Type find text  
**Minute 1:30-2:00:** Type replace text  
**Minute 2:00-2:30:** Click Replace All  
**Minute 2:30-3:00:** Remove from logos  
**Minute 3:00-3:30:** Save and test

---

## 📱 Alternative: Use Kiro IDE

### If you're using Kiro IDE:

1. **Select all HTML files** in file explorer
2. **Right-click** → "Find in Files"
3. **Enter find text:** `<img src="`
4. **Enter replace text:** `<img loading="lazy" src="`
5. **Click "Replace All"**
6. **Repeat to remove from logos**

---

## 🔧 PowerShell Method (Advanced)

### If you prefer command line:

```powershell
# Navigate to project folder
cd "C:\path\to\your\project"

# Add lazy loading to all images
Get-ChildItem *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace '<img src="', '<img loading="lazy" src="'
    Set-Content $_.FullName $content -NoNewline
}

# Remove from logos
Get-ChildItem *.html | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace '<img loading="lazy" src="img/LOGO', '<img src="img/LOGO'
    Set-Content $_.FullName $content -NoNewline
}

Write-Host "Done! Lazy loading added to all images (except logos)"
```

---

## 📊 Expected Results

### Before Find & Replace:

```
Total images: 161
With lazy loading: 0
PageSpeed score: 40-60
```

### After Find & Replace:

```
Total images: 161
With lazy loading: ~155 (excluding logos and hero)
PageSpeed score: 70-85 (+30 points)
```

---

## 🎯 Quick Reference Card

| Action             | Shortcut       | What to Type                |
| ------------------ | -------------- | --------------------------- |
| Open Find in Files | Ctrl+Shift+H   | -                           |
| Find               | -              | `<img src="`                |
| Replace            | -              | `<img loading="lazy" src="` |
| Replace All        | Ctrl+Alt+Enter | -                           |
| Save All           | Ctrl+K S       | -                           |

---

## ✅ Final Checklist

After completing Find & Replace:

- [ ] Opened VS Code / Text Editor
- [ ] Pressed Ctrl+Shift+H
- [ ] Entered find text: `<img src="`
- [ ] Entered replace text: `<img loading="lazy" src="`
- [ ] Clicked "Replace All"
- [ ] Removed lazy loading from logos
- [ ] Saved all files
- [ ] Tested in browser
- [ ] Checked Network tab
- [ ] Images load on scroll ✅
- [ ] Ran PageSpeed test
- [ ] Score improved by 20-30 points ✅

---

## 📞 Need Help?

### If Find & Replace doesn't work:

1. Make sure you're in the correct folder
2. Check file extensions are .html
3. Try one file at a time first
4. Use Ctrl+Z to undo if something goes wrong

### If images don't load:

1. Check syntax: `loading="lazy"` (with quotes)
2. Clear browser cache
3. Test in incognito mode
4. Check browser console for errors

---

**Time Required:** 2-3 minutes  
**Difficulty:** Easy  
**Impact:** +30 PageSpeed points  
**Risk:** Low (can undo with Ctrl+Z)

**You can do this! 🚀**
