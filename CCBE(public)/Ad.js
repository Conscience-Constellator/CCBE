export function Is_Ad_PlAng()
{
	return document.querySelector(".html5-video-player")?.
		classList.contains("ad-showing");
}