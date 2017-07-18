import _ from './utility.js'
import UiElement from './element.js'
import Core from './core.js'

export default class extends UiElement { 

	constructor( options = {} ) {
		super(Object.assign({
			tag: 'div',
			classes: 'icon',
			imageTypeClass: 'icon-svg',
			imageClass: ''
		}, options))

		let { imageTypeClass, imageClass } = this._options
		
		if( _.nStr(imageTypeClass) ) {
			throw new Error('image type class not a string')
		}
		
		if( _.nStr(imageClass) ) {
			throw new Error('image class not a string')
		}
		
		_.addCss(this._el, imageTypeClass, imageClass)
		
		this.render()
	}

}
