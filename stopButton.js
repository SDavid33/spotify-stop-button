(function stopButton() {
	const BUTTON_SELECTOR = "[data-stop-button-extension='true']";
	const PLAY_BUTTON_SELECTOR = [
		"[data-testid='control-button-playpause']",
		".main-playPauseButton-button",
		"button[aria-label='Play']",
		"button[aria-label='Pause']",
	].join(", ");
	const ICON_STOP = '<svg role="img" height="21" width="21" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="4" y="4" width="8" height="8" rx="1"/></svg>';

	function styleLikePlayButton(button, playButton) {
		const playButtonRect = playButton.getBoundingClientRect();
		const size = Math.max(32, Math.round(playButtonRect.width), Math.round(playButtonRect.height));

		button.className = "";
		button.style.width = `${size}px`;
		button.style.height = `${size}px`;
		button.style.minWidth = `${size}px`;
		button.style.minHeight = `${size}px`;
		button.style.padding = "0";
		button.style.border = "0";
		button.style.borderRadius = "50%";
		button.style.background = "#fff";
		button.style.color = "#000";
		button.style.display = "inline-flex";
		button.style.alignItems = "center";
		button.style.justifyContent = "center";
		button.style.cursor = "default";
		button.style.flexShrink = "0";
		button.style.lineHeight = "0";
		button.style.boxSizing = "border-box";
		button.style.appearance = "none";
	}

	function waitForSpicetify() {
		if (!window.Spicetify?.Player?.origin) {
			setTimeout(waitForSpicetify, 300);
			return;
		}

		const attachButton = () => {
			const playButton = document.querySelector(PLAY_BUTTON_SELECTOR);
			if (!playButton) return;

			let button = document.querySelector(BUTTON_SELECTOR);
			if (!button) {
				button = document.createElement("button");
				button.dataset.stopButtonExtension = "true";
				button.type = "button";
				button.setAttribute("aria-label", "Stop");
				button.setAttribute("title", "Stop");
				button.innerHTML = ICON_STOP;
				button.addEventListener("click", () => {
					try {
						Spicetify.Player.pause();
						Spicetify.Player.seek(0);
					} catch (error) {
						console.error("[Stop Button] Could not stop playback:", error);
						Spicetify.showNotification?.("Stop failed");
					}
				});
			}

			styleLikePlayButton(button, playButton);

			if (playButton.nextElementSibling !== button) {
				playButton.parentElement?.insertBefore(button, playButton.nextElementSibling);
			}
		};

		attachButton();
		new MutationObserver(attachButton).observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	waitForSpicetify();
})();
