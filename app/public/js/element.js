import _ from './utility.js'

export default class UiElement { 

	constructor( options = {} ) {
		this._options = Object.assign({
			parent: null,
			tag: '',
			classes: ''
		}, options)

		let { parent, tag, classes } = this._options
		
		this.parent(parent)

		if( _.nStr(tag) ) {
			throw new Error('Tag not a string')
		}
		
		if( _.nStr(classes) ) {
			throw new Error('Classes not a string')
		}

		if( tag ) {
			this._el = _.el(tag)

			if( classes && this._el ) {
				_.cls(this._el, classes)
			}
	
		} else {
			this._el = null
		}
	}

	_preRender() {}
	_postRender() {}

	render() {
		if( this._parent && this._el ) {
			this._preRender()
			
			this._parent.append(this._el)

			this._postRender()
		}
	}

	detach() {
		if( this._parent && this._el ) {
			this._el.remove()
		}
	}

	el() {
		return this._el
	}

	parent( el, render_ = false ) {
		let render = render_ || this._parent && this._parent.contains(this._el)
		
		if( el === void 0 ) {
			return this._parent
		
		} else if( _.isElement(el) ) {
			this._parent = el
		
		} else if( el === null ) {
			if( this._parent ) {
				this._parent.removeChild(this._el)
				this._parent = null
			}

		} else {
			throw new Error('Parent must be an element')
		}

		if( render ) {
			this.render()
		}
	}

	position( x, y, unit = 'px' ) {
		if( x !== void 0 || y !== void 0 ) {
			if( _.nStr(unit) ) {
				throw new Error('Unit not a string')
			}
			
			if( x !== void 0 ) {
				this._el.style.left = x + unit
			}
			
			if( y !== void 0 ) {
				this._el.style.top = y + unit
			}
		
		} else {
			let rect = _.rect(this._el)
			return {
				x: rect.left,
				y: rect.top
			}
		}
	}

	width( w, unit = 'px' ) {
		if( w !== void 0 ) {
			if( _.nStr(unit) ) {
				throw new Error('Unit not a string')
			}
			
			this._el.style.width = w + unit
		
		} else {
			return _.rect(this._el).width
		}
	}
}

