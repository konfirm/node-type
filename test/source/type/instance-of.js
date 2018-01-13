/* global source, describe, it, expect */

const Type = source('type');

function foo() {
	//  intentionally left blank
}
function bar() {
	//  intentionally left blank
}


function ProtoFoo() {
	//  intentionally left blank
}
function ProtoBar() {
	ProtoFoo.call(this);
}
ProtoBar.prototype = new ProtoFoo();

class ClassFoo {}
class ClassBar extends ClassFoo {}

describe('Type.instanceOf', () => {
	it('identifies String', (next) => {
		expect(Type.instanceOf(String, 'foo')).to.equal(true);
		expect(Type.instanceOf('string', 'foo')).to.equal(false);
		expect(Type.instanceOf('String', 'foo')).to.equal(true);

		expect(Type.instanceOf(Number, 'foo')).to.equal(false);
		expect(Type.instanceOf('number', 'foo')).to.equal(false);
		expect(Type.instanceOf('Number', 'foo')).to.equal(false);

		expect(Type.instanceOf(Boolean, 'foo')).to.equal(false);
		expect(Type.instanceOf('boolean', 'foo')).to.equal(false);
		expect(Type.instanceOf('Boolean', 'foo')).to.equal(false);

		next();
	});

	it('identifies Number', (next) => {
		expect(Type.instanceOf(Number, 1)).to.equal(true);
		expect(Type.instanceOf(Number, Infinity)).to.equal(true);
		expect(Type.instanceOf('number', 1)).to.equal(false);
		expect(Type.instanceOf('number', Infinity)).to.equal(false);
		expect(Type.instanceOf('Number', 1)).to.equal(true);
		expect(Type.instanceOf('Number', Infinity)).to.equal(true);

		expect(Type.instanceOf(String, 1)).to.equal(false);
		expect(Type.instanceOf(String, Infinity)).to.equal(false);
		expect(Type.instanceOf('string', 1)).to.equal(false);
		expect(Type.instanceOf('string', Infinity)).to.equal(false);
		expect(Type.instanceOf('String', 1)).to.equal(false);
		expect(Type.instanceOf('String', Infinity)).to.equal(false);

		expect(Type.instanceOf(Boolean, 1)).to.equal(false);
		expect(Type.instanceOf(Boolean, Infinity)).to.equal(false);
		expect(Type.instanceOf('boolean', 1)).to.equal(false);
		expect(Type.instanceOf('boolean', Infinity)).to.equal(false);
		expect(Type.instanceOf('Boolean', 1)).to.equal(false);
		expect(Type.instanceOf('Boolean', Infinity)).to.equal(false);


		next();
	});

	it('identifies Boolean', (next) => {
		expect(Type.instanceOf(Boolean, true)).to.equal(true);
		expect(Type.instanceOf(Boolean, false)).to.equal(true);
		expect(Type.instanceOf('boolean', true)).to.equal(false);
		expect(Type.instanceOf('boolean', false)).to.equal(false);
		expect(Type.instanceOf('Boolean', true)).to.equal(true);
		expect(Type.instanceOf('Boolean', false)).to.equal(true);

		expect(Type.instanceOf(String, true)).to.equal(false);
		expect(Type.instanceOf(String, false)).to.equal(false);
		expect(Type.instanceOf('string', true)).to.equal(false);
		expect(Type.instanceOf('string', false)).to.equal(false);
		expect(Type.instanceOf('String', true)).to.equal(false);
		expect(Type.instanceOf('String', false)).to.equal(false);

		expect(Type.instanceOf(Number, true)).to.equal(false);
		expect(Type.instanceOf(Number, false)).to.equal(false);
		expect(Type.instanceOf('number', true)).to.equal(false);
		expect(Type.instanceOf('number', false)).to.equal(false);
		expect(Type.instanceOf('Number', true)).to.equal(false);
		expect(Type.instanceOf('Number', false)).to.equal(false);

		next();
	});

	it('identifies `null`', (next) => {
		expect(Type.instanceOf('null', null)).to.equal(true);
		expect(Type.instanceOf(null, null)).to.equal(true);

		next();
	});

	it('identifies `undefined`', (next) => {
		const undef = ((und) => und)();

		expect(Type.instanceOf('undefined', undef)).to.equal(true);
		expect(Type.instanceOf(undef, undef)).to.equal(true);

		next();
	});

	it('identifies custom functions', (next) => {
		expect(Type.instanceOf(Function, foo)).to.equal(true);
		expect(Type.instanceOf('function', foo)).to.equal(false);
		expect(Type.instanceOf('Function', foo)).to.equal(true);
		expect(Type.instanceOf(Function, bar)).to.equal(true);
		expect(Type.instanceOf('function', bar)).to.equal(false);
		expect(Type.instanceOf('Function', bar)).to.equal(true);

		next();
	});

	it('identifies custom objects', (next) => {
		expect(Type.instanceOf(ProtoFoo, new ProtoFoo())).to.equal(true);
		expect(Type.instanceOf(ProtoBar, new ProtoFoo())).to.equal(false);

		expect(Type.instanceOf(ProtoBar, new ProtoBar())).to.equal(true);
		expect(Type.instanceOf(ProtoFoo, new ProtoBar())).to.equal(true);

		expect(Type.instanceOf(ClassFoo, new ClassFoo())).to.equal(true);
		expect(Type.instanceOf(ClassBar, new ClassFoo())).to.equal(false);

		expect(Type.instanceOf(ClassBar, new ClassBar())).to.equal(true);
		expect(Type.instanceOf(ClassFoo, new ClassBar())).to.equal(true);

		next();
	});

	it('identifies Array', (next) => {
		expect(Type.instanceOf(Array, [])).to.equal(true);
		expect(Type.instanceOf(Array, [ 'foo' ])).to.equal(true);

		next();
	});

	it('identifies Object', (next) => {
		expect(Type.instanceOf({})).to.equal(false);
		expect(Type.instanceOf({ foo: 'bar' })).to.equal(false);

		next();
	});

	it('identifies RegExp', (next) => {
		expect(Type.instanceOf(RegExp, /^$/)).to.equal(true);
		expect(Type.instanceOf('RegExp', /^$/)).to.equal(true);
		expect(Type.instanceOf(RegExp, new RegExp('^$'))).to.equal(true);
		expect(Type.instanceOf('RegExp', new RegExp('^$'))).to.equal(true);

		expect(Type.instanceOf(RegExp, '/^$/')).to.equal(false);
		expect(Type.instanceOf('RegExp', '/^$/')).to.equal(false);

		next();
	});
});
