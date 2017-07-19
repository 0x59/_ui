import _ from './utility.js'
import UiOption from './option.js'

export default class UiOptions {
	constructor( options = {}, defOptions = {}, descriptors = {}, base = false ) {		
		let $

		if( typeof defOptions !== TYPES.OBJ ) {
			throw new Error('Defined options not an object')
		}
		
		if( typeof descriptors !== TYPES.OBJ ) {
			throw new Error('Descriptors not an object')
		}
		
		if( options instanceof UiOptions ) {
			$ = options

			$.$addDescriptors(descriptors)

		} else if( typeof options === TYPES.OBJ ) {
			$ = this

			$._options = new Map()
			$._pending = {}
			
			$.$addDescriptors(descriptors)
			$.$addOptions(options)

		} else {
			throw new Error('Passed options not a UiOptions instance or object')
		}

		$.$addOptions(defOptions)

		if( !!base ) {
			$.$addBareOptions()
		}

		return $
	}

	$addDescriptors( descriptors ) {
		let option

		for( const [name, des] of Object.entries(descriptors) ) {
			if( this._options.has(name) ) {
				throw new Error('Duplicate option descriptor encountered')
			}
			this._options.set(name, new UiOption(des))

			Object.defineProperty(this, name, {
				get: () => this._options.get(name).value()
			})
		}

		this.$checkPendingOptions()
	}

	$addOptions( options ) {
		let option

		for( const [name, option] of Object.entries(options) ) {
			if( this._options.has(name) ) {
				this._options.get(name).value(option)

			} else {
				if( !this._pending[name] ) {
					this._pending[name] = []
				}
				this._pending[name].push(option)
			}
		}
	}

	// todo: merge
	$addBareOptions() {
		for( const [name, optionList] of Object.entries(this._pending) ) {
			WARN && console.warn('No descriptor defined for class option [%s]', name)
			
			Object.defineProperty(this, name, {
				get: () => this._pending[name][0]
			})
		}
	}
	
	// todo: merge
	$checkPendingOptions() {
		for( const [name, optionList] of Object.entries(this._pending) ) {
			if( this._options.has(name) ) {
				this._options.get(name).value(optionList[0])
				this._pending[name] = void 0
			}
		}
	}
}
