const mapping = [
	{ map: 'null',      types: [ null,      'null' ] },
	{ map: 'undefined', types: [ undefined, 'undefined' ] },
	{ map: 'string',    types: [ String,    'String' ] },
	{ map: 'number',    types: [ Number,    'Number' ] },
	{ map: 'boolean',   types: [ Boolean,   'Boolean' ] },
	{ map: 'function',  types: [ Function,  'Function' ] },
	{ map: 'array',     types: [ Array,     'Array' ]},
	{ map: RegExp,      types: [            'RegExp' ] },
];

class Type {
	/**
	 *  Resolve any predefined mapping for the given type input
	 *
	 *  @static
	 *  @param     {any}  type
	 *  @param     {any}  [begin=undefined]
	 *  @return    {any}  mapped
	 *  @memberof  Type
	 */
	static resolveMapping(type, begin) {
		return mapping.reduce((carry, item) => item.types.indexOf(type) >= 0 ? item.map : carry, begin);
	}

	/**
	 *  Get the function name
	 *
	 *  @static
	 *  @param     {Function}  value
	 *  @return    {String}    name
	 *  @memberof  Type
	 */
	static functionName(value) {
		const [ _, match ] = String(value).match(/^function\s([^\s\(]+)/) || [];

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
		let constructor = null;

		if (value === null) {
			constructor = 'null';
		}
		else if (value === undefined) {
			constructor = 'undefined';
		}
		else {
			constructor = String(value.constructor.name);
		}

		if (/function/i.test(constructor)) {
			return this.functionName(value);
		}

		return constructor;
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
	static getTypeName(value, real=true) {
		const type = Array.isArray(value) ? 'array' : typeof value;

		if (value === null) {
			return 'null';
		}

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
		const check = this.resolveMapping(type, 'object');

		return this.is(check, value) && (check !== 'object' || value instanceof type);
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
	static is(type, value) {
		if (this.getTypeName(type) === 'string') {
			const check = this.resolveMapping(type, type);

			return this.getTypeName(value, false) === check || this.getTypeName(value, true) === check;
		}

		return this.instanceOf(type, value);
	}
}

module.exports = Type;
