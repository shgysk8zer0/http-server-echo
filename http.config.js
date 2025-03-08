const controller = new AbortController();

export default {
	hostname: 'localhost',
	port: 8032,
	signal: controller.signal,
	logger: controller.abort,
	routes: {
		'/:path(*)': import.meta.resolve('./echo.js'),
	}
};
