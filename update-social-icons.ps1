$files = @("mulshi.html", "about.html", "contact.html", "khed.html", "kokan.html", "purandhar.html")

$oldPattern = @"
                <div class="d-flex pt-2">
                  <a
                    class="btn btn-square btn-outline-light rounded-circle me-2"
                    href=""
                    ><i class="fab fa-twitter"></i
                  ></a>
                  <a
                    class="btn btn-square btn-outline-light rounded-circle me-2"
                    href=""
                    ><i class="fab fa-facebook-f"></i
                  ></a>
                  <a
                    class="btn btn-square btn-outline-light rounded-circle me-2"
                    href=""
                    ><i class="fab fa-youtube"></i
                  ></a>
                  <a
                    class="btn btn-square btn-outline-light rounded-circle me-2"
                    href=""
                    ><i class="fab fa-linkedin-in"></i
                  ></a>
                </div>
"@

$newPattern = @"
                <div class="d-flex pt-2">
                  <a
                    class="btn btn-square btn-outline-light rounded-circle me-2"
                    href="https://www.facebook.com/greenspacess"
                    target="_blank"
                    ><i class="fab fa-facebook-f"></i
                  ></a>
                  <a
                    class="btn btn-square btn-outline-light rounded-circle me-2"
                    href="https://wa.me/917972258038"
                    target="_blank"
                    ><i class="fab fa-whatsapp"></i
                  ></a>
                  <a
                    class="btn btn-square btn-outline-light rounded-circle me-2"
                    href="https://www.youtube.com/@greenspacess"
                    target="_blank"
                    ><i class="fab fa-youtube"></i
                  ></a>
                  <a
                    class="btn btn-square btn-outline-light rounded-circle me-2"
                    href="https://www.instagram.com/greenspacess"
                    target="_blank"
                    ><i class="fab fa-instagram"></i
                  ></a>
                </div>
"@

foreach ($file in $files) {
    $content = Get-Content $file -Raw
    $content = $content -replace [regex]::Escape($oldPattern), $newPattern
    Set-Content $file -Value $content -NoNewline
    Write-Host "Updated $file"
}

Write-Host "All files updated successfully!"
