export default async function(req, { ip, cookies, matches }) {
	return Response.json({
		url: req.url,
		method: req.method,
		headers: Object.fromEntries(req.headers),
		mode: req.mode,
		destination: req.destination,
		referrer: req.referrer,
		credentials: req.credentials,
		cache: req.cache,
		priority: req.priority,
		body: req.body instanceof ReadableStream ? await req.text() : null,
		signal: { aborted: req.signal.aborted, reason: req.signal.reason ?? null },
		context: {
			cookies,
			matches,
			ip,
		},
	});
}
