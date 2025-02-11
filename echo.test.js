import { serve } from '@shgysk8zer0/http-server';
import { describe, test } from 'node:test';
import { ok, strictEqual, fail, doesNotReject } from 'node:assert';

const controller = new AbortController();
const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(1000)]);
const hostname = 'localhost';
const logger = fail;
const routes = { '/:path(*)': './echo.js' };
let port = 8001;

describe('Test http echo demo handler.', { signal }, async () => {
	const spinUp = (pathname = '/') => serve({ hostname, signal, logger, routes, pathname, port: port++ });
	const hello = new File(['Hello, World!'], 'hi.txt', { type: 'text/plain' });

	test('Check GET request to "/"', { signal }, async () => {
		try {
			const { server, url } = await spinUp();
			const resp = await fetch(url, { signal });

			ok(resp.ok, 'Response should be 200');
			strictEqual(resp.headers.get('Content-Type'), 'application/json', 'Response should be JSON.');
			await doesNotReject(() => resp.json(), 'Response should parse as JSON.');
			server.close();
		} catch(err) {
			controller.abort(err);
			fail(err);
		}
	});

	test('Check GET request to "/pathname"', { signal }, async () => {
		try {
			const { server, url } = await spinUp('/pathname');
			const resp = await fetch(url, { signal });

			ok(resp.ok, 'Response should be 200');
			strictEqual(resp.headers.get('Content-Type'), 'application/json', 'Response should be JSON.');
			await doesNotReject(() => resp.json(), 'Response should parse as JSON.');
			server.close();
		} catch(err) {
			controller.abort(err);
			fail(err);
		}
	});

	test('Check GET request with search', { signal }, async () => {
		try {
			const { server, url } = await spinUp('/pathname');
			const resp = await fetch(url + '?foo=bar', { signal });

			ok(resp.ok, 'Response should be 200');
			strictEqual(resp.headers.get('Content-Type'), 'application/json', 'Response should be JSON.');
			await doesNotReject(() => resp.json(), 'Response should parse as JSON.');
			server.close();
		} catch(err) {
			controller.abort(err);
			fail(err);
		}
	});

	test('Check DELETE request to "/"', { signal }, async () => {
		try {
			const { server, url } = await spinUp();
			const resp = await fetch(url, { method: 'DELETE', signal });

			ok(resp.ok, 'Response should be 200');
			strictEqual(resp.headers.get('Content-Type'), 'application/json', 'Response should be JSON.');
			await doesNotReject(() => resp.json(), 'Response should parse as JSON.');
			server.close();
		} catch(err) {
			controller.abort(err);
			fail(err);
		}
	});

	test('Check POST request to "/"', { signal }, async () => {
		try {
			const { server, url } = await spinUp();
			const body = new FormData();
			body.set('foo', 'bar');
			body.set('file', hello);
			const resp = await fetch(url, { method: 'POST', body, signal });

			ok(resp.ok, 'Response should be 200');
			strictEqual(resp.headers.get('Content-Type'), 'application/json', 'Response should be JSON.');
			await doesNotReject(() => resp.json(), 'Response should parse as JSON.');
			server.close();
		} catch(err) {
			controller.abort(err);
			fail(err);
		}
	});

	test('Check PUT request to "/"', { signal }, async () => {
		try {
			const { server, url } = await spinUp();
			const body = new FormData();
			body.set('foo', 'bar');
			body.set('file', hello);
			const resp = await fetch(url, { method: 'PUT', body, signal });
			ok(resp.ok, 'Response should be 200');
			strictEqual(resp.headers.get('Content-Type'), 'application/json', 'Response should be JSON.');
			await doesNotReject(() => resp.json(), 'Response should parse as JSON.');
			server.close();
		} catch(err) {
			controller.abort(err);
			fail(err);
		}
	});
});
