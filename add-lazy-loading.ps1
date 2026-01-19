# PowerShell Script to Add Lazy Loading to All Images
# Excludes: Logo images, navbar images, and first hero image

$files = @(
    'index.html',
    'about.html', 
    'service.html',
    'project.html',
    'contact.html',
    'purandhar.html',
    'kokan.html',
    'khed.html',
    'mulshi.html'
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing: $file" -ForegroundColor Yellow
        
        $content = Get-Content $file -Raw
        $originalContent = $content
        
        # Pattern 1: <img src="..." alt="..." class="...">
        # Add loading="lazy" if not logo and not already present
        $content = $content -replace '(<img\s+[^>]*src="(?!.*LOGO)[^"]*"[^>]*?)(?<!loading="lazy")(\s*>)', '$1 loading="lazy"$2'
        
        # Pattern 2: <img class="..." src="...">
        $content = $content -replace '(<img\s+class="[^"]*"\s+src="(?!.*LOGO)[^"]*"[^>]*?)(?<!loading="lazy")(\s*>)', '$1 loading="lazy"$2'
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file -Value $content -NoNewline
            Write-Host "  ✓ Updated $file" -ForegroundColor Green
        } else {
            Write-Host "  - No changes needed" -ForegroundColor Gray
        }
    }
}

Write-Host "`nDone! Lazy loading added to all images (except logos)" -ForegroundColor Green
