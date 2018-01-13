class TypeMap {
	/**
	 *  List of built-in castable types with both the string representation and
	 *  the actual type
	 *
	 *  @readonly
	 *  @static
	 *  @memberof  TypeMap
	 */
	static get TYPES() {
		return [
			{ map: 'null', types: [ null, 'null' ] },
			{ map: 'undefined', types: [ ((und) => und)(), 'undefined' ] },
			{ map: 'string', types: [ String, 'String' ] },
			{ map: 'number', types: [ Number, 'Number' ] },
			{ map: 'boolean', types: [ Boolean, 'Boolean' ] },
			{ map: 'function', types: [ Function, 'Function' ] },
			{ map: 'array', types: [ Array, 'Array' ] },
		];
	}
	/**
	 *  Resolve any predefined mapping for the given type input
	 *
	 *  @static
	 *  @param     {any}       type
	 *  @param     {any}       [begin=undefined]
	 *  @return    {String|*}  mapped
	 *  @memberof  TypeMap
	 */
	static resolve(type, begin) {
		return this.TYPES.reduce((carry, item) => {
			if (item.types.indexOf(type) >= 0) {
				return item.map;
			}

			return carry;
		}, begin);
	}
}

module.exports = TypeMap;
