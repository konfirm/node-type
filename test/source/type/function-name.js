/* global source, describe, it, expect */

const Type = source('type');

function foo() {
	//  intentionally left blank
}
function bar() {
	//  intentionally left blank
}

describe('Type.functionName', () => {
	it('identifies built-in constructors', (next) => {
		const builtin = {
			String,
			Number,
			Boolean,
			Object,
			Array,
			Date,
			RegExp,
			Symbol,
			Map,
			WeakMap,
			Promise,
		};

		Object.keys(builtin).forEach((name) => expect(Type.functionName(builtin[name])).to.equal(name));

		next();
	});

	it('identifies custom functions', (next) => {
		expect(Type.functionName(foo)).to.equal('foo');
		expect(Type.functionName(bar)).to.equal('bar');

		next();
	});

	it('does not trip on non-functions', (next) => {
		expect(Type.functionName('foo')).to.be.undefined();
		expect(Type.functionName(String('foo'))).to.be.undefined();

		expect(Type.functionName(1)).to.be.undefined();
		expect(Type.functionName(Math.PI)).to.be.undefined();
		expect(Type.functionName(Infinity)).to.be.undefined();
		expect(Type.functionName(Number('1'))).to.be.undefined();

		expect(Type.functionName(true)).to.be.undefined();
		expect(Type.functionName(false)).to.be.undefined();
		expect(Type.functionName(Boolean(1))).to.be.undefined();

		expect(Type.functionName([])).to.be.undefined();
		expect(Type.functionName({})).to.be.undefined();

		expect(Type.functionName(null)).to.be.undefined();
		expect(Type.functionName()).to.be.undefined();

		next();
	});
});
