export default (url) => {
	const parts = url.split('/');
	parts[parts.length - 1] = `small_${parts[parts.length - 1]}`;
	return parts.join('/')
};
