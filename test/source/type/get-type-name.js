/* global source, describe, it, expect */

const Type = source('type');

function foo() {
	//  intentionally left blank
}
function bar() {
	//  intentionally left blank
}
function Foo() {
	//  intentionally left blank
}
function Bar() {
	//  intentionally left blank
}

describe('Type.getTypeName', () => {
	it('identifies String', (next) => {
		//  Built-in type is a function (leading to uppercase name)
		expect(Type.getTypeName(String, false)).to.equal('function');
		expect(Type.getTypeName(String, true)).to.equal('String');

		//  lowercase
		expect(Type.getTypeName('foo', false)).to.equal('string');
		expect(Type.getTypeName('foo', true)).to.equal('string');
		expect(Type.getTypeName(String('foo'), false)).to.equal('string');
		expect(Type.getTypeName(String('foo'), true)).to.equal('string');

		next();
	});

	it('identifies Number', (next) => {
		//  Built-in type is a function (leading to uppercase name)
		expect(Type.getTypeName(Number, false)).to.equal('function');
		expect(Type.getTypeName(Number, true)).to.equal('Number');

		//  lowercase
		expect(Type.getTypeName(1, true)).to.equal('number');
		expect(Type.getTypeName(1, false)).to.equal('number');
		expect(Type.getTypeName(Math.PI, true)).to.equal('number');
		expect(Type.getTypeName(Math.PI, false)).to.equal('number');
		expect(Type.getTypeName(Infinity, true)).to.equal('number');
		expect(Type.getTypeName(Infinity, false)).to.equal('number');
		expect(Type.getTypeName(Number('1'), true)).to.equal('number');
		expect(Type.getTypeName(Number('1'), false)).to.equal('number');

		next();
	});

	it('identifies Boolean', (next) => {
		//  Built-in type is a function (leading to uppercase name)
		expect(Type.getTypeName(Boolean, false)).to.equal('function');
		expect(Type.getTypeName(Boolean, true)).to.equal('Boolean');

		//  lowercase
		expect(Type.getTypeName(true, true)).to.equal('boolean');
		expect(Type.getTypeName(false, true)).to.equal('boolean');
		expect(Type.getTypeName(Boolean(1), true)).to.equal('boolean');

		next();
	});

	it('identifies `null`', (next) => {
		expect(Type.getTypeName(null, true)).to.equal('null');
		expect(Type.getTypeName(null, false)).to.equal('null');

		next();
	});

	it('identifies `undefined`', (next) => {
		const undef = ((und) => und)();

		expect(Type.getTypeName(undef, true)).to.equal('undefined');
		expect(Type.getTypeName(undef, false)).to.equal('undefined');

		next();
	});

	it('identifies custom functions', (next) => {
		expect(Type.getTypeName(foo, false)).to.equal('function');
		expect(Type.getTypeName(foo, true)).to.equal('foo');

		expect(Type.getTypeName(bar, false)).to.equal('function');
		expect(Type.getTypeName(bar, true)).to.equal('bar');

		next();
	});

	it('identifies custom objects', (next) => {
		expect(Type.getTypeName(new Foo(), false)).to.equal('object');
		expect(Type.getTypeName(new Foo(), true)).to.equal('Foo');

		expect(Type.getTypeName(new Bar(), false)).to.equal('object');
		expect(Type.getTypeName(new Bar(), true)).to.equal('Bar');

		next();
	});

	it('identifies Array', (next) => {
		expect(Type.getTypeName([], true)).to.equal('array');
		expect(Type.getTypeName([ 'foo' ], true)).to.equal('array');

		next();
	});

	it('identifies Object', (next) => {
		expect(Type.getTypeName({}, true)).to.equal('Object');
		expect(Type.getTypeName({ foo: 'bar' }, true)).to.equal('Object');

		next();
	});
});
