$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$source = Join-Path $repoRoot "stopButton.js"
$extensionDir = Join-Path $env:APPDATA "spicetify\Extensions"
$target = Join-Path $extensionDir "stopButton.js"
$config = Join-Path $env:APPDATA "spicetify\config-xpui.ini"

if (-not (Get-Command spicetify -ErrorAction SilentlyContinue)) {
	Write-Error "Spicetify was not found in PATH."
}

if (-not (Test-Path $source)) {
	Write-Error "stopButton.js was not found next to install.ps1."
}

New-Item -ItemType Directory -Path $extensionDir -Force | Out-Null
Copy-Item -LiteralPath $source -Destination $target -Force

$configContent = Get-Content -LiteralPath $config
$extensionLine = $configContent | Where-Object { $_ -match "^\s*extensions\s*=" } | Select-Object -First 1

if ($extensionLine) {
	$currentValue = ($extensionLine -split "=", 2)[1].Trim()
	$extensions = @()
	if ($currentValue) {
		$extensions = $currentValue -split "\|" | Where-Object { $_ }
	}
	if ($extensions -notcontains "stopButton.js") {
		$extensions += "stopButton.js"
	}
	spicetify config extensions ($extensions -join "|")
} else {
	spicetify config extensions "stopButton.js"
}

spicetify apply

Write-Host "Installed stopButton.js. Restart Spotify if the button is not visible yet."
