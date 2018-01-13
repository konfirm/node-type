/* global source, describe, it, expect */

const Type = source('type');

describe('README samples', () => {
	it('getTypeName', (next) => {
		const test = Promise.resolve();

		expect(Type.getTypeName('hello')).to.equal('string');
		expect(Type.getTypeName(Infinity)).to.equal('number');

		expect(Type.getTypeName(Promise)).to.equal('Promise');
		expect(Type.getTypeName(test)).to.equal('Promise');
		expect(Type.getTypeName(test, false)).to.equal('object');

		next();
	});

	it('instanceOf', (next) => {
		const test = Promise.resolve();

		expect(Type.instanceOf('Promise', test)).to.equal(true);

		next();
	});

	it('is', (next) => {
		expect(Type.is('boolean', false)).to.equal(true);
		expect(Type.is('boolean', true)).to.equal(true);
		expect(Type.is('boolean', null)).to.equal(false);

		next();
	});

	it('objectName', (next) => {
		const test = Promise.resolve();

		expect(Type.objectName(test)).to.equal('Promise');

		next();
	});

	it('functionName', (next) => {
		function helloWorld() {
			return 'hi';
		}

		const test = helloWorld;
		const result = Type.functionName(test);

		expect(result).to.equal('helloWorld');

		next();
	});
});
