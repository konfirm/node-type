/* global source, describe, it, expect */

const Type = source('type');

function foo() {}
function bar() {}

describe('Type.objectName', () => {
	it('identifies String', (next) => {
		expect(Type.objectName(String)).to.equal('String');
		expect(Type.objectName('foo')).to.equal('String');
		expect(Type.objectName(String('foo'))).to.equal('String');

		next();
	});

	it('identifies Number', (next) => {
		expect(Type.objectName(Number)).to.equal('Number');
		expect(Type.objectName(1)).to.equal('Number');
		expect(Type.objectName(Math.PI)).to.equal('Number');
		expect(Type.objectName(Infinity)).to.equal('Number');
		expect(Type.objectName(Number('1'))).to.equal('Number');

		next();
	});

	it('identifies Boolean', (next) => {
		expect(Type.objectName(Boolean)).to.equal('Boolean');
		expect(Type.objectName(true)).to.equal('Boolean');
		expect(Type.objectName(false)).to.equal('Boolean');
		expect(Type.objectName(Boolean(1))).to.equal('Boolean');

		next();
	});

	it('identifies `null`', (next) => {
		expect(Type.objectName(null)).to.equal('null');

		next();
	});

	it('identifies `undefined`', (next) => {
		expect(Type.objectName(undefined)).to.equal('undefined');

		next();
	});

	it('identifies custom functions', (next) => {
		expect(Type.objectName(foo)).to.equal('foo');
		expect(Type.objectName(bar)).to.equal('bar');

		next();
	});

	it('identifies custom objects', (next) => {
		expect(Type.objectName(new foo())).to.equal('foo');
		expect(Type.objectName(new bar())).to.equal('bar');

		next();
	});

	it('identifies Array', (next) => {
		expect(Type.objectName([])).to.equal('Array');
		expect(Type.objectName([ 'foo' ])).to.equal('Array');

		next();
	});

	it('identifies Object', (next) => {
		expect(Type.objectName({})).to.equal('Object');
		expect(Type.objectName({ foo: 'bar' })).to.equal('Object');
		
		next();
	});
});
