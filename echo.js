export default async function(req, { searchParams, ... context}) {
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
		context: { searchParams: Object.fromEntries(searchParams), ...context },
	});
}
