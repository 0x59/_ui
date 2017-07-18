import T from './TOPICS.js'
import { TOPICS as T_SET } from './set.js'
import CURSOR from './CURSOR.js'

import _ from './utility.js'
import UiElement from './element.js'
import UiSet from './set.js'
import Core from './core.js'

const
	INFO = 0,
	WARN = 0,
	SNAP_THRESHOLD = 15,
	DEFAULT_WIDTH = 400,
	MIN_FLEX_WIDTH = 2

export default class UiToolbar extends UiElement { 

	constructor( options = {} ) {
		super(Object.assign({
			tag: 'div',
			classes: 'toolbar',
			sets: []
		}, options))

		this._sets = []
		this._anchors = null
		this._flex = null
		this._undockedWidth = DEFAULT_WIDTH
		this._screenSize = {
			width: 0,
			height: 0
		}

		let { sets } = this._options

		this._initCallbacks()
		this._initSubscriptions()
		this._initElements()
		
		sets.length && this.addSets(sets)
		
		this._initEvents()

		this.render()
	}

	_initElements() {
		this._leftHandle = _(_('div').cls('handle left-handle'))
		this._rightHandle = _(_('div').cls('handle right-handle'))
		this._flex = _(_('div').cls('toolbar-flex'))

		this._el.append(this._leftHandle, this._flex, this._rightHandle)

		this._dock(0, 0)
	}
	
	_initCallbacks() {
		// shared data for resize set before/after
		let upDownResizeSetData = {},
			dblClickResizeSetData = {}

		this._onMouseDownFn = this._onMouseDown.bind(this)
		this._onDblClickFn = this._onDblClick.bind(this)
		this._onMouseUpFn = this._onMouseUp.bind(this)
		this._onMouseMoveFn = null
		this._onScreenResizeFn = this._onScreenResize.bind(this)

		this._onMouseDownResizeSetBeforeFn =
			this._onMouseDownResizeSetBefore.bind(this, upDownResizeSetData)
		this._onMouseUpResizeSetAfterFn =
			this._onMouseUpResizeSetAfter.bind(this, upDownResizeSetData)
		this._onMouseDblClickResizeSetBeforeFn =
			this._onMouseDblClickResizeSetBefore.bind(this, dblClickResizeSetData)
		this._onMouseDblClickResizeSetAfterFn =
			this._onMouseDblClickResizeSetAfter.bind(this, dblClickResizeSetData)

		this._onMouseMoveResizeSetFn = this._onMouseMoveResizeSet.bind(this) // left and right
		this._onMouseMoveResizeSetMaxFn = null // left and right
	}

	_initSubscriptions() {
		Core.subscribe(T.SCREEN_SIZE, this._onScreenResizeFn, true)
	}

	_initEvents() {
		this._el.addEventListener('mousedown', this._onMouseDownFn)
		this._leftHandle.addEventListener('dblclick', this._onDblClickFn)
		this._rightHandle.addEventListener('dblclick', this._onDblClickFn)
	}

	// rData = reentry data with initial mousedown toolbar offset
	_onMouseMoveDragToolbar( rData, topic, data ) {
		INFO && console.info('Toolbar: mouse move drag')
		const T = SNAP_THRESHOLD,
			  B = this._screenSize.height - SNAP_THRESHOLD

			// mousemove from top left of document
		let	mouseX = data.x,
			mouseY = data.y,
			// mousedown from top left of toolbar element
			mouseDownX = rData.offsetX,
			mouseDownY = rData.offsetY,

			screenHeight = this._screenSize.height,

			toolbarHeight = this._el.offsetHeight,
			toolbarWidth = this._el.offsetWidth,

			// next toolbar location based on this event, unless adjusted below
			toolbarLeft = mouseX - mouseDownX,
			toolbarTop = mouseY - mouseDownY,
			toolbarBottom = toolbarTop + toolbarHeight

		if( this._isDocked ) {
			if( toolbarTop > T && toolbarBottom < B ) {
				// keep length of bar on either side of mouse proportional when undocking (initial)
				rData.dockedOffsetX = rData.offsetX
				rData.offsetX = Math.round(mouseDownX/toolbarWidth * this._undockedWidth)

				toolbarLeft = mouseX - rData.offsetX

				this._undock(toolbarLeft, toolbarTop)
			}

		} else if( toolbarTop <= T || toolbarBottom >= B ) {
			// assume first condition
			let y = 0
			
			if( toolbarBottom >= B ) {
				y = screenHeight - toolbarHeight
			}
			
			this._dock(0, y)

			// after undocking, maintain proportionality when continuously docking/undocking
			if( rData.dockedOffsetX ) {
				rData.offsetX = rData.dockedOffsetX
			// keep length of bar on either side of mouse proportional when docking (initial)
			} else {
				rData.offsetX = Math.round(mouseDownX/toolbarWidth * this._screenSize.width)
			}

		} else {
			this.position(toolbarLeft, toolbarTop)
		}
	}

	_onMouseMoveResizeToolbar( rData, topic, data ) {
		INFO && console.info('Toolbar: mouse move resize toolbar')
		let dx = 0,
			rightHandleLeft = this._rightHandle.offsetLeft,
			toolbarLeft = this._el.offsetLeft,
			toolbarWidth = this._el.offsetWidth,
			flexWidth = this._flex.offsetWidth

		this._flexSetWidth()
		if( rData.event.target === this._leftHandle ) {
			// limit right movement to minimum size
			if( data.dx > 0 && flexWidth > MIN_FLEX_WIDTH ) {
				if( flexWidth - data.dx < MIN_FLEX_WIDTH ) {
					dx = flexWidth - MIN_FLEX_WIDTH
				
				} else {
					dx = data.dx
				}

			// limit left movement to cursor being left of or aligned with mousedown of handle
			} else if( data.dx < 0 && toolbarLeft + rData.offsetX >= data.x ) {
				dx = data.dx
			}
			
			if( dx !== 0 ) {
				this.position(toolbarLeft + dx)
				this.width(toolbarWidth - dx)
			}

		} else if( rData.event.target === this._rightHandle ) {
			// limit left movement to minimum size
			if( data.dx < 0 && flexWidth > MIN_FLEX_WIDTH ) {
				if( flexWidth + data.dx < MIN_FLEX_WIDTH ) {
					dx = MIN_FLEX_WIDTH - flexWidth

				} else {
					dx = data.dx
				}

			// limit right movement to cursor being right of or aligned with mousedown of handle
			} else if( data.dx > 0 && toolbarLeft + rightHandleLeft + rData.offsetX <= data.x ) {
				dx = data.dx
			}
			
			if( dx !== 0 ) {
				this.width(toolbarWidth + dx)
			}
		}
	}

	_onMouseUp( topic, data ) {
		INFO && console.info('Toolbar: mouse up')
		// ignore if not main button
		if( data.event.button ) {
			return
		}

		this._cursor(CURSOR.DEFAULT)

		this._pixelSetWidth()

		Core.unsubscribe(T.MOUSE_UP, this._onMouseUpFn)
		Core.unsubscribe(T.MOUSE_MOVE, this._onMouseMoveFn)
	}

	_onDblClick( e ) {
		INFO && console.info('Toolbar: mouse double-click')
		// ignore if not main button
		if( e.button ) {
			return
		}

		let minWidth,
			dx,
			rect = _.rect(this._el),
			left = rect.left,
			width = rect.width,
			overflow = 0

		if( e.target === this._leftHandle ) {
			minWidth = this.minWidth()
			dx = width - minWidth

			left = left + dx
			
			if( left < 0 ) {
				overflow = left
				left = 0
			}
								
			this.position(left)
			
		} else if( e.target === this._rightHandle ) {
			this.minWidth()
		}
	}

	_onMouseMoveResizeSet( rData, topic, data ) {
		INFO && console.info('Toolbar: mouse move resize set')
	}

	// todo: optimize with minimization state or reentry
	_onMouseMoveResizeSetMax( rData, topic, data ) {
		let	dw,	r, dir,	j, J, a, A,
			isMaxLeft,
			isMaxRight,
			{ accumulators: acc } = rData,
			{ dx, set, maxLeft, maxRight } = data,
			sets = this._sets,
			setIndex = sets.indexOf(set) 
		
		INFO && console.info('Toolbar: mouse move resize set max, maxLeft: ' + maxLeft + ' maxRight: ' + maxRight)

		isMaxLeft = _.isDef(maxLeft)
		isMaxRight = _.isDef(maxRight)

		// left/right normalization
		if( isMaxRight ) {
			j = setIndex + 1		// first set index
			J = sets.length - 1		// last set index
			dir = 1					// left/right
			a = 0					// first acc index
			A = J - j + 1			// last acc index
		
		} else if( isMaxLeft ) {
			j = setIndex - 1
			J = 0
			dir = -1
			a = 0
			A = j + 1

		} else {
			return
		}
		
		// contract
		if( isMaxLeft && dx < 0 || isMaxRight && dx > 0 ) {
			dx *= dir

			while( dx !== 0 ) {
				if( a === A ) {
					acc[A] += dx
					break
				}

				dw = sets[j].diffWidth(-1*dx)
				dx = dx + dw

				acc[a] -= dw 

				j += dir
				a += 1
			}
		
		// expand
		} else if( isMaxLeft && dx > 0 || isMaxRight && dx < 0 ) {
			dx *= dir

			a = A
			// check end accumulator
			if( acc[a] ) {
				r = acc[a] + dx
				
				if( r < 0 ) {
					dx = r
					acc[a] = 0
				
				} else {
					acc[a] += dx
					dx = 0
				}
			}

			j = J
			a -= 1
			dir *= -1

			// skip empty accumulators
			while( a >= 0 && acc[a] === 0 ) {
				j += dir
				a -= 1
			}

			// deaccumulate
			while( a >= 0 && dx !== 0 ) {
				r = acc[a] + dx
				
				if( r < 0 ) {
					dw = sets[j].diffWidth(acc[a])
					dx = r
					acc[a] = 0
				
				} else {
					dw = sets[j].diffWidth(-1*dx)
					acc[a] -= dw
					dx = dw + dx
				}

				j += dir
				a -= 1
			}

		}

		if( maxLeft === 0 ) {
			set.width(set.width())
			sets[setIndex - 1].flexWidth()
		}

		if( isMaxLeft && data.dx < 0 ) {
			set.flexWidth()
		}
	}

	_onMouseDownResizeSetBefore( sData, topic, data ) {
		INFO && console.info('Toolbar: mouse down resize set before')
				
		let { event, set } = data,
			setIndex = this._sets.indexOf(set)

		this._pixelSetWidth()
		
		this._sets[setIndex - 1].flexWidth()

		this._onMouseMoveResizeSetFn = this._onMouseMoveResizeSet.bind(this, {})

		this._onMouseMoveResizeSetMaxFn = this._onMouseMoveResizeSetMax.bind(this, {
			accumulators: new Array(this._sets.length + 2).fill(0)
		})

		set.subscribe(T_SET.RESIZE_MOUSE_MOVE_LEFT, this._onMouseMoveResizeSetFn)
		set.subscribe(T_SET.RESIZE_MOUSE_MOVE_RIGHT, this._onMouseMoveResizeSetFn)
		set.subscribe(T_SET.RESIZE_MOUSE_MOVE_MAX_LEFT, this._onMouseMoveResizeSetMaxFn)
		set.subscribe(T_SET.RESIZE_MOUSE_MOVE_MAX_RIGHT, this._onMouseMoveResizeSetMaxFn)
	}

	_onMouseUpResizeSetAfter( sData, topic, data ) {
		INFO && console.info('Toolbar: mouse up resize set after')

		let { event, set } = data
		
		this._pixelSetWidth()

		set.unsubscribe(T_SET.RESIZE_MOUSE_MOVE_MAX_LEFT, this._onMouseMoveResizeSetMaxFn)
		set.unsubscribe(T_SET.RESIZE_MOUSE_MOVE_MAX_RIGHT, this._onMouseMoveResizeSetMaxFn)
		set.unsubscribe(T_SET.RESIZE_MOUSE_MOVE_LEFT, this._onMouseMoveResizeSetFn)
		set.unsubscribe(T_SET.RESIZE_MOUSE_MOVE_RIGHT, this._onMouseMoveResizeSetFn)
	}

	_onMouseDblClickResizeSetBefore( sData, topic, data ) {
		INFO && console.info('Toolbar: mouse double-click resize set ')

		let flexSet,
			{ event, set } = data,
			setIndex = this._sets.indexOf(set),
			i = setIndex

		// look for unanchored set to the left	
		while( --i > -1 ) {
			flexSet = this._sets[i]
			if( !flexSet.isAnchored() ) {
				flexSet.flexWidth()
				sData.flexSet = flexSet
				break
			}
		}

		// force set to the left if none
		if( i === -1 && setIndex - 1 > -1 ) {
			flexSet = this._sets[setIndex - 1]
			flexSet.anchor(false)
			flexSet.flexWidth()
			sData.flexSet = flexSet
			sData.isFlexAnchor = true
		}
	}

	_onMouseDblClickResizeSetAfter( sData, topic, data ) {
		let { flexSet, isFlexAnchor } = sData
		
		if( flexSet ) {
			if( isFlexAnchor ) {
				flexSet.anchor()
			}
			flexSet.width(flexSet.width())
		}
	}

	_onMouseDown( e ) {
		INFO && console.info('Toolbar: mouse down')
		let sets = Array.prototype.slice.call(this._flex.children)

		// ignore if not main button
		if( e.button ) {
			return
		}

		// temporary to enable dragging while developing sets
		if( e.target === this._leftHandle || e.target === this._rightHandle ) {
			this._cursor(CURSOR.RESIZE_WIDTH)
			
			this._flexSetWidth()
			this._onMouseMoveFn = this._onMouseMoveResizeToolbar.bind(this, {
				event: e,
				offsetX: e.offsetX,
				offsetY: e.offsetY
			})

		} else if( e.currentTarget === this._el && sets.includes(e.target) ) {
			this._cursor(CURSOR.DRAG)
			
			this._flexSetWidth()
			this._onMouseMoveFn = this._onMouseMoveDragToolbar.bind(this, {
				event: e,
				offsetX: e.offsetX + e.target.offsetLeft,
				offsetY: e.offsetY
			})
		
		} else if( e.target === this._flex ) {
			this._cursor(CURSOR.DRAG)

			this._onMouseMoveFn = this._onMouseMoveDragToolbar.bind(this, {
				event: e,
				offsetX: e.offsetX,
				offsetY: e.offsetY
			})
		
		} else {
			return
		}
			
		// prevents drag (mousemove) halting when mouseup happens over child of toolbar
		// but mousedown originates on toolbar
		e.preventDefault()

		Core.subscribe(T.MOUSE_MOVE, this._onMouseMoveFn)
		Core.subscribe(T.MOUSE_UP, this._onMouseUpFn)
	}

	_onScreenResize( topic, data ) {
		this._screenSize.height = data.height
		this._screenSize.width = data.width

		if( this._isDocked ) {
			this.width(data.width)
		}
	}

	_saveAnchors( remove = false ) {
		let v
		this._anchors = []

		for( let set of this._sets ) {
			v = set.isAnchored()
			this._anchors.push(v)
			v && remove && set.anchor(false)
		}
	}

	_loadAnchors( setWidth = false ) {
		for( let [i, set] of this._sets.entries() ) {
			if( this._anchors[i] ) {
				set.anchor()
				setWidth && set.width(set.width())
			}
		}
	}

	_hideHandles() {
		_.addCss(this._leftHandle, 'hide-handle')
		_.addCss(this._rightHandle, 'hide-handle')
	}

	_showHandles() {
		_.removeCss(this._leftHandle, 'hide-handle')
		_.removeCss(this._rightHandle, 'hide-handle')
	}

	_dock( x, y ) {
		this._flexSetWidth()
		this._saveUndockedWidth()
		this.position(x, y)
		this.width(this._screenSize.width)
		_.addCss(this._el, 'toolbar-docked')
		this._hideHandles()
		this._pixelSetWidth()
		this._isDocked = true
	}

	_undock( x, y ) {
		this._flexSetWidth()
		this.position(x, y)
		this.width(this._undockedWidth)
		_.removeCss(this._el, 'toolbar-docked')
		this._showHandles()
		this._pixelSetWidth()
		this._isDocked = false
	}

	_cursor( cursor ) {
		document.body.style.cursor = cursor
	}

	_saveUndockedWidth() {
		if( this._el.offsetWidth ) {
			this._undockedWidth = this._el.offsetWidth
		}
	}

	_flexSetWidth() {
		for( let set of this._sets ) {
			set.flexScaleWidth()
		}
	}

	_pixelSetWidth() {
		for( let set of this._sets ) {
			set.width(set.width())
		}
	}

	_percentSetWidth() {
		let containerWidth = this._calcContainerWidth()

		for( let set of this._sets ) {
			set.width(set.width()/containerWidth * 100, '%')
		}
	}

	_calcContentWidth() {
		let w = 0
		
		for( let set of this._sets ) {
			w += set.calcContentWidth()
		}

		return w
	}

	_calcContainerWidth() {
		return _.rect(this.container()).width
	}

	_calcMinWidth() {
		return this._calcContentWidth() + this._calcHandleWidth()
	}

	_calcHandleWidth() {
		let w = 0

		if( this._leftHandle ) {
			w += _.rect(this._leftHandle).width
		}

		if( this._rightHandle ) {
			w += _.rect(this._rightHandle).width
		}

		return w
	}

	minWidth() {
		let	w = 0
		
		for( let set of this._sets ) {
			w += set.minWidth()
		}

		w += this._calcHandleWidth()

		this.width(w)

		return w
	}

	container() {
		return this._flex
	}

	addSet( set, render = false ) {
		if( set instanceof UiSet ) {
			if( this._sets.includes(set) ) {
				WARN && console.warn('Set already in toolbar')

			} else {
				this._sets.push(set)
				set.parent(this.container(), !!render)
				set.subscribe(T_SET.RESIZE_MOUSE_DOWN_BEFORE, this._onMouseDownResizeSetBeforeFn)
				set.subscribe(T_SET.RESIZE_MOUSE_UP_AFTER, this._onMouseUpResizeSetAfterFn)
				set.subscribe(T_SET.RESIZE_MOUSE_DBL_CLICK_BEFORE, this._onMouseDblClickResizeSetBeforeFn)
				set.subscribe(T_SET.RESIZE_MOUSE_DBL_CLICK_AFTER, this._onMouseDblClickResizeSetAfterFn)
			}

		} else {
			throw new Error('Toolbar set is not a UiSet object')
		}
	}

	removeSet( set ) {
		let index

		if( set instanceof UiSet ) {
			index = this._sets.indexOf(set)

			if( index === -1 ) {
				WARN && console.warn('Set not in toolbar')

			} else {
				this._sets.splice(index, 1)
				set.parent(null)
			}

		} else {
			throw new Error('Toolbar set is not a UiSet object')
		}
	}

	addSets( sets ) {
		if( Array.isArray(sets) ) {
			for( let set of sets ) {
				this.addSet(set)
			}

		} else {
			throw new Error('Toolbar sets must be specified in an array')
		}
	}

	render() {
		super.render()

		for( let set of this._sets ) {
			set.render()
		}
	}
}
