const TypeMap = require('./type-map');

class Type {
	/**
	 *  Get the function name
	 *
	 *  @static
	 *  @param     {Function}  value
	 *  @return    {String}    name
	 *  @memberof  Type
	 */
	static functionName(value) {
		const [ , match ] = String(value).match(/^function\s+([^\s(]+)/) || [];

		return match;
	}

	/**
	 *  Get the object name
	 *
	 *  @static
	 *  @param     {Object|*}  value
	 *  @return    {String}    name
	 *  @memberof  Type
	 */
	static objectName(value) {
		const check = TypeMap.resolve(value);

		if (check && /^null|undefined$/.test(check)) {
			return check;
		}

		const constructor = String(value.constructor.name);

		return /function/i.test(constructor) ? this.functionName(value) : constructor;
	}

	/**
	 *  Get the type name
	 *
	 *  @static
	 *  @param     {any}      value
	 *  @param     {Boolean}  [real=true]
	 *  @return    {String}   name
	 *  @memberof  Type
	 */
	static getTypeName(value, real = true) {
		const type = [ Array.isArray(value) ? 'array' : null, value === null ? 'null' : null ]
			.reduce((carry, name) => name || carry, typeof value);

		return /^(?:object|function)$/i.test(type) && real ? this.objectName(value) : type;
	}

	/**
	 *  Determine whether the value is an instance of a specific type
	 *
	 *  @static
	 *  @param     {any}     type
	 *  @param     {any}     value
	 *  @return    {String}  name
	 *  @memberof  Type
	 */
	static instanceOf(type, value) {
		const check = TypeMap.resolve(type, 'object');

		return this.is(check, value) &&
			(check !== 'object' || (this.is('string', type) ? this.is(type, value) : value instanceof type));
	}

	/**
	 *  Is the value of specific type
	 *
	 *  @static
	 *  @param     {any}      type
	 *  @param     {any}      value
	 *  @return    {Boolean}  is type
	 *  @memberof  Type
	 */
	//  eslint-disable-next-line id-length
	static is(type, value) {
		if (this.getTypeName(type) === 'string') {
			const check = TypeMap.resolve(type, type);

			return this.getTypeName(value, false) === check || this.getTypeName(value, true) === check;
		}

		return this.instanceOf(type, value);
	}
}

module.exports = Type;
