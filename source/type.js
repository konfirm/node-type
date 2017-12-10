const mapping = [
	{ type: null, map: 'null' },
	{ type: 'null', map: 'null' },
	{ type: undefined, map: 'undefined' },
	{ type: 'undefined', map: 'undefined' },
	{ type: String, map: 'string' },
	{ type: 'String', map: 'string' },
	{ type: Number, map: 'number' },
	{ type: 'Number', map: 'number' },
	{ type: Boolean, map: 'boolean' },
	{ type: 'Boolean', map: 'boolean' },
	{ type: Function, map: 'function' },
	{ type: 'Function', map: 'function' },
	{ type: Array, map: 'array' },
	{ type: 'Array', map: 'array' },
	{ type: 'RegExp', map: RegExp },
];

class Type {
	/**
	 *  Get the function name
	 *  @param   {Function}  value
	 *  @return  {String}    name
	 */
	static functionName(value) {
		const match = String(value).match(/^function\s([^\s\(]+)/);

		return match ? match[1] : undefined;
	}

	/**
	 *  Get the object name
	 *  @param   {Object|*}  value
	 *  @return  {String}    name
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
	 *  @param   {*}        value
	 *  @param   {Boolean}  [real=true]
	 *  @return  {String}   name
	 */
	static getTypeName(value, real=true) {
		const type = value instanceof Array ? 'array' : typeof value;

		if (value === null) {
			return 'null';
		}

		return /^(?:object|function)$/i.test(type) && real ? this.objectName(value) : type;
	}

	/**
	 *  Determine whether the value is an instance of a specific type
	 *  @param   {*}       type
	 *  @param   {*}       value
	 *  @return  {String}  name
	 */
	static instanceOf(type, value) {
		const check = mapping.reduce((carry, it) => it.type === type ? it.map : carry, 'object');

		return this.is(check, value) && (check !== 'object' || value instanceof type);
	}

	/**
	 *  Is the value of specific type
	 *  @param   {*}        type
	 *  @param   {*}        value
	 *  @return  {Boolean}  is type
	 */
	static is(type, value) {
		if (this.getTypeName(type) === 'string') {
			type = mapping.reduce((carry, it) => it.type === type ? it.map : carry, type);

			return this.getTypeName(value, false) === type || this.getTypeName(value, true) === type;
		}

		return this.instanceOf(type, value);
	}
}

module.exports = Type;
