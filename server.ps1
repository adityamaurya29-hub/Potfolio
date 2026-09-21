# Lightweight Static Web Server with GitHub OAuth Proxy for Local Preview
param([int]$Port = 8080)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host " Cyber Portfolio Server active at http://localhost:$Port/" -ForegroundColor Green
Write-Host " GitHub OAuth Endpoint: http://localhost:$Port/api/github/token" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Cyan

$mimeTypes = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Handle CORS Preflight
        if ($request.HttpMethod -eq "OPTIONS") {
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization")
            $response.StatusCode = 204
            $response.Close()
            continue
        }

        $rawUrl = $request.RawUrl.Split('?')[0]

        # GitHub OAuth Token Exchange Proxy
        if ($rawUrl -eq "/api/github/token" -and $request.HttpMethod -eq "POST") {
            try {
                $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
                $postBody = $reader.ReadToEnd()
                $json = $postBody | ConvertFrom-Json

                $bodyHash = @{
                    client_id = $json.client_id
                    client_secret = $json.client_secret
                    code = $json.code
                }
                $jsonPayload = $bodyHash | ConvertTo-Json

                $ghHeaders = @{
                    "Accept" = "application/json"
                    "Content-Type" = "application/json"
                    "User-Agent" = "AdityaKumar-Portfolio-App"
                }

                $ghResponse = Invoke-RestMethod -Uri "https://github.com/login/oauth/access_token" -Method Post -Body $jsonPayload -Headers $ghHeaders
                $respJson = $ghResponse | ConvertTo-Json
                $respBytes = [System.Text.Encoding]::UTF8.GetBytes($respJson)

                $response.ContentType = "application/json"
                $response.ContentLength64 = $respBytes.Length
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.OutputStream.Write($respBytes, 0, $respBytes.Length)
                $response.StatusCode = 200
            } catch {
                $errObj = @{ error = $_.Exception.Message }
                $errJson = $errObj | ConvertTo-Json
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes($errJson)
                $response.ContentType = "application/json"
                $response.ContentLength64 = $errBytes.Length
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
                $response.StatusCode = 500
            }
            $response.Close()
            continue
        }

        if ($rawUrl -eq "/" -or $rawUrl -eq "") {
            $rawUrl = "/index.html"
        }

        $localPath = Join-Path (Get-Location) ($rawUrl.TrimStart('/'))
        $localPath = [System.IO.Path]::GetFullPath($localPath)

        if (Test-Path $localPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.StatusCode = 200
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
