export default (links) => {	
	for (let i = 0; i < links.length; i++) {
		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = 'image';
		link.href = links[i];

		document.head.appendChild(link)
	}
};
