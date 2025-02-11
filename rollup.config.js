import nodeResolve from '@rollup/plugin-node-resolve';

export default [{
	input: 'echo.js',
	plugins: [nodeResolve()],
	output: [{
		file: 'echo.cjs',
		format: 'cjs',
	}],
}];
