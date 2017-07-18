import T from './TOPICS.js'
import CURSOR from './CURSOR.js'

import mix from './mixin.js'
import PubSubMixin from './pubsub.js'

import _ from './utility.js'
import UiElement from './element.js'
import Core from './core.js'

const
	LOG = 0,
	INFO = 0,
	WARN = 0,
	MIN_SET_SIZE = 0,
	RESIZE_HANDLE_POSITION_LEFT = 'left',
	RESIZE_HANDLE_POSITION_RIGHT = 'right',
	RESIZE_HANDLE_POSITION_VALUES = [
		RESIZE_HANDLE_POSITION_LEFT,
		RESIZE_HANDLE_POSITION_RIGHT 
	],
	SET_CLASS = 'set',
	SET_RESIZE_HANDLE_CLASS = 'set-handle-resize-set',
	RESIZE_HANDLE_CLASS = 'set-handle-resize',
	RESIZE_HANDLE_LEFT_CLASS = 'set-handle-resize-left',
	RESIZE_HANDLE_RIGHT_CLASS = 'set-handle-resize-right',
	RESIZE_HANDLE_LEFT_SET_CLASS = 'set-handle-resize-left-set',
	RESIZE_HANDLE_RIGHT_SET_CLASS = 'set-handle-resize-right-set',
	TOPICS = Object.freeze({
		RESIZE_MOUSE_DOWN_BEFORE: '/event/resize/mousedown/before',
		RESIZE_MOUSE_DOWN_AFTER: '/event/resize/mousedown/after',
		RESIZE_MOUSE_UP_BEFORE: '/event/resize/mouseup/before',
		RESIZE_MOUSE_UP_AFTER: '/event/resize/mouseup/after',
		RESIZE_MOUSE_DBL_CLICK_BEFORE: '/event/resize/dblclick/before',
		RESIZE_MOUSE_DBL_CLICK_AFTER: '/event/resize/dblclick/after',
		RESIZE_MOUSE_MOVE_MAX_LEFT: '/event/resize/mousemove/maxleft',
		RESIZE_MOUSE_MOVE_MAX_RIGHT: '/event/resize/mousemove/maxright',
		RESIZE_MOUSE_MOVE_LEFT: '/event/resize/mousemove/left',
		RESIZE_MOUSE_MOVE_RIGHT: '/event/resize/mousemove/right'
	})

export { TOPICS }

export default class UiSet extends mix(UiElement).with(PubSubMixin) { 

	static makeDefaultResizeHandle() {
		return {
			position: RESIZE_HANDLE_POSITION_LEFT,
			classes: RESIZE_HANDLE_CLASS 
		}
	}
	
	constructor( options = {} ) {
		super(Object.assign({
			tag: 'div',
			classes: SET_CLASS,
			items: [],
			resizeHandle: UiSet.makeDefaultResizeHandle(),
			anchorMinWidth: true
		}, options))

		this._initTopics()

		this._set = new Set()

		this._initElements()
		this._initCallbacks()
		this._initEvents()

		let { items } = this._options
		
		this._anchor = {
			isAnchored: false,
			anchorMinWidth: !!this._options.anchorMinWidth
		}

		for( let item of items ) {
			this.addItem(item)
		}

		this.render()
	}

	_initElements() {
		let resizeHandlePositionClass,
			{ resizeHandle } = this._options

		if( resizeHandle ) {
			resizeHandle = Object.assign(UiSet.makeDefaultResizeHandle(), resizeHandle)

			if( resizeHandle.position && !RESIZE_HANDLE_POSITION_VALUES.includes(resizeHandle.position) ) {
				throw new Error('Not a valid resize handle position')
			}

			if( resizeHandle.position === RESIZE_HANDLE_POSITION_LEFT ) {
				resizeHandlePositionClass = RESIZE_HANDLE_LEFT_CLASS
				_.addCss(this._el, RESIZE_HANDLE_LEFT_SET_CLASS)
				this._isLeftResizeHandle = true

			} else {
				resizeHandlePositionClass = RESIZE_HANDLE_RIGHT_CLASS
				_.addCss(this._el, RESIZE_HANDLE_RIGHT_SET_CLASS)
				this._isRightResizeHandle = true
			}

			_.addCss(this._el, SET_RESIZE_HANDLE_CLASS) 

			this._resizeHandle = _(_('div').cls(resizeHandle.classes + ' ' + resizeHandlePositionClass))
			this._el.append(this._resizeHandle)
		}
	}

	_initEvents() {
		if( this._resizeHandle ) {
			this._resizeHandle.addEventListener('mousedown', this._onMouseDownFn)
			this._resizeHandle.addEventListener('dblclick', this._onMouseDblClickResizeFn)
		}
	}

	_initCallbacks() {
		if( this._resizeHandle ) {
			this._onMouseDownFn = this._onMouseDown.bind(this)
			this._onMouseUpFn = this._onMouseUp.bind(this)
			this._onMouseMoveFn = null
			this._onMouseDblClickResizeFn = this._onMouseDblClickResizeSet.bind(this)
		}
	}

	_onMouseDblClickResizeSet( e ) {
		INFO && console.info('Set: mouse double-click resize set')
		// ignore if not main button
		if( e.button ) {
			return
		}

		let w1

		this.publish(TOPICS.RESIZE_MOUSE_DBL_CLICK_BEFORE, {
			event: e,
			set: this
		})

		w1 = this.minWidth()
		
		this.publish(TOPICS.RESIZE_MOUSE_DBL_CLICK_AFTER, {
			event: e,
			set: this
		})
	}

	/* todo:
		1) fix alignment when moving off the browser window
		2) add right handle drag
	*/
	_onMouseMoveResizeSet( rData, topic, data ) {
		INFO && console.info('Set: mouse move resize set, maxLeft: ' + rData.maxLeft
			+ ' maxRight: ' + rData.maxRight + ' dx: ' + data.dx)
		
		let rect1,
			rect2,
			left,
			leftDiff,
			width,
			widthDiff,
			remainder,
			pubDx,
			minWidth = 0,
			dx = data.dx

		if( this._isLeftResizeHandle ) {
			if( dx < 0 ) {
				// accumulate left movement beyond stationary handle
				if( typeof rData.maxLeft === 'number' && rData.maxLeft < 0 ) {
					rData.maxLeft += dx

					this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_LEFT, {
						maxLeft: rData.maxLeft,
						dx: dx,
						set: this
					})

					return
				
				} else if( typeof rData.maxRight === 'number' && rData.maxRight > 0 ) {
					remainder = rData.maxRight + dx
					
					// process overflow of movement
					if( remainder < 0 ) {
						this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_RIGHT, {
							maxRight: 0,
							dx: -1*rData.maxRight,
							set: this
						})
						dx = remainder 
						rData.maxRight = 0
					
					} else {
						rData.maxRight += dx

						this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_RIGHT, {
							maxRight: rData.maxRight,
							dx: dx,
							set: this
						})

						return
					}
				}

				rect1 = _.rect(this._el)
				this.width(rect1.width - dx)
				rect2 = _.rect(this._el)

				leftDiff = rect1.left - rect2.left
				remainder = dx + leftDiff
				
				if( remainder < 0 ) {
					this.publish(TOPICS.RESIZE_MOUSE_MOVE_LEFT, {
						dx: dx - remainder,
						set: this
					})

					rData.maxLeft = remainder
					this.width(rect2.width + remainder)
					
					this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_LEFT, {
						maxLeft: rData.maxLeft,
						dx: rData.maxLeft,
						set: this
					})

				} else {
					this.publish(TOPICS.RESIZE_MOUSE_MOVE_LEFT, {
						dx: dx,
						set: this
					})
				}
			
			} else if( dx > 0 ) {
				if( typeof rData.maxLeft === 'number' && rData.maxLeft < 0 ) {
					remainder = rData.maxLeft + dx

					// process overflow of movement
					if( remainder > 0 ) {
						this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_LEFT, {
							maxLeft: 0,
							dx: -1*rData.maxLeft,
							set: this
						})
						
						dx = remainder
						rData.maxLeft = 0
					
					} else {
						rData.maxLeft += dx

						this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_LEFT, {
							maxLeft: rData.maxLeft,
							dx: dx,
							set: this
						})

						return
					}
				
				} else if( typeof rData.maxRight === 'number' && rData.maxRight > 0 ) {
					rData.maxRight += dx
					
					this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_RIGHT, {
						maxRight: rData.maxRight,
						dx: dx,
						set: this
					})

					return
				}

				rect1 = _.rect(this._el)
				
				// fully close when moving right passed right limit
				remainder = dx - (rect1.width - minWidth)
				if( remainder > 0 ) {
					rData.maxRight = remainder
					width = minWidth
					pubDx = dx - remainder
				
				} else {
					width = rect1.width - dx
					pubDx = dx
				}

				this.width(width)
					
				// properly align with handle when moving left passed right limit
				rect2 = _.rect(this._el)
				
				widthDiff = rect1.width - rect2.width
				remainder = dx - widthDiff

				if( remainder > 0 ) {
					rData.maxRight = remainder
					pubDx = dx - remainder
				}

				this.publish(TOPICS.RESIZE_MOUSE_MOVE_RIGHT, {
					dx: pubDx,
					set: this
				})

				if( rData.maxRight ) {
					this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_RIGHT, {
						maxRight: rData.maxRight,
						dx: rData.maxRight,
						set: this
					})
				}
			}
		}
	}

	_onMouseDown( e ) {
		INFO && console.info('Set: mouse down resize set')	
		// ignore if not main button
		if( e.button ) {
			return
		}
		
		this.publish(TOPICS.RESIZE_MOUSE_DOWN_BEFORE, {
			event: e,
			set: this
		})

		e.preventDefault()
		e.stopPropagation()

		this._cursor(CURSOR.RESIZE_WIDTH)

		this._onMouseMoveFn = this._onMouseMoveResizeSet.bind(this, {
			event: e,
			offsetX: e.offsetX,
			offsetY: e.offsetY
		})
		
		Core.subscribe(T.MOUSE_MOVE, this._onMouseMoveFn)
		Core.subscribe(T.MOUSE_UP, this._onMouseUpFn)
	}
	
	_onMouseUp( topic, data ) {
		INFO && console.info('Set: mouse up resize set')
		// ignore if not main button
		if( data.event.button ) {
			return
		}

		data.event.stopPropagation()

		this._cursor(CURSOR.DEFAULT)

		Core.unsubscribe(T.MOUSE_UP, this._onMouseUpFn)
		Core.unsubscribe(T.MOUSE_MOVE, this._onMouseMoveFn)

		this.publish(TOPICS.RESIZE_MOUSE_UP_AFTER, {
			event: data.event,
			set: this
		})
	}

	_cursor( cursor ) {
		document.body.style.cursor = cursor
	}

	isAnchored() {
		return this._anchor.isAnchored
	}

	anchor( a = true ) {
		this._anchor.isAnchored = !!a
	}

	width( w, unit = 'px', flex = 'none' ) {
		let ret
		
		if( w !== void 0 && unit === '%' && this.isAnchored() ) {
			WARN && console.warn('Percentage width request on anchored set ignored')
			return
		}
		
		ret = super.width(w, unit)

		if( ret !== void 0 ) {
			return ret
		}

		this._el.style.flex = flex
	}

	diffWidth( w ) {
		let w2,
			w1,
			w0 = this.width()
		
		// no width request = minimum possible width
		if( w === void 0 ) {
			w2 = 0
				
		} else {
			w2 = w0 + w
		}

		// don't allow negative widths
		if( w2 < 0 ) {
			w2 = 0
		}

		this.width(w2)

		w1 = this.width()

		// keep style width and actual width =
		if( w1 !== w2 ) {
			this.width(w1)
		}

		return w1 - w0
	}

	minWidth() {
		let w = this.calcContentWidth()
		this.width(w)

		if( !this.isAnchored() ) {
			this.anchor()
		}

		return w
	}

	calcContentWidth() {
		let last = this._el.lastElementChild,
			left = _.rect(this._el).left,
			right = _.rect(last).right,
			rightMargin = parseInt(_.style(last).marginRight)

		return right + rightMargin - left
	}

	flexWidth() {
		if( this.isAnchored() ) {
			WARN && console.warn('Width request on anchored set ignored')
			return
		}
		
		this._el.style.width = 'unset'
		this._el.style.flex = 'inherit'
	}

	flexScaleWidth() {
		if( this.isAnchored() ) {
			WARN && console.warn('Width request on anchored set ignored')
			return
		}
		
		this._el.style.flex = '1 1 auto'
	}

	addItem( item ) {
		if( !this._set.has(item) ) {
			this._set.add(item)
			item.parent(this._el)
		
		} else {
			WARN && console.warn('Item already in set')
		}
	}

	removeItem( item ) {
		if( this._set.has(item) ) {
			this._set.remove(item)
			item.parent(null)
		
		} else {
			WARN && console.warn('Item not in set')
		}
	}

	render() {
		super.render()
		
		for( let item of this._set ) {
			item.render()
		}
	}
}
