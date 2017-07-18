import UiOptions from './options.js'

export default Baseclass class {
	constructor( options = {} ) {
		this._options = new UiOptions(options, {
			testVar1: '',
			testVar2: null,
			testVar3: new Date()
		})
	}
}
