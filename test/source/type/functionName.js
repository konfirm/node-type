/* global source, describe, it, expect */

const Type = source('type');

function foo() {}
function bar() {}

describe('Type.functionName', () => {
	it('identifies String', (next) => {
		expect(Type.functionName(String)).to.equal('String');

		next();
	});

	it('identifies Number', (next) => {
		expect(Type.functionName(Number)).to.equal('Number');

		next();
	});

	it('identifies Boolean', (next) => {
		expect(Type.functionName(Boolean)).to.equal('Boolean');

		next();
	});

	it('identifies custom functions', (next) => {
		expect(Type.functionName(foo)).to.equal('foo');
		expect(Type.functionName(bar)).to.equal('bar');

		next();
	});

	it('does not trip on non-functions', (next) => {
		expect(Type.functionName('foo')).to.equal(undefined);
		expect(Type.functionName(String('foo'))).to.equal(undefined);

		expect(Type.functionName(1)).to.equal(undefined);
		expect(Type.functionName(Math.PI)).to.equal(undefined);
		expect(Type.functionName(Infinity)).to.equal(undefined);
		expect(Type.functionName(Number('1'))).to.equal(undefined);

		expect(Type.functionName(true)).to.equal(undefined);
		expect(Type.functionName(false)).to.equal(undefined);
		expect(Type.functionName(Boolean(1))).to.equal(undefined);

		expect(Type.functionName([])).to.equal(undefined);
		expect(Type.functionName({})).to.equal(undefined);

		expect(Type.functionName(null)).to.equal(undefined);
		expect(Type.functionName(undefined)).to.equal(undefined);

		next();
	});
});
