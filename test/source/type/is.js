/* global source, describe, it, expect */

const Type = source('type');

function foo() {}
function bar() {}

describe('Type.is', () => {
	it('identifies String', (next) => {
		expect(Type.is(String, 'foo')).to.equal(true);
		expect(Type.is('string', 'foo')).to.equal(true);
		expect(Type.is('String', 'foo')).to.equal(true);

		expect(Type.is(Number, 'foo')).to.equal(false);
		expect(Type.is('number', 'foo')).to.equal(false);
		expect(Type.is('Number', 'foo')).to.equal(false);

		expect(Type.is(Boolean, 'foo')).to.equal(false);
		expect(Type.is('boolean', 'foo')).to.equal(false);
		expect(Type.is('Boolean', 'foo')).to.equal(false);

		next();
	});

	it('identifies Number', (next) => {
		expect(Type.is(Number, 1)).to.equal(true);
		expect(Type.is(Number, Infinity)).to.equal(true);
		expect(Type.is('number', 1)).to.equal(true);
		expect(Type.is('number', Infinity)).to.equal(true);
		expect(Type.is('Number', 1)).to.equal(true);
		expect(Type.is('Number', Infinity)).to.equal(true);

		expect(Type.is(String, 1)).to.equal(false);
		expect(Type.is(String, Infinity)).to.equal(false);
		expect(Type.is('string', 1)).to.equal(false);
		expect(Type.is('string', Infinity)).to.equal(false);
		expect(Type.is('String', 1)).to.equal(false);
		expect(Type.is('String', Infinity)).to.equal(false);

		expect(Type.is(Boolean, 1)).to.equal(false);
		expect(Type.is(Boolean, Infinity)).to.equal(false);
		expect(Type.is('boolean', 1)).to.equal(false);
		expect(Type.is('boolean', Infinity)).to.equal(false);
		expect(Type.is('Boolean', 1)).to.equal(false);
		expect(Type.is('Boolean', Infinity)).to.equal(false);


		next();
	});

	it('identifies Boolean', (next) => {
		expect(Type.is(Boolean, true)).to.equal(true);
		expect(Type.is(Boolean, false)).to.equal(true);
		expect(Type.is('boolean', true)).to.equal(true);
		expect(Type.is('boolean', false)).to.equal(true);
		expect(Type.is('Boolean', true)).to.equal(true);
		expect(Type.is('Boolean', false)).to.equal(true);

		expect(Type.is(String, true)).to.equal(false);
		expect(Type.is(String, false)).to.equal(false);
		expect(Type.is('string', true)).to.equal(false);
		expect(Type.is('string', false)).to.equal(false);
		expect(Type.is('String', true)).to.equal(false);
		expect(Type.is('String', false)).to.equal(false);

		expect(Type.is(Number, true)).to.equal(false);
		expect(Type.is(Number, false)).to.equal(false);
		expect(Type.is('number', true)).to.equal(false);
		expect(Type.is('number', false)).to.equal(false);
		expect(Type.is('Number', true)).to.equal(false);
		expect(Type.is('Number', false)).to.equal(false);

		next();
	});

	it('identifies `null`', (next) => {
		expect(Type.is('null', null)).to.equal(true);
		expect(Type.is(null, null)).to.equal(true);

		next();
	});

	it('identifies `undefined`', (next) => {
		expect(Type.is('undefined', undefined)).to.equal(true);
		expect(Type.is(undefined, undefined)).to.equal(true);

		next();
	});

	it('identifies custom functions', (next) => {
		expect(Type.is(Function, foo)).to.equal(true);
		expect(Type.is('function', foo)).to.equal(true);
		expect(Type.is('Function', foo)).to.equal(true);
		expect(Type.is(Function, bar)).to.equal(true);
		expect(Type.is('function', bar)).to.equal(true);
		expect(Type.is('Function', bar)).to.equal(true);

		next();
	});

	it('identifies custom objects', (next) => {
		expect(Type.is(foo, new foo())).to.equal(true);
		expect(Type.is(bar, new foo())).to.equal(false);
		expect(Type.is('object', new foo())).to.equal(true);
		
		expect(Type.is(bar, new bar())).to.equal(true);
		expect(Type.is(foo, new bar())).to.equal(false);
		expect(Type.is('object', new bar())).to.equal(true);
		
		next();
	});

	it('identifies Array', (next) => {
		expect(Type.is(Array, [])).to.equal(true);
		expect(Type.is('array', [])).to.equal(true);
		expect(Type.is('Array', [])).to.equal(true);
		expect(Type.is(Array, [ 'foo' ])).to.equal(true);
		expect(Type.is('array', [ 'foo' ])).to.equal(true);
		expect(Type.is('Array', [ 'foo' ])).to.equal(true);

		next();
	});

	it('identifies Object', (next) => {
		expect(Type.is(Object, {})).to.equal(true);
		expect(Type.is('object', {})).to.equal(true);
		expect(Type.is('Object', {})).to.equal(true);
		expect(Type.is(Object, { foo: 'bar' })).to.equal(true);
		expect(Type.is('object', { foo: 'bar' })).to.equal(true);
		expect(Type.is('Object', { foo: 'bar' })).to.equal(true);
		
		next();
	});
});
