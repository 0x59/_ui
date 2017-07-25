import _ from './utility.js'
import UiOptions from './options.js'
import UiElement from './element.js'

export default class UiIcon extends UiElement { 

	constructor( options = {} ) {
		super(new UiOptions(options, {
			tag: 'div',
			classes: 'icon icon-svg'
		}))

		this.render()
	}
}
