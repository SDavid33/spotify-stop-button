# Spicetify Stop Button

A small Spicetify extension that adds a real-looking Stop button next to Spotify's Play/Pause button.

The button pauses playback and seeks the current track back to `0:00`, which is the closest practical "stop" behavior available in Spotify's desktop client.

![Stop button screenshot](screenshots/stop-button.png)

## Features

- Adds a Stop button directly to the right of the Play/Pause button
- Matches the Play button size and circular white design
- Uses a larger black stop icon for better visibility
- Stops playback by running `pause()` and `seek(0)`
- Re-attaches itself if Spotify re-renders the player controls

## Requirements

- Spotify desktop
- Spicetify
- Spicetify APIs exposed in config

## Install

Clone or download this repository, then run:

```powershell
powershell -ExecutionPolicy Bypass -File .\install.ps1
```

Or install manually:

```powershell
Copy-Item .\stopButton.js "$env:APPDATA\spicetify\Extensions\stopButton.js" -Force
spicetify config extensions "your-existing-extensions|stopButton.js"
spicetify apply
```

If Spotify does not refresh immediately, restart Spotify.

## Uninstall

Remove `stopButton.js` from the `extensions` list in:

```text
%APPDATA%\spicetify\config-xpui.ini
```

Then run:

```powershell
spicetify apply
```

## Screenshot

Put the repository screenshot here:

```text
screenshots/stop-button.png
```

The `screenshots` folder includes a placeholder so GitHub keeps the folder before an image is added.

## License

MIT
