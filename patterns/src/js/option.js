const
	WARN = 1,
	TYPES = {
		STR: 'string',
		FN: 'function',
		OBJ: 'object',
		NUM: 'number',
		BOOL: 'boolean',
		SYM: 'symbol',
		UNDEF: 'undefined'
	},
	DEFAULT_DELIMITER = ' '

Object.freeze(TYPES)

export default class UiOption {
	static makeDefaultDescriptor() {
		return {
			merge: false,
			type: TYPES.STR,
			dflt: ''
		}
	}
	
	constructor( descriptor = {} ) {
		this._validateDescriptor(descriptor)
		this._validateValue()
	}

	_validateDescriptor( descriptor ) {
		if( typeof descriptor !== TYPES.OBJ ) {
			throw new Error('Option descriptor not an object')
		}

		this._descriptor = Object.assign(makeDefaultDescriptor, descriptor)

		let { merge, delimiter, type, validator, values } = this._descriptor

		if( type !== void 0 ) {
			if( typeof type === TYPES.STR ) {
				if( !TYPES.values().includes(type) ) {
					throw new Error('String type specification must be valid against the typeof operator')
				}
			
			} else if( typeof type !== TYPES.FN ) {
				throw new Error('Type is not a string or function')
			}
		}

		if( merge !== void 0 && typeof merge !== TYPES.BOOL ) {
			throw new Error('Merge is not boolean')
		}

		if( merge ) {
			if( delimiter !== void 0 && typeof delimiter !== TYPES.STR ) {
				throw new Error('Delimiter is not a string')
			}

			if( delimiter === void 0 && type === TYPES.STR ) {
				this._descriptor.delimiter = DEFAULT_DELIMITER
			}

		} else if( delimiter !== void 0 ) {
			this._descriptor.delimiter = void 0
			WARN && console.warn('Delimiter ignored when not merging')
		}

		if( values !== void 0 ) {
			if( typeof values !== TYPES.OBJ && !Array.isArray(values) ) {
				throw new Error('Values must be specified as an array or object')
			}
		}

		if( validator !== void 0 ) {
			if( typeof validator !== TYPES.FN ) {
				throw new Error('Custom validator must be callable')
			}
		}
	}

	_validateValue() {
		let hasValue = Object.prototype.hasOwnProperty.call(this._descriptor, 'value'),
			hasDefault = Object.prototype.hasOwnProperty.call(this._descriptor, 'dflt'),
			{ type, dflt, validator, value, values } = this._descriptor

		if( hasValue ) {
			if( Object.keys(this._descriptor).length === 1 ) {
				return
			}
		
		} else if( hasDefault ) {
			this._descriptor.value = dflt
			return
			
		} else {
			throw new Error('Value or default value must be specified')
		}

		if( type !== void 0 ) {
			if( type === TYPES.STR ) {
				if( typeof value !== type ) {
					throw new Error('Value not of type: ' + type)
				}
			
			} else if( type === TYPES.FN ) {
				if( !(value instanceof type) ) {
					throw new Error('Value not an instance of: ' + type)
				}

			} else {
				WARN && console.warn('Option type checking skipped')
			}
		}

		if( values ) {
			if( Array.isArray(values) ) {
				if( !values.includes(value) ) {
					throw new Error('Value not found in acceptable values')
				}

			} else if( typeof values === TYPES.OBJ ) {
				if( !values.values().includes(value) ) {
					throw new Error('Value not found in acceptable values')
				}
				
			} else {
				WARN && console.warn('Values type checking skipped')
			}
		}

		if( validator && !validator(values) ) {
			throw new Error('Value failed custom validation')
		}
	}
}
