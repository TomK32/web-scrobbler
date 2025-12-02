export {};

Connector.playerSelector = '[data-testid*="tracks"]';

function nowPlayingElement() {
	return document.querySelectorAll(Connector.playerSelector + ' li')?.values()
		.find( (element) => { return element.textContent?.toLowerCase().includes('now playing') } );
}

Connector.isPlaying = () => {
	const btn = document.querySelector('[data-testid="play_pause_button"]');
	return btn?.getAttribute('aria-label')?.toUpperCase() === 'PAUSE';
};

Connector.scrobblingDisallowedReason = () => {
	return nowPlayingElement() ? null : 'Other';
};

Connector.getArtistTrack = () => {
	const element = nowPlayingElement();

	if (!element) { return null; }

	const cleanText = (element as HTMLElement).innerText
		.replace(/(^\d\.|\nnow playing)/gi, '')
		.trim();

	const parts = cleanText.split('\n');
	const track = parts[0]?.trim();
	const artist = parts[1]?.trim();

	return { artist, track };
};

Connector.getTrackArt = () => {
	return nowPlayingElement()?.querySelector('img')?.src;
};
