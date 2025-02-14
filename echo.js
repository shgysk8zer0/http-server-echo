/**
 *
 * @param {Request} request
 * @param {object} context
 * @param {URLSearchParams} context.searchParams
 * @returns {Promise<Response>}
 */
export default async function(request, { searchParams, ...context }) {
	return Response.json({
		url: request.url,
		method: request.method,
		headers: Object.fromEntries(request.headers),
		mode: request.mode,
		destination: request.destination,
		referrer: request.referrer,
		credentials: request.credentials,
		cache: request.cache,
		priority: request.priority,
		body: request.body instanceof ReadableStream ? Array.from(await request.bytes()) : null,
		signal: { aborted: request.signal.aborted, reason: request.signal.reason ?? null },
		context: {
			searchParams: Object.fromEntries(Array.from(
				searchParams.keys(),
				key => [key, searchParams.getAll(key)]
			)),
			...context
		},
	});
}
