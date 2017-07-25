import T from './TOPICS.js'
import _ from './utility.js'
import UiElement from './element.js'
import UiOptions from './options.js'
import Core from './core.js'

const RESIZE_THROTTLE = 60 //ms

export default class UiScreen extends UiElement { 

	constructor( options = {} ) {
		super(new UiOptions(options, {
			tag: 'div',
			classes: 'screen'
		}))

		this._resizeTimeout = null

		this._initEvents()
		this.render()
	}

	_postRender() {
		Core.publish(T.SCREEN_SIZE, {
			width: this._el.offsetWidth,
			height: this._el.offsetHeight
		})
	}

	_initEvents() {
		window.addEventListener('resize', this._resizeThrottler.bind(this))
		
		document.addEventListener('mouseup', this._onMouseUp.bind(this))
		document.addEventListener('mousemove', this._onMouseMove.bind(this))
	}

	_resizeThrottler() {
		if( !this._resizeTimeout ) {
			this._resizeTimeout = setTimeout(this._onResize.bind(this), RESIZE_THROTTLE)
		}
	}
	
	_onResize() {
		this._resizeTimeout = null

		Core.publish(T.SCREEN_SIZE, {
			width: this._el.offsetWidth,
			height: this._el.offsetHeight
		})
	}

	_onMouseUp(e) {
		Core.publish(T.MOUSE_UP, {
			event: e,
			x: e.x,
			y: e.y
		})
	}

	_onMouseMove(e) {
		Core.publish(T.MOUSE_MOVE, {
			event: e,
			x: e.x,
			y: e.y,
			dx: e.movementX,
			dy: e.movementY
		})
	}
}

