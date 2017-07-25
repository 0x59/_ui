'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/******/(function (modules) {
	// webpackBootstrap
	/******/ // The module cache
	/******/var installedModules = {};
	/******/
	/******/ // The require function
	/******/function __webpack_require__(moduleId) {
		/******/
		/******/ // Check if module is in cache
		/******/if (installedModules[moduleId]) {
			/******/return installedModules[moduleId].exports;
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/var module = installedModules[moduleId] = {
			/******/i: moduleId,
			/******/l: false,
			/******/exports: {}
			/******/ };
		/******/
		/******/ // Execute the module function
		/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		/******/
		/******/ // Flag the module as loaded
		/******/module.l = true;
		/******/
		/******/ // Return the exports of the module
		/******/return module.exports;
		/******/
	}
	/******/
	/******/
	/******/ // expose the modules object (__webpack_modules__)
	/******/__webpack_require__.m = modules;
	/******/
	/******/ // expose the module cache
	/******/__webpack_require__.c = installedModules;
	/******/
	/******/ // identity function for calling harmony imports with the correct context
	/******/__webpack_require__.i = function (value) {
		return value;
	};
	/******/
	/******/ // define getter function for harmony exports
	/******/__webpack_require__.d = function (exports, name, getter) {
		/******/if (!__webpack_require__.o(exports, name)) {
			/******/Object.defineProperty(exports, name, {
				/******/configurable: false,
				/******/enumerable: true,
				/******/get: getter
				/******/ });
			/******/
		}
		/******/
	};
	/******/
	/******/ // getDefaultExport function for compatibility with non-harmony modules
	/******/__webpack_require__.n = function (module) {
		/******/var getter = module && module.__esModule ?
		/******/function getDefault() {
			return module['default'];
		} :
		/******/function getModuleExports() {
			return module;
		};
		/******/__webpack_require__.d(getter, 'a', getter);
		/******/return getter;
		/******/
	};
	/******/
	/******/ // Object.prototype.hasOwnProperty.call
	/******/__webpack_require__.o = function (object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	};
	/******/
	/******/ // __webpack_public_path__
	/******/__webpack_require__.p = "";
	/******/
	/******/ // Load entry module and return exports
	/******/return __webpack_require__(__webpack_require__.s = 12);
	/******/
})(
/************************************************************************/
/******/[
/* 0 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
		return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	};

	var TYPES = {
		STR: 'string',
		FN: 'function',
		OBJ: 'object',
		NUM: 'number',
		BOOL: 'boolean',
		SYM: 'symbol',
		UNDEF: 'undefined'
	},
	    UCHAR = {
		copyright: '©',
		asterisk: '*'
	},
	    GT = '>',
	    LT = '<',
	    doc = document,
	    body = doc.body;

	Object.freeze(TYPES);
	exports.TYPES = TYPES;
	var STR = TYPES.STR,
	    FN = TYPES.FN,
	    OBJ = TYPES.OBJ,
	    NUM = TYPES.NUM,
	    BOOL = TYPES.BOOL,
	    SYM = TYPES.SYM,
	    UNDEF = TYPES.UNDEF;

	var util = {
		isFn: function isFn(fn) {
			return (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === FN;
		},
		nFn: function nFn(fn) {
			return !(typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === FN;
		},
		isDef: function isDef(val) {
			return !((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === UNDEF);
		},
		nDef: function nDef(val) {
			return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === UNDEF;
		},
		isStr: function isStr(str) {
			return (typeof str === 'undefined' ? 'undefined' : _typeof(str)) === STR;
		},
		nStr: function nStr(str) {
			return !(typeof str === 'undefined' ? 'undefined' : _typeof(str)) === STR;
		},
		isElement: function isElement(el) {
			return el instanceof HTMLElement;
		},
		nElement: function nElement(el) {
			return !(el instanceof HTMLElement);
		},

		ready: function (queue) {

			doc.addEventListener('readystatechange', function () {
				for (var i = 0, len = queue.length; i < len; ++i) {
					queue.pop()();
				}
			});

			return function (fn) {
				if ((typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) !== FN) {
					throw new TypeError('argument not of function type');
				}

				doc.readyState === 'complete' ? fn() : queue.push(fn);
			};
		}([]),

		append: function append(node) {
			var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			for (var i = 0, len = nodes.length; i < len; ++i) {
				node.appendChild(nodes[i]);
			}
		},
		el: function el(type) {
			return doc.createElement(type);
		},
		txt: function txt(str) {
			return doc.createTextNode(str);
		},
		node: function node() {
			return doc.createDocumentFragment();
		},
		char: function char(str) {
			return UCHAR[str];
		},
		addCss: function addCss(node) {
			var _node$classList;

			for (var _len = arguments.length, classes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				classes[_key - 1] = arguments[_key];
			}

			(_node$classList = node.classList).add.apply(_node$classList, classes);
		},
		removeCss: function removeCss(node) {
			var _node$classList2;

			for (var _len2 = arguments.length, classes = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				classes[_key2 - 1] = arguments[_key2];
			}

			(_node$classList2 = node.classList).remove.apply(_node$classList2, classes);
		},
		event: function event() {
			doc.addEventListener.apply(doc, arguments);
		},
		cls: function cls(node, list_) {
			var list = (typeof list_ === 'undefined' ? 'undefined' : _typeof(list_)) === STR ? list_.split(' ') : list_;

			for (var i = 0, len = list.length; i < len; ++i) {
				node.classList.add(list[i]);
			}

			return node;
		},
		rect: function rect(el) {
			return el.getBoundingClientRect();
		},
		style: function style(el) {
			return window.getComputedStyle(el);
		}
	};

	var ops = {
		el: function el(arg) {
			if (arg === void 0) {
				return this._el;
			} else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === STR) {
				this._el = doc.createElement(arg);
				return this;
			} else {
				throw new Error('Tag must be string type');
			}
		},
		cls: function cls(list_) {
			var list = (typeof list_ === 'undefined' ? 'undefined' : _typeof(list_)) === STR ? list_.split(' ') : list_;

			for (var i = 0, len = list.length; i < len; ++i) {
				this._el.classList.add(list[i]);
			}

			return this;
		}
	};

	var _ = exports._ = function _(arg) {
		var ret = void 0;

		if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === STR) {
			return Object.create(ops).el(arg);
		} else if ((typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === OBJ && ops.isPrototypeOf(arg)) {

			return arg.el();
		} else if (util.isElement(arg)) {
			o = Object.create(ops);
			o._el = arg;

			return o;
		}
	};

	exports.default = _;

	Object.assign(_, util);

	/***/
},
/* 1 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}return _arr;
		}return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
		return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	};

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _utility = __webpack_require__(0);

	var _option = __webpack_require__(13);

	var _option2 = _interopRequireDefault(_option);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var WARN = 1,
	    INFO = 1,
	    UNDEF = _utility.TYPES.UNDEF,
	    STR = _utility.TYPES.STR,
	    BOOL = _utility.TYPES.BOOL,
	    NUM = _utility.TYPES.NUM,
	    FN = _utility.TYPES.FN,
	    OBJ = _utility.TYPES.OBJ,
	    SYM = _utility.TYPES.SYM;

	var UiOptions = function () {
		function UiOptions() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var superOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var descriptors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
			var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

			_classCallCheck(this, UiOptions);

			var $ = void 0;

			if ((typeof superOptions === 'undefined' ? 'undefined' : _typeof(superOptions)) !== OBJ) {
				throw new Error('Super options not an object');
			}

			if ((typeof descriptors === 'undefined' ? 'undefined' : _typeof(descriptors)) !== OBJ) {
				throw new Error('Descriptors not an object');
			}

			if (options instanceof UiOptions) {
				$ = options;
			} else if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === OBJ) {
				$ = this;

				Object.defineProperty($, '_options', {
					value: new Map()
				});

				Object.defineProperty($, '_pending', {
					value: new Map()
				});

				$.$addOptions(options);
			} else {
				throw new Error('Passed options not a UiOptions instance or object');
			}

			$.$addOptions(superOptions);
			$.$addDescriptors(descriptors);
			$.$checkPendingOptions(!!base);

			return $;
		}

		_createClass(UiOptions, [{
			key: '$addDescriptors',
			value: function $addDescriptors(descriptors) {
				var _this = this;

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					var _loop = function _loop() {
						var _step$value = _slicedToArray(_step.value, 2),
						    name = _step$value[0],
						    des = _step$value[1];

						if (_this._options.has(name)) {
							throw new Error('Duplicate descriptor defined for class option [%s]', name);
						}
						_this._options.set(name, new _option2.default(des, name));

						Object.defineProperty(_this, name, {
							enumerable: true,
							get: function get() {
								return _this._options.get(name).value();
							}
						});
					};

					for (var _iterator = Object.entries(descriptors)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						_loop();
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: '$addOptions',
			value: function $addOptions(options) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = Object.entries(options)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 2),
						    _name = _step2$value[0],
						    option = _step2$value[1];

						if (this._options.has(_name)) {
							this._options.get(_name).value(option);
						} else {
							if (!this._pending.has(_name)) {
								this._pending.set(_name, []);
							}
							this._pending.get(_name).push(option);
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}, {
			key: '$checkPendingOptions',
			value: function $checkPendingOptions() {
				var _this2 = this;

				var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					var _loop2 = function _loop2() {
						var _step3$value = _slicedToArray(_step3.value, 2),
						    name = _step3$value[0],
						    optionList = _step3$value[1];

						if (_this2._options.has(name)) {
							_this2._options.get(name).values(_this2._pending.get(name), true);
							_this2._pending.delete(name);
						} else if (base) {
							WARN && console.warn('No descriptor defined for class option [%s]', name);

							Object.defineProperty(_this2, name, {
								enumerable: true,
								get: function get() {
									return _this2._pending.get(name)[0];
								}
							});
						}
					};

					for (var _iterator3 = this._pending[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						_loop2();
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		}]);

		return UiOptions;
	}();

	exports.default = UiOptions;

	/***/
},
/* 2 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var TOPICS = {
		MOUSE_UP: '/input/mouseup',
		MOUSE_DOWN: '/input/mousedown',
		MOUSE_MOVE: '/input/mousemove',
		SCREEN_SIZE: '/screen/size'
	};

	exports.default = Object.freeze(TOPICS);

	/***/
},
/* 3 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _utility = __webpack_require__(0);

	var _utility2 = _interopRequireDefault(_utility);

	var _mixin = __webpack_require__(7);

	var _mixin2 = _interopRequireDefault(_mixin);

	var _pubsub = __webpack_require__(8);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Core = function (_mix$with) {
		_inherits(Core, _mix$with);

		function Core() {
			_classCallCheck(this, Core);

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var _this = _possibleConstructorReturn(this, (Core.__proto__ || Object.getPrototypeOf(Core)).call(this, args));

			_this._initTopics();
			return _this;
		}

		return Core;
	}((0, _mixin2.default)(function () {
		function _class() {
			_classCallCheck(this, _class);
		}

		return _class;
	}()).with(_pubsub2.default));

	exports.default = new Core();

	/***/
},
/* 4 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _utility = __webpack_require__(0);

	var _utility2 = _interopRequireDefault(_utility);

	var _options2 = __webpack_require__(1);

	var _options3 = _interopRequireDefault(_options2);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var UNDEF = _utility.TYPES.UNDEF,
	    STR = _utility.TYPES.STR,
	    BOOL = _utility.TYPES.BOOL,
	    NUM = _utility.TYPES.NUM,
	    FN = _utility.TYPES.FN,
	    OBJ = _utility.TYPES.OBJ,
	    SYM = _utility.TYPES.SYM;

	var UiElement = function () {
		function UiElement() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, UiElement);

			this._options = new _options3.default(options, {}, {
				parent: {
					type: HTMLElement,
					dflt: null
				},
				tag: {
					type: STR,
					dflt: ''
				},
				classes: {
					type: STR,
					dflt: '',
					merge: true
				}
			}, true);

			var _options = this._options,
			    parent = _options.parent,
			    tag = _options.tag,
			    classes = _options.classes;

			this.parent(parent);

			if (tag) {
				this._el = _utility2.default.el(tag);

				if (classes && this._el) {
					_utility2.default.cls(this._el, classes);
				}
			} else {
				this._el = null;
			}
		}

		_createClass(UiElement, [{
			key: '_preRender',
			value: function _preRender() {}
		}, {
			key: '_postRender',
			value: function _postRender() {}
		}, {
			key: 'render',
			value: function render() {
				if (this._parent && this._el) {
					this._preRender();

					this._parent.append(this._el);

					this._postRender();
				}
			}
		}, {
			key: 'detach',
			value: function detach() {
				if (this._parent && this._el) {
					this._el.remove();
				}
			}
		}, {
			key: 'el',
			value: function el() {
				return this._el;
			}
		}, {
			key: 'parent',
			value: function parent(el) {
				var render_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				var render = render_ || this._parent && this._parent.contains(this._el);

				if (el === void 0) {
					return this._parent;
				} else if (_utility2.default.isElement(el)) {
					this._parent = el;
				} else if (el === null) {
					if (this._parent) {
						this._parent.removeChild(this._el);
						this._parent = null;
					}
				} else {
					throw new Error('Parent must be an element');
				}

				if (render) {
					this.render();
				}
			}
		}, {
			key: 'position',
			value: function position(x, y) {
				var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'px';

				if (x !== void 0 || y !== void 0) {
					if (_utility2.default.nStr(unit)) {
						throw new Error('Unit not a string');
					}

					if (x !== void 0) {
						this._el.style.left = x + unit;
					}

					if (y !== void 0) {
						this._el.style.top = y + unit;
					}
				} else {
					var rect = _utility2.default.rect(this._el);
					return {
						x: rect.left,
						y: rect.top
					};
				}
			}
		}, {
			key: 'width',
			value: function width(w) {
				var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';

				if (w !== void 0) {
					if (_utility2.default.nStr(unit)) {
						throw new Error('Unit not a string');
					}

					this._el.style.width = w + unit;
				} else {
					return _utility2.default.rect(this._el).width;
				}
			}
		}]);

		return UiElement;
	}();

	exports.default = UiElement;

	/***/
},
/* 5 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TOPICS = undefined;

	var _get = function get(object, property, receiver) {
		if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);if (parent === null) {
				return undefined;
			} else {
				return get(parent, property, receiver);
			}
		} else if ("value" in desc) {
			return desc.value;
		} else {
			var getter = desc.get;if (getter === undefined) {
				return undefined;
			}return getter.call(receiver);
		}
	};

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _TOPICS = __webpack_require__(2);

	var _TOPICS2 = _interopRequireDefault(_TOPICS);

	var _CURSOR = __webpack_require__(6);

	var _CURSOR2 = _interopRequireDefault(_CURSOR);

	var _utility = __webpack_require__(0);

	var _utility2 = _interopRequireDefault(_utility);

	var _mixin = __webpack_require__(7);

	var _mixin2 = _interopRequireDefault(_mixin);

	var _pubsub = __webpack_require__(8);

	var _pubsub2 = _interopRequireDefault(_pubsub);

	var _element = __webpack_require__(4);

	var _element2 = _interopRequireDefault(_element);

	var _options = __webpack_require__(1);

	var _options2 = _interopRequireDefault(_options);

	var _core = __webpack_require__(3);

	var _core2 = _interopRequireDefault(_core);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var LOG = 0,
	    INFO = 0,
	    WARN = 0,
	    UNDEF = _utility.TYPES.UNDEF,
	    STR = _utility.TYPES.STR,
	    BOOL = _utility.TYPES.BOOL,
	    NUM = _utility.TYPES.NUM,
	    FN = _utility.TYPES.FN,
	    OBJ = _utility.TYPES.OBJ,
	    SYM = _utility.TYPES.SYM,
	    MIN_SET_SIZE = 0,
	    RESIZE_HANDLE_POSITION_LEFT = 'left',
	    RESIZE_HANDLE_POSITION_RIGHT = 'right',
	    RESIZE_HANDLE_POSITION_VALUES = [RESIZE_HANDLE_POSITION_LEFT, RESIZE_HANDLE_POSITION_RIGHT],
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
	});
	exports.TOPICS = TOPICS;

	var UiSet = function (_mix$with) {
		_inherits(UiSet, _mix$with);

		_createClass(UiSet, null, [{
			key: 'makeDefaultResizeHandle',
			value: function makeDefaultResizeHandle() {
				return {
					position: RESIZE_HANDLE_POSITION_LEFT,
					classes: RESIZE_HANDLE_CLASS
				};
			}
		}]);

		function UiSet() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, UiSet);

			var _this = _possibleConstructorReturn(this, (UiSet.__proto__ || Object.getPrototypeOf(UiSet)).call(this, new _options2.default(options, {
				tag: 'div',
				classes: SET_CLASS
			}, {
				items: {
					type: Array,
					dflt: []
				},
				resizeHandle: {
					type: OBJ,
					dflt: UiSet.makeDefaultResizeHandle()
				},
				anchorMinWidth: {
					type: BOOL,
					dflt: true
				}
			})));

			_this._initTopics();

			_this._set = new Set();

			_this._initElements();
			_this._initCallbacks();
			_this._initEvents();

			var items = _this._options.items;

			_this._anchor = {
				isAnchored: false,
				anchorMinWidth: !!_this._options.anchorMinWidth
			};

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					_this.addItem(item);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			_this.render();
			return _this;
		}

		_createClass(UiSet, [{
			key: '_initElements',
			value: function _initElements() {
				var resizeHandlePositionClass = void 0,
				    resizeHandle = this._options.resizeHandle;

				if (resizeHandle) {
					resizeHandle = Object.assign(UiSet.makeDefaultResizeHandle(), resizeHandle);

					if (resizeHandle.position && !RESIZE_HANDLE_POSITION_VALUES.includes(resizeHandle.position)) {
						throw new Error('Not a valid resize handle position');
					}

					if (resizeHandle.position === RESIZE_HANDLE_POSITION_LEFT) {
						resizeHandlePositionClass = RESIZE_HANDLE_LEFT_CLASS;
						_utility2.default.addCss(this._el, RESIZE_HANDLE_LEFT_SET_CLASS);
						this._isLeftResizeHandle = true;
					} else {
						resizeHandlePositionClass = RESIZE_HANDLE_RIGHT_CLASS;
						_utility2.default.addCss(this._el, RESIZE_HANDLE_RIGHT_SET_CLASS);
						this._isRightResizeHandle = true;
					}

					_utility2.default.addCss(this._el, SET_RESIZE_HANDLE_CLASS);

					this._resizeHandle = (0, _utility2.default)((0, _utility2.default)('div').cls(resizeHandle.classes + ' ' + resizeHandlePositionClass));
					this._el.append(this._resizeHandle);
				}
			}
		}, {
			key: '_initEvents',
			value: function _initEvents() {
				if (this._resizeHandle) {
					this._resizeHandle.addEventListener('mousedown', this._onMouseDownFn);
					this._resizeHandle.addEventListener('dblclick', this._onMouseDblClickResizeFn);
				}
			}
		}, {
			key: '_initCallbacks',
			value: function _initCallbacks() {
				if (this._resizeHandle) {
					this._onMouseDownFn = this._onMouseDown.bind(this);
					this._onMouseUpFn = this._onMouseUp.bind(this);
					this._onMouseMoveFn = null;
					this._onMouseDblClickResizeFn = this._onMouseDblClickResizeSet.bind(this);
				}
			}
		}, {
			key: '_onMouseDblClickResizeSet',
			value: function _onMouseDblClickResizeSet(e) {
				INFO && console.info('Set: mouse double-click resize set');
				// ignore if not main button
				if (e.button) {
					return;
				}

				var w1 = void 0;

				this.publish(TOPICS.RESIZE_MOUSE_DBL_CLICK_BEFORE, {
					event: e,
					set: this
				});

				w1 = this.minWidth();

				this.publish(TOPICS.RESIZE_MOUSE_DBL_CLICK_AFTER, {
					event: e,
					set: this
				});
			}

			/* todo:
   	1) fix alignment when moving off the browser window
   	2) add right handle drag
   */

		}, {
			key: '_onMouseMoveResizeSet',
			value: function _onMouseMoveResizeSet(rData, topic, data) {
				INFO && console.info('Set: mouse move resize set, maxLeft: ' + rData.maxLeft + ' maxRight: ' + rData.maxRight + ' dx: ' + data.dx);

				var rect1 = void 0,
				    rect2 = void 0,
				    left = void 0,
				    leftDiff = void 0,
				    width = void 0,
				    widthDiff = void 0,
				    remainder = void 0,
				    pubDx = void 0,
				    minWidth = 0,
				    dx = data.dx;

				if (this._isLeftResizeHandle) {
					if (dx < 0) {
						// accumulate left movement beyond stationary handle
						if (typeof rData.maxLeft === 'number' && rData.maxLeft < 0) {
							rData.maxLeft += dx;

							this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_LEFT, {
								maxLeft: rData.maxLeft,
								dx: dx,
								set: this
							});

							return;
						} else if (typeof rData.maxRight === 'number' && rData.maxRight > 0) {
							remainder = rData.maxRight + dx;

							// process overflow of movement
							if (remainder < 0) {
								this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_RIGHT, {
									maxRight: 0,
									dx: -1 * rData.maxRight,
									set: this
								});
								dx = remainder;
								rData.maxRight = 0;
							} else {
								rData.maxRight += dx;

								this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_RIGHT, {
									maxRight: rData.maxRight,
									dx: dx,
									set: this
								});

								return;
							}
						}

						rect1 = _utility2.default.rect(this._el);
						this.width(rect1.width - dx);
						rect2 = _utility2.default.rect(this._el);

						leftDiff = rect1.left - rect2.left;
						remainder = dx + leftDiff;

						if (remainder < 0) {
							this.publish(TOPICS.RESIZE_MOUSE_MOVE_LEFT, {
								dx: dx - remainder,
								set: this
							});

							rData.maxLeft = remainder;
							this.width(rect2.width + remainder);

							this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_LEFT, {
								maxLeft: rData.maxLeft,
								dx: rData.maxLeft,
								set: this
							});
						} else {
							this.publish(TOPICS.RESIZE_MOUSE_MOVE_LEFT, {
								dx: dx,
								set: this
							});
						}
					} else if (dx > 0) {
						if (typeof rData.maxLeft === 'number' && rData.maxLeft < 0) {
							remainder = rData.maxLeft + dx;

							// process overflow of movement
							if (remainder > 0) {
								this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_LEFT, {
									maxLeft: 0,
									dx: -1 * rData.maxLeft,
									set: this
								});

								dx = remainder;
								rData.maxLeft = 0;
							} else {
								rData.maxLeft += dx;

								this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_LEFT, {
									maxLeft: rData.maxLeft,
									dx: dx,
									set: this
								});

								return;
							}
						} else if (typeof rData.maxRight === 'number' && rData.maxRight > 0) {
							rData.maxRight += dx;

							this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_RIGHT, {
								maxRight: rData.maxRight,
								dx: dx,
								set: this
							});

							return;
						}

						rect1 = _utility2.default.rect(this._el);

						// fully close when moving right passed right limit
						remainder = dx - (rect1.width - minWidth);
						if (remainder > 0) {
							rData.maxRight = remainder;
							width = minWidth;
							pubDx = dx - remainder;
						} else {
							width = rect1.width - dx;
							pubDx = dx;
						}

						this.width(width);

						// properly align with handle when moving left passed right limit
						rect2 = _utility2.default.rect(this._el);

						widthDiff = rect1.width - rect2.width;
						remainder = dx - widthDiff;

						if (remainder > 0) {
							rData.maxRight = remainder;
							pubDx = dx - remainder;
						}

						this.publish(TOPICS.RESIZE_MOUSE_MOVE_RIGHT, {
							dx: pubDx,
							set: this
						});

						if (rData.maxRight) {
							this.publish(TOPICS.RESIZE_MOUSE_MOVE_MAX_RIGHT, {
								maxRight: rData.maxRight,
								dx: rData.maxRight,
								set: this
							});
						}
					}
				}
			}
		}, {
			key: '_onMouseDown',
			value: function _onMouseDown(e) {
				INFO && console.info('Set: mouse down resize set');
				// ignore if not main button
				if (e.button) {
					return;
				}

				this.publish(TOPICS.RESIZE_MOUSE_DOWN_BEFORE, {
					event: e,
					set: this
				});

				e.preventDefault();
				e.stopPropagation();

				this._cursor(_CURSOR2.default.RESIZE_WIDTH);

				this._onMouseMoveFn = this._onMouseMoveResizeSet.bind(this, {
					event: e,
					offsetX: e.offsetX,
					offsetY: e.offsetY
				});

				_core2.default.subscribe(_TOPICS2.default.MOUSE_MOVE, this._onMouseMoveFn);
				_core2.default.subscribe(_TOPICS2.default.MOUSE_UP, this._onMouseUpFn);
			}
		}, {
			key: '_onMouseUp',
			value: function _onMouseUp(topic, data) {
				INFO && console.info('Set: mouse up resize set');
				// ignore if not main button
				if (data.event.button) {
					return;
				}

				data.event.stopPropagation();

				this._cursor(_CURSOR2.default.DEFAULT);

				_core2.default.unsubscribe(_TOPICS2.default.MOUSE_UP, this._onMouseUpFn);
				_core2.default.unsubscribe(_TOPICS2.default.MOUSE_MOVE, this._onMouseMoveFn);

				this.publish(TOPICS.RESIZE_MOUSE_UP_AFTER, {
					event: data.event,
					set: this
				});
			}
		}, {
			key: '_cursor',
			value: function _cursor(cursor) {
				document.body.style.cursor = cursor;
			}
		}, {
			key: 'isAnchored',
			value: function isAnchored() {
				return this._anchor.isAnchored;
			}
		}, {
			key: 'anchor',
			value: function anchor() {
				var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

				this._anchor.isAnchored = !!a;
			}
		}, {
			key: 'width',
			value: function width(w) {
				var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';
				var flex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'none';

				var ret = void 0;

				if (w !== void 0 && unit === '%' && this.isAnchored()) {
					WARN && console.warn('Percentage width request on anchored set ignored');
					return;
				}

				ret = _get(UiSet.prototype.__proto__ || Object.getPrototypeOf(UiSet.prototype), 'width', this).call(this, w, unit);

				if (ret !== void 0) {
					return ret;
				}

				this._el.style.flex = flex;
			}
		}, {
			key: 'diffWidth',
			value: function diffWidth(w) {
				var w2 = void 0,
				    w1 = void 0,
				    w0 = this.width();

				// no width request = minimum possible width
				if (w === void 0) {
					w2 = 0;
				} else {
					w2 = w0 + w;
				}

				// don't allow negative widths
				if (w2 < 0) {
					w2 = 0;
				}

				this.width(w2);

				w1 = this.width();

				// keep style width and actual width =
				if (w1 !== w2) {
					this.width(w1);
				}

				return w1 - w0;
			}
		}, {
			key: 'minWidth',
			value: function minWidth() {
				var w = this.calcContentWidth();
				this.width(w);

				if (!this.isAnchored()) {
					this.anchor();
				}

				return w;
			}
		}, {
			key: 'calcContentWidth',
			value: function calcContentWidth() {
				var last = this._el.lastElementChild,
				    left = _utility2.default.rect(this._el).left,
				    right = _utility2.default.rect(last).right,
				    rightMargin = parseInt(_utility2.default.style(last).marginRight);

				return right + rightMargin - left;
			}
		}, {
			key: 'flexWidth',
			value: function flexWidth() {
				if (this.isAnchored()) {
					WARN && console.warn('Width request on anchored set ignored');
					return;
				}

				this._el.style.width = 'unset';
				this._el.style.flex = 'inherit';
			}
		}, {
			key: 'flexScaleWidth',
			value: function flexScaleWidth() {
				if (this.isAnchored()) {
					WARN && console.warn('Width request on anchored set ignored');
					return;
				}

				this._el.style.flex = '1 1 auto';
			}
		}, {
			key: 'addItem',
			value: function addItem(item) {
				if (!this._set.has(item)) {
					this._set.add(item);
					item.parent(this._el);
				} else {
					WARN && console.warn('Item already in set');
				}
			}
		}, {
			key: 'removeItem',
			value: function removeItem(item) {
				if (this._set.has(item)) {
					this._set.remove(item);
					item.parent(null);
				} else {
					WARN && console.warn('Item not in set');
				}
			}
		}, {
			key: 'render',
			value: function render() {
				_get(UiSet.prototype.__proto__ || Object.getPrototypeOf(UiSet.prototype), 'render', this).call(this);

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this._set[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var item = _step2.value;

						item.render();
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}]);

		return UiSet;
	}((0, _mixin2.default)(_element2.default).with(_pubsub2.default));

	exports.default = UiSet;

	/***/
},
/* 6 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var CURSOR = {
		DEFAULT: 'default',
		DRAG: 'move',
		RESIZE_WIDTH: 'col-resize'
	};

	exports.default = Object.freeze(CURSOR);

	/***/
},
/* 7 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var mixin = function () {
		function mixin(superclass) {
			_classCallCheck(this, mixin);

			this.superclass = superclass;
		}

		_createClass(mixin, [{
			key: "with",
			value: function _with() {
				for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
					mixins[_key] = arguments[_key];
				}

				return mixins.reduce(function (c, mixin) {
					return mixin(c);
				}, this.superclass);
			}
		}]);

		return mixin;
	}();

	exports.default = function (superclass) {
		return new mixin(superclass);
	};

	/***/
},
/* 8 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _utility = __webpack_require__(0);

	var _utility2 = _interopRequireDefault(_utility);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	exports.default = function (superclass) {
		return function (_superclass) {
			_inherits(_class, _superclass);

			function _class() {
				_classCallCheck(this, _class);

				return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
			}

			_createClass(_class, [{
				key: '_initTopics',
				value: function _initTopics() {
					if (this._topics) {
						return;
					}
					this._topics = new Map();
				}
			}, {
				key: '_makeTopic',
				value: function _makeTopic(data) {
					return {
						data: data,
						subscribers: []
					};
				}
			}, {
				key: '_addTopic',
				value: function _addTopic(name, initialData) {
					if (!this._topics.has(name)) {
						this._topics.set(name, this._makeTopic(initialData));
					}

					return this._topics.get(name);
				}
			}, {
				key: 'publish',
				value: function publish(name, data) {
					var topic = void 0;

					if (_utility2.default.nStr(name)) {
						throw new Error('Topic name required to publish');
					}

					if (this._topics.has(name)) {
						topic = this._topics.get(name);

						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = topic.subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var fn = _step.value;

								fn(topic, data);
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
					} else {
						topic = this._addTopic(name);
					}

					topic.data = data;
				}
			}, {
				key: 'subscribe',
				value: function subscribe(name, fn) {
					var callImmediately = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

					var topic = void 0;

					if (_utility2.default.nStr(name)) {
						throw new Error('Topic name required to subscribe');
					}

					if (_utility2.default.nFn(fn)) {
						throw new Error('Function required to subscribe');
					}

					if (this._topics.has(name)) {
						topic = this._topics.get(name);

						if (topic.data !== void 0 && callImmediately) {
							fn(name, topic.data);
						}
					} else {
						topic = this._addTopic(name);
					}

					topic.subscribers.push(fn);
				}
			}, {
				key: 'unsubscribe',
				value: function unsubscribe(name, fn) {
					var topic = void 0;

					if (_utility2.default.nStr(name)) {
						throw new Error('Topic name required to unsubscribe');
					}

					if (_utility2.default.nFn(fn)) {
						throw new Error('Function required to unsubscribe');
					}

					if (this._topics.has(name)) {
						var index = void 0,
						    _topic = this._topics.get(name);

						while ((index = _topic.subscribers.indexOf(fn)) > -1) {
							_topic.subscribers.splice(index, 1);
						}
					}
				}
			}]);

			return _class;
		}(superclass);
	};

	/***/
},
/* 9 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _utility = __webpack_require__(0);

	var _utility2 = _interopRequireDefault(_utility);

	var _options = __webpack_require__(1);

	var _options2 = _interopRequireDefault(_options);

	var _element = __webpack_require__(4);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var UiIcon = function (_UiElement) {
		_inherits(UiIcon, _UiElement);

		function UiIcon() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, UiIcon);

			var _this = _possibleConstructorReturn(this, (UiIcon.__proto__ || Object.getPrototypeOf(UiIcon)).call(this, new _options2.default(options, {
				tag: 'div',
				classes: 'icon icon-svg'
			})));

			_this.render();
			return _this;
		}

		return UiIcon;
	}(_element2.default);

	exports.default = UiIcon;

	/***/
},
/* 10 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _TOPICS = __webpack_require__(2);

	var _TOPICS2 = _interopRequireDefault(_TOPICS);

	var _utility = __webpack_require__(0);

	var _utility2 = _interopRequireDefault(_utility);

	var _element = __webpack_require__(4);

	var _element2 = _interopRequireDefault(_element);

	var _options = __webpack_require__(1);

	var _options2 = _interopRequireDefault(_options);

	var _core = __webpack_require__(3);

	var _core2 = _interopRequireDefault(_core);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var RESIZE_THROTTLE = 60; //ms

	var UiScreen = function (_UiElement) {
		_inherits(UiScreen, _UiElement);

		function UiScreen() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, UiScreen);

			var _this = _possibleConstructorReturn(this, (UiScreen.__proto__ || Object.getPrototypeOf(UiScreen)).call(this, new _options2.default(options, {
				tag: 'div',
				classes: 'screen'
			})));

			_this._resizeTimeout = null;

			_this._initEvents();
			_this.render();
			return _this;
		}

		_createClass(UiScreen, [{
			key: '_postRender',
			value: function _postRender() {
				_core2.default.publish(_TOPICS2.default.SCREEN_SIZE, {
					width: this._el.offsetWidth,
					height: this._el.offsetHeight
				});
			}
		}, {
			key: '_initEvents',
			value: function _initEvents() {
				window.addEventListener('resize', this._resizeThrottler.bind(this));

				document.addEventListener('mouseup', this._onMouseUp.bind(this));
				document.addEventListener('mousemove', this._onMouseMove.bind(this));
			}
		}, {
			key: '_resizeThrottler',
			value: function _resizeThrottler() {
				if (!this._resizeTimeout) {
					this._resizeTimeout = setTimeout(this._onResize.bind(this), RESIZE_THROTTLE);
				}
			}
		}, {
			key: '_onResize',
			value: function _onResize() {
				this._resizeTimeout = null;

				_core2.default.publish(_TOPICS2.default.SCREEN_SIZE, {
					width: this._el.offsetWidth,
					height: this._el.offsetHeight
				});
			}
		}, {
			key: '_onMouseUp',
			value: function _onMouseUp(e) {
				_core2.default.publish(_TOPICS2.default.MOUSE_UP, {
					event: e,
					x: e.x,
					y: e.y
				});
			}
		}, {
			key: '_onMouseMove',
			value: function _onMouseMove(e) {
				_core2.default.publish(_TOPICS2.default.MOUSE_MOVE, {
					event: e,
					x: e.x,
					y: e.y,
					dx: e.movementX,
					dy: e.movementY
				});
			}
		}]);

		return UiScreen;
	}(_element2.default);

	exports.default = UiScreen;

	/***/
},
/* 11 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () {
		function sliceIterator(arr, i) {
			var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
				for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
					_arr.push(_s.value);if (i && _arr.length === i) break;
				}
			} catch (err) {
				_d = true;_e = err;
			} finally {
				try {
					if (!_n && _i["return"]) _i["return"]();
				} finally {
					if (_d) throw _e;
				}
			}return _arr;
		}return function (arr, i) {
			if (Array.isArray(arr)) {
				return arr;
			} else if (Symbol.iterator in Object(arr)) {
				return sliceIterator(arr, i);
			} else {
				throw new TypeError("Invalid attempt to destructure non-iterable instance");
			}
		};
	}();

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _get = function get(object, property, receiver) {
		if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);if (parent === null) {
				return undefined;
			} else {
				return get(parent, property, receiver);
			}
		} else if ("value" in desc) {
			return desc.value;
		} else {
			var getter = desc.get;if (getter === undefined) {
				return undefined;
			}return getter.call(receiver);
		}
	};

	var _TOPICS = __webpack_require__(2);

	var _TOPICS2 = _interopRequireDefault(_TOPICS);

	var _set = __webpack_require__(5);

	var _set2 = _interopRequireDefault(_set);

	var _CURSOR = __webpack_require__(6);

	var _CURSOR2 = _interopRequireDefault(_CURSOR);

	var _utility = __webpack_require__(0);

	var _utility2 = _interopRequireDefault(_utility);

	var _options = __webpack_require__(1);

	var _options2 = _interopRequireDefault(_options);

	var _element = __webpack_require__(4);

	var _element2 = _interopRequireDefault(_element);

	var _core = __webpack_require__(3);

	var _core2 = _interopRequireDefault(_core);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof2(superClass)));
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var INFO = 0,
	    WARN = 0,
	    SNAP_THRESHOLD = 15,
	    DEFAULT_WIDTH = 400,
	    MIN_FLEX_WIDTH = 2;

	var UiToolbar = function (_UiElement) {
		_inherits(UiToolbar, _UiElement);

		function UiToolbar() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, UiToolbar);

			var _this = _possibleConstructorReturn(this, (UiToolbar.__proto__ || Object.getPrototypeOf(UiToolbar)).call(this, new _options2.default(options, {
				tag: 'div',
				classes: 'toolbar'
			}, {
				sets: {
					type: Array,
					dflt: []
				}
			})));

			var sets = _this._options.sets;

			_this._sets = [];
			_this._anchors = null;
			_this._flex = null;
			_this._undockedWidth = DEFAULT_WIDTH;
			_this._screenSize = {
				width: 0,
				height: 0
			};

			_this._initCallbacks();
			_this._initSubscriptions();
			_this._initElements();

			sets.length && _this.addSets(sets);

			_this._initEvents();

			_this.render();
			return _this;
		}

		_createClass(UiToolbar, [{
			key: '_initElements',
			value: function _initElements() {
				this._leftHandle = (0, _utility2.default)((0, _utility2.default)('div').cls('handle left-handle'));
				this._rightHandle = (0, _utility2.default)((0, _utility2.default)('div').cls('handle right-handle'));
				this._flex = (0, _utility2.default)((0, _utility2.default)('div').cls('toolbar-flex'));

				this._el.append(this._leftHandle, this._flex, this._rightHandle);

				this._dock(0, 0);
			}
		}, {
			key: '_initCallbacks',
			value: function _initCallbacks() {
				// shared data for resize set before/after
				var upDownResizeSetData = {},
				    dblClickResizeSetData = {};

				this._onMouseDownFn = this._onMouseDown.bind(this);
				this._onDblClickFn = this._onDblClick.bind(this);
				this._onMouseUpFn = this._onMouseUp.bind(this);
				this._onMouseMoveFn = null;
				this._onScreenResizeFn = this._onScreenResize.bind(this);

				this._onMouseDownResizeSetBeforeFn = this._onMouseDownResizeSetBefore.bind(this, upDownResizeSetData);
				this._onMouseUpResizeSetAfterFn = this._onMouseUpResizeSetAfter.bind(this, upDownResizeSetData);
				this._onMouseDblClickResizeSetBeforeFn = this._onMouseDblClickResizeSetBefore.bind(this, dblClickResizeSetData);
				this._onMouseDblClickResizeSetAfterFn = this._onMouseDblClickResizeSetAfter.bind(this, dblClickResizeSetData);

				this._onMouseMoveResizeSetFn = this._onMouseMoveResizeSet.bind(this); // left and right
				this._onMouseMoveResizeSetMaxFn = null; // left and right
			}
		}, {
			key: '_initSubscriptions',
			value: function _initSubscriptions() {
				_core2.default.subscribe(_TOPICS2.default.SCREEN_SIZE, this._onScreenResizeFn, true);
			}
		}, {
			key: '_initEvents',
			value: function _initEvents() {
				this._el.addEventListener('mousedown', this._onMouseDownFn);
				this._leftHandle.addEventListener('dblclick', this._onDblClickFn);
				this._rightHandle.addEventListener('dblclick', this._onDblClickFn);
			}

			// rData = reentry data with initial mousedown toolbar offset

		}, {
			key: '_onMouseMoveDragToolbar',
			value: function _onMouseMoveDragToolbar(rData, topic, data) {
				INFO && console.info('Toolbar: mouse move drag');
				var T = SNAP_THRESHOLD,
				    B = this._screenSize.height - SNAP_THRESHOLD;

				// mousemove from top left of document
				var mouseX = data.x,
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
				    toolbarBottom = toolbarTop + toolbarHeight;

				if (this._isDocked) {
					if (toolbarTop > T && toolbarBottom < B) {
						// keep length of bar on either side of mouse proportional when undocking (initial)
						rData.dockedOffsetX = rData.offsetX;
						rData.offsetX = Math.round(mouseDownX / toolbarWidth * this._undockedWidth);

						toolbarLeft = mouseX - rData.offsetX;

						this._undock(toolbarLeft, toolbarTop);
					}
				} else if (toolbarTop <= T || toolbarBottom >= B) {
					// assume first condition
					var y = 0;

					if (toolbarBottom >= B) {
						y = screenHeight - toolbarHeight;
					}

					this._dock(0, y);

					// after undocking, maintain proportionality when continuously docking/undocking
					if (rData.dockedOffsetX) {
						rData.offsetX = rData.dockedOffsetX;
						// keep length of bar on either side of mouse proportional when docking (initial)
					} else {
						rData.offsetX = Math.round(mouseDownX / toolbarWidth * this._screenSize.width);
					}
				} else {
					this.position(toolbarLeft, toolbarTop);
				}
			}
		}, {
			key: '_onMouseMoveResizeToolbar',
			value: function _onMouseMoveResizeToolbar(rData, topic, data) {
				INFO && console.info('Toolbar: mouse move resize toolbar');
				var dx = 0,
				    rightHandleLeft = this._rightHandle.offsetLeft,
				    toolbarLeft = this._el.offsetLeft,
				    toolbarWidth = this._el.offsetWidth,
				    flexWidth = this._flex.offsetWidth;

				this._flexSetWidth();
				if (rData.event.target === this._leftHandle) {
					// limit right movement to minimum size
					if (data.dx > 0 && flexWidth > MIN_FLEX_WIDTH) {
						if (flexWidth - data.dx < MIN_FLEX_WIDTH) {
							dx = flexWidth - MIN_FLEX_WIDTH;
						} else {
							dx = data.dx;
						}

						// limit left movement to cursor being left of or aligned with mousedown of handle
					} else if (data.dx < 0 && toolbarLeft + rData.offsetX >= data.x) {
						dx = data.dx;
					}

					if (dx !== 0) {
						this.position(toolbarLeft + dx);
						this.width(toolbarWidth - dx);
					}
				} else if (rData.event.target === this._rightHandle) {
					// limit left movement to minimum size
					if (data.dx < 0 && flexWidth > MIN_FLEX_WIDTH) {
						if (flexWidth + data.dx < MIN_FLEX_WIDTH) {
							dx = MIN_FLEX_WIDTH - flexWidth;
						} else {
							dx = data.dx;
						}

						// limit right movement to cursor being right of or aligned with mousedown of handle
					} else if (data.dx > 0 && toolbarLeft + rightHandleLeft + rData.offsetX <= data.x) {
						dx = data.dx;
					}

					if (dx !== 0) {
						this.width(toolbarWidth + dx);
					}
				}
			}
		}, {
			key: '_onMouseUp',
			value: function _onMouseUp(topic, data) {
				INFO && console.info('Toolbar: mouse up');
				// ignore if not main button
				if (data.event.button) {
					return;
				}

				this._cursor(_CURSOR2.default.DEFAULT);

				this._pixelSetWidth();

				_core2.default.unsubscribe(_TOPICS2.default.MOUSE_UP, this._onMouseUpFn);
				_core2.default.unsubscribe(_TOPICS2.default.MOUSE_MOVE, this._onMouseMoveFn);
			}
		}, {
			key: '_onDblClick',
			value: function _onDblClick(e) {
				INFO && console.info('Toolbar: mouse double-click');
				// ignore if not main button
				if (e.button) {
					return;
				}

				var minWidth = void 0,
				    dx = void 0,
				    rect = _utility2.default.rect(this._el),
				    left = rect.left,
				    width = rect.width,
				    overflow = 0;

				if (e.target === this._leftHandle) {
					minWidth = this.minWidth();
					dx = width - minWidth;

					left = left + dx;

					if (left < 0) {
						overflow = left;
						left = 0;
					}

					this.position(left);
				} else if (e.target === this._rightHandle) {
					this.minWidth();
				}
			}
		}, {
			key: '_onMouseMoveResizeSet',
			value: function _onMouseMoveResizeSet(rData, topic, data) {
				INFO && console.info('Toolbar: mouse move resize set');
			}

			// todo: optimize with minimization state or reentry

		}, {
			key: '_onMouseMoveResizeSetMax',
			value: function _onMouseMoveResizeSetMax(rData, topic, data) {
				var dw = void 0,
				    r = void 0,
				    dir = void 0,
				    j = void 0,
				    J = void 0,
				    a = void 0,
				    A = void 0,
				    isMaxLeft = void 0,
				    isMaxRight = void 0,
				    acc = rData.accumulators,
				    dx = data.dx,
				    set = data.set,
				    maxLeft = data.maxLeft,
				    maxRight = data.maxRight,
				    sets = this._sets,
				    setIndex = sets.indexOf(set);

				INFO && console.info('Toolbar: mouse move resize set max, maxLeft: ' + maxLeft + ' maxRight: ' + maxRight);

				isMaxLeft = _utility2.default.isDef(maxLeft);
				isMaxRight = _utility2.default.isDef(maxRight);

				// left/right normalization
				if (isMaxRight) {
					j = setIndex + 1; // first set index
					J = sets.length - 1; // last set index
					dir = 1; // left/right
					a = 0; // first acc index
					A = J - j + 1; // last acc index
				} else if (isMaxLeft) {
					j = setIndex - 1;
					J = 0;
					dir = -1;
					a = 0;
					A = j + 1;
				} else {
					return;
				}

				// contract
				if (isMaxLeft && dx < 0 || isMaxRight && dx > 0) {
					dx *= dir;

					while (dx !== 0) {
						if (a === A) {
							acc[A] += dx;
							break;
						}

						dw = sets[j].diffWidth(-1 * dx);
						dx = dx + dw;

						acc[a] -= dw;

						j += dir;
						a += 1;
					}

					// expand
				} else if (isMaxLeft && dx > 0 || isMaxRight && dx < 0) {
					dx *= dir;

					a = A;
					// check end accumulator
					if (acc[a]) {
						r = acc[a] + dx;

						if (r < 0) {
							dx = r;
							acc[a] = 0;
						} else {
							acc[a] += dx;
							dx = 0;
						}
					}

					j = J;
					a -= 1;
					dir *= -1;

					// skip empty accumulators
					while (a >= 0 && acc[a] === 0) {
						j += dir;
						a -= 1;
					}

					// deaccumulate
					while (a >= 0 && dx !== 0) {
						r = acc[a] + dx;

						if (r < 0) {
							dw = sets[j].diffWidth(acc[a]);
							dx = r;
							acc[a] = 0;
						} else {
							dw = sets[j].diffWidth(-1 * dx);
							acc[a] -= dw;
							dx = dw + dx;
						}

						j += dir;
						a -= 1;
					}
				}

				if (maxLeft === 0) {
					set.width(set.width());
					sets[setIndex - 1].flexWidth();
				}

				if (isMaxLeft && data.dx < 0) {
					set.flexWidth();
				}
			}
		}, {
			key: '_onMouseDownResizeSetBefore',
			value: function _onMouseDownResizeSetBefore(sData, topic, data) {
				INFO && console.info('Toolbar: mouse down resize set before');

				var event = data.event,
				    set = data.set,
				    setIndex = this._sets.indexOf(set);

				this._pixelSetWidth();

				this._sets[setIndex - 1].flexWidth();

				this._onMouseMoveResizeSetFn = this._onMouseMoveResizeSet.bind(this, {});

				this._onMouseMoveResizeSetMaxFn = this._onMouseMoveResizeSetMax.bind(this, {
					accumulators: new Array(this._sets.length + 2).fill(0)
				});

				set.subscribe(_set.TOPICS.RESIZE_MOUSE_MOVE_LEFT, this._onMouseMoveResizeSetFn);
				set.subscribe(_set.TOPICS.RESIZE_MOUSE_MOVE_RIGHT, this._onMouseMoveResizeSetFn);
				set.subscribe(_set.TOPICS.RESIZE_MOUSE_MOVE_MAX_LEFT, this._onMouseMoveResizeSetMaxFn);
				set.subscribe(_set.TOPICS.RESIZE_MOUSE_MOVE_MAX_RIGHT, this._onMouseMoveResizeSetMaxFn);
			}
		}, {
			key: '_onMouseUpResizeSetAfter',
			value: function _onMouseUpResizeSetAfter(sData, topic, data) {
				INFO && console.info('Toolbar: mouse up resize set after');

				var event = data.event,
				    set = data.set;

				this._pixelSetWidth();

				set.unsubscribe(_set.TOPICS.RESIZE_MOUSE_MOVE_MAX_LEFT, this._onMouseMoveResizeSetMaxFn);
				set.unsubscribe(_set.TOPICS.RESIZE_MOUSE_MOVE_MAX_RIGHT, this._onMouseMoveResizeSetMaxFn);
				set.unsubscribe(_set.TOPICS.RESIZE_MOUSE_MOVE_LEFT, this._onMouseMoveResizeSetFn);
				set.unsubscribe(_set.TOPICS.RESIZE_MOUSE_MOVE_RIGHT, this._onMouseMoveResizeSetFn);
			}
		}, {
			key: '_onMouseDblClickResizeSetBefore',
			value: function _onMouseDblClickResizeSetBefore(sData, topic, data) {
				INFO && console.info('Toolbar: mouse double-click resize set ');

				var flexSet = void 0,
				    event = data.event,
				    set = data.set,
				    setIndex = this._sets.indexOf(set),
				    i = setIndex;

				// look for unanchored set to the left	

				while (--i > -1) {
					flexSet = this._sets[i];
					if (!flexSet.isAnchored()) {
						flexSet.flexWidth();
						sData.flexSet = flexSet;
						break;
					}
				}

				// force set to the left if none
				if (i === -1 && setIndex - 1 > -1) {
					flexSet = this._sets[setIndex - 1];
					flexSet.anchor(false);
					flexSet.flexWidth();
					sData.flexSet = flexSet;
					sData.isFlexAnchor = true;
				}
			}
		}, {
			key: '_onMouseDblClickResizeSetAfter',
			value: function _onMouseDblClickResizeSetAfter(sData, topic, data) {
				var flexSet = sData.flexSet,
				    isFlexAnchor = sData.isFlexAnchor;

				if (flexSet) {
					if (isFlexAnchor) {
						flexSet.anchor();
					}
					flexSet.width(flexSet.width());
				}
			}
		}, {
			key: '_onMouseDown',
			value: function _onMouseDown(e) {
				INFO && console.info('Toolbar: mouse down');
				var sets = Array.prototype.slice.call(this._flex.children);

				// ignore if not main button
				if (e.button) {
					return;
				}

				// temporary to enable dragging while developing sets
				if (e.target === this._leftHandle || e.target === this._rightHandle) {
					this._cursor(_CURSOR2.default.RESIZE_WIDTH);

					this._flexSetWidth();
					this._onMouseMoveFn = this._onMouseMoveResizeToolbar.bind(this, {
						event: e,
						offsetX: e.offsetX,
						offsetY: e.offsetY
					});
				} else if (e.currentTarget === this._el && sets.includes(e.target)) {
					this._cursor(_CURSOR2.default.DRAG);

					this._flexSetWidth();
					this._onMouseMoveFn = this._onMouseMoveDragToolbar.bind(this, {
						event: e,
						offsetX: e.offsetX + e.target.offsetLeft,
						offsetY: e.offsetY
					});
				} else if (e.target === this._flex) {
					this._cursor(_CURSOR2.default.DRAG);

					this._onMouseMoveFn = this._onMouseMoveDragToolbar.bind(this, {
						event: e,
						offsetX: e.offsetX,
						offsetY: e.offsetY
					});
				} else {
					return;
				}

				// prevents drag (mousemove) halting when mouseup happens over child of toolbar
				// but mousedown originates on toolbar
				e.preventDefault();

				_core2.default.subscribe(_TOPICS2.default.MOUSE_MOVE, this._onMouseMoveFn);
				_core2.default.subscribe(_TOPICS2.default.MOUSE_UP, this._onMouseUpFn);
			}
		}, {
			key: '_onScreenResize',
			value: function _onScreenResize(topic, data) {
				this._screenSize.height = data.height;
				this._screenSize.width = data.width;

				if (this._isDocked) {
					this.width(data.width);
				}
			}
		}, {
			key: '_saveAnchors',
			value: function _saveAnchors() {
				var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

				var v = void 0;
				this._anchors = [];

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this._sets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var set = _step.value;

						v = set.isAnchored();
						this._anchors.push(v);
						v && remove && set.anchor(false);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: '_loadAnchors',
			value: function _loadAnchors() {
				var setWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this._sets.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _step2$value = _slicedToArray(_step2.value, 2),
						    i = _step2$value[0],
						    set = _step2$value[1];

						if (this._anchors[i]) {
							set.anchor();
							setWidth && set.width(set.width());
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}, {
			key: '_hideHandles',
			value: function _hideHandles() {
				_utility2.default.addCss(this._leftHandle, 'hide-handle');
				_utility2.default.addCss(this._rightHandle, 'hide-handle');
			}
		}, {
			key: '_showHandles',
			value: function _showHandles() {
				_utility2.default.removeCss(this._leftHandle, 'hide-handle');
				_utility2.default.removeCss(this._rightHandle, 'hide-handle');
			}
		}, {
			key: '_dock',
			value: function _dock(x, y) {
				this._flexSetWidth();
				this._saveUndockedWidth();
				this.position(x, y);
				this.width(this._screenSize.width);
				_utility2.default.addCss(this._el, 'toolbar-docked');
				this._hideHandles();
				this._pixelSetWidth();
				this._isDocked = true;
			}
		}, {
			key: '_undock',
			value: function _undock(x, y) {
				this._flexSetWidth();
				this.position(x, y);
				this.width(this._undockedWidth);
				_utility2.default.removeCss(this._el, 'toolbar-docked');
				this._showHandles();
				this._pixelSetWidth();
				this._isDocked = false;
			}
		}, {
			key: '_cursor',
			value: function _cursor(cursor) {
				document.body.style.cursor = cursor;
			}
		}, {
			key: '_saveUndockedWidth',
			value: function _saveUndockedWidth() {
				if (this._el.offsetWidth) {
					this._undockedWidth = this._el.offsetWidth;
				}
			}
		}, {
			key: '_flexSetWidth',
			value: function _flexSetWidth() {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this._sets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var set = _step3.value;

						set.flexScaleWidth();
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		}, {
			key: '_pixelSetWidth',
			value: function _pixelSetWidth() {
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = this._sets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var set = _step4.value;

						set.width(set.width());
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}
			}
		}, {
			key: '_percentSetWidth',
			value: function _percentSetWidth() {
				var containerWidth = this._calcContainerWidth();

				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					for (var _iterator5 = this._sets[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var set = _step5.value;

						set.width(set.width() / containerWidth * 100, '%');
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5.return) {
							_iterator5.return();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}
			}
		}, {
			key: '_calcContentWidth',
			value: function _calcContentWidth() {
				var w = 0;

				var _iteratorNormalCompletion6 = true;
				var _didIteratorError6 = false;
				var _iteratorError6 = undefined;

				try {
					for (var _iterator6 = this._sets[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
						var set = _step6.value;

						w += set.calcContentWidth();
					}
				} catch (err) {
					_didIteratorError6 = true;
					_iteratorError6 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion6 && _iterator6.return) {
							_iterator6.return();
						}
					} finally {
						if (_didIteratorError6) {
							throw _iteratorError6;
						}
					}
				}

				return w;
			}
		}, {
			key: '_calcContainerWidth',
			value: function _calcContainerWidth() {
				return _utility2.default.rect(this.container()).width;
			}
		}, {
			key: '_calcMinWidth',
			value: function _calcMinWidth() {
				return this._calcContentWidth() + this._calcHandleWidth();
			}
		}, {
			key: '_calcHandleWidth',
			value: function _calcHandleWidth() {
				var w = 0;

				if (this._leftHandle) {
					w += _utility2.default.rect(this._leftHandle).width;
				}

				if (this._rightHandle) {
					w += _utility2.default.rect(this._rightHandle).width;
				}

				return w;
			}
		}, {
			key: 'minWidth',
			value: function minWidth() {
				var w = 0;

				var _iteratorNormalCompletion7 = true;
				var _didIteratorError7 = false;
				var _iteratorError7 = undefined;

				try {
					for (var _iterator7 = this._sets[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
						var set = _step7.value;

						w += set.minWidth();
					}
				} catch (err) {
					_didIteratorError7 = true;
					_iteratorError7 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion7 && _iterator7.return) {
							_iterator7.return();
						}
					} finally {
						if (_didIteratorError7) {
							throw _iteratorError7;
						}
					}
				}

				w += this._calcHandleWidth();

				this.width(w);

				return w;
			}
		}, {
			key: 'container',
			value: function container() {
				return this._flex;
			}
		}, {
			key: 'addSet',
			value: function addSet(set) {
				var render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				if (set instanceof _set2.default) {
					if (this._sets.includes(set)) {
						WARN && console.warn('Set already in toolbar');
					} else {
						this._sets.push(set);
						set.parent(this.container(), !!render);
						set.subscribe(_set.TOPICS.RESIZE_MOUSE_DOWN_BEFORE, this._onMouseDownResizeSetBeforeFn);
						set.subscribe(_set.TOPICS.RESIZE_MOUSE_UP_AFTER, this._onMouseUpResizeSetAfterFn);
						set.subscribe(_set.TOPICS.RESIZE_MOUSE_DBL_CLICK_BEFORE, this._onMouseDblClickResizeSetBeforeFn);
						set.subscribe(_set.TOPICS.RESIZE_MOUSE_DBL_CLICK_AFTER, this._onMouseDblClickResizeSetAfterFn);
					}
				} else {
					throw new Error('Toolbar set is not a UiSet object');
				}
			}
		}, {
			key: 'removeSet',
			value: function removeSet(set) {
				var index = void 0;

				if (set instanceof _set2.default) {
					index = this._sets.indexOf(set);

					if (index === -1) {
						WARN && console.warn('Set not in toolbar');
					} else {
						this._sets.splice(index, 1);
						set.parent(null);
					}
				} else {
					throw new Error('Toolbar set is not a UiSet object');
				}
			}
		}, {
			key: 'addSets',
			value: function addSets(sets) {
				if (Array.isArray(sets)) {
					var _iteratorNormalCompletion8 = true;
					var _didIteratorError8 = false;
					var _iteratorError8 = undefined;

					try {
						for (var _iterator8 = sets[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
							var set = _step8.value;

							this.addSet(set);
						}
					} catch (err) {
						_didIteratorError8 = true;
						_iteratorError8 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion8 && _iterator8.return) {
								_iterator8.return();
							}
						} finally {
							if (_didIteratorError8) {
								throw _iteratorError8;
							}
						}
					}
				} else {
					throw new Error('Toolbar sets must be specified in an array');
				}
			}
		}, {
			key: 'render',
			value: function render() {
				_get(UiToolbar.prototype.__proto__ || Object.getPrototypeOf(UiToolbar.prototype), 'render', this).call(this);

				var _iteratorNormalCompletion9 = true;
				var _didIteratorError9 = false;
				var _iteratorError9 = undefined;

				try {
					for (var _iterator9 = this._sets[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
						var set = _step9.value;

						set.render();
					}
				} catch (err) {
					_didIteratorError9 = true;
					_iteratorError9 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion9 && _iterator9.return) {
							_iterator9.return();
						}
					} finally {
						if (_didIteratorError9) {
							throw _iteratorError9;
						}
					}
				}
			}
		}]);

		return UiToolbar;
	}(_element2.default);

	exports.default = UiToolbar;

	/***/
},
/* 12 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	var _TOPICS = __webpack_require__(2);

	var _TOPICS2 = _interopRequireDefault(_TOPICS);

	var _utility = __webpack_require__(0);

	var _utility2 = _interopRequireDefault(_utility);

	var _core = __webpack_require__(3);

	var _core2 = _interopRequireDefault(_core);

	var _screen = __webpack_require__(10);

	var _screen2 = _interopRequireDefault(_screen);

	var _toolbar = __webpack_require__(11);

	var _toolbar2 = _interopRequireDefault(_toolbar);

	var _icon = __webpack_require__(9);

	var _icon2 = _interopRequireDefault(_icon);

	var _set = __webpack_require__(5);

	var _set2 = _interopRequireDefault(_set);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	var INFO = 1;

	_utility2.default.ready(function () {
		var doc = document,
		    body = doc.body;

		var screen = new _screen2.default({
			parent: body
		}),
		    navButtons = new _set2.default({
			items: [new _icon2.default({
				classes: 'icon-svg-left-arrow'
			}), new _icon2.default({
				classes: 'icon-svg-right-arrow'
			})],
			resizeHandle: null
		}),
		    pageButtons = new _set2.default({
			items: [new _icon2.default({
				classes: 'icon-svg-up-arrow'
			}), new _icon2.default({
				classes: 'icon-svg-down-arrow'
			})]
		}),
		    menuButtons = new _set2.default({
			items: [new _icon2.default({
				classes: 'icon-svg-menu-text'
			}), new _icon2.default({
				classes: 'icon-svg-menu-grid'
			}), new _icon2.default({
				classes: 'icon-svg-menu-expand'
			}), new _icon2.default({
				classes: 'icon-svg-menu-drop'
			})]
		}),
		    viewButtons = new _set2.default({
			items: [new _icon2.default({
				classes: 'icon-svg-expand'
			}), new _icon2.default({
				classes: 'icon-svg-contract'
			})]
		}),
		    toolbar = new _toolbar2.default({
			parent: screen.el(),
			sets: [navButtons, pageButtons, menuButtons, viewButtons]
		});

		INFO && _core2.default.subscribe(_TOPICS2.default.SCREEN_SIZE, function (topic, data) {
			console.info(data.width + 'px  ' + data.height + 'px ');
		});
	});

	/***/
},
/* 13 */
/***/function (module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
		return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	};

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();

	var _utility = __webpack_require__(0);

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var INFO = 0,
	    WARN = 0,
	    UNDEF = _utility.TYPES.UNDEF,
	    STR = _utility.TYPES.STR,
	    BOOL = _utility.TYPES.BOOL,
	    NUM = _utility.TYPES.NUM,
	    FN = _utility.TYPES.FN,
	    OBJ = _utility.TYPES.OBJ,
	    SYM = _utility.TYPES.SYM,
	    DEFAULT_DELIMITER = ' ';

	var UiOption = function () {
		_createClass(UiOption, null, [{
			key: 'makeDefaultDescriptor',
			value: function makeDefaultDescriptor() {
				return {
					merge: false,
					type: STR,
					dflt: ''
				};
			}
		}]);

		function UiOption() {
			var descriptor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'unknown';

			_classCallCheck(this, UiOption);

			this._name = name;
			this._validateDescriptor(descriptor);
			this._validateValue();
		}

		_createClass(UiOption, [{
			key: '_validateDescriptor',
			value: function _validateDescriptor(descriptor) {
				if ((typeof descriptor === 'undefined' ? 'undefined' : _typeof(descriptor)) !== OBJ) {
					throw new Error('[' + this._name + '] option descriptor not an object');
				}

				this._descriptor = Object.assign(UiOption.makeDefaultDescriptor(), descriptor);

				var _descriptor = this._descriptor,
				    merge = _descriptor.merge,
				    delimiter = _descriptor.delimiter,
				    type = _descriptor.type,
				    validator = _descriptor.validator,
				    values = _descriptor.values;

				if (type !== void 0) {
					if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === STR) {
						if (!Object.values(_utility.TYPES).includes(type)) {
							throw new Error('[' + this._name + '] option descriptor type string must be valid against the typeof operator');
						}
					} else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) !== FN) {
						throw new Error('[' + this._name + '] option descriptor type is not a string or function');
					}
				}

				if (merge !== void 0 && (typeof merge === 'undefined' ? 'undefined' : _typeof(merge)) !== BOOL) {
					throw new Error('[' + this._name + '] option descriptor merge is not boolean');
				}

				if (merge) {
					if (delimiter !== void 0 && (typeof delimiter === 'undefined' ? 'undefined' : _typeof(delimiter)) !== STR) {
						throw new Error('[' + this._name + '] option descriptor delimiter not a string');
					}

					if (delimiter === void 0 && type === STR) {
						this._descriptor.delimiter = DEFAULT_DELIMITER;
					}
				} else if (delimiter !== void 0) {
					this._descriptor.delimiter = void 0;
					WARN && console.warn('[%s] option descriptor delimiter ignored when not merging', this._name);
				}

				if (values !== void 0) {
					if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) !== OBJ && !Array.isArray(values)) {
						throw new Error('[' + this._name + '] option descriptor possible values must be specified as an array or object');
					}
				}

				if (validator !== void 0) {
					if ((typeof validator === 'undefined' ? 'undefined' : _typeof(validator)) !== FN) {
						throw new Error('[' + this._name + '] option descriptor custom validator must be callable');
					}
				}
			}
		}, {
			key: '_validateValue',
			value: function _validateValue(v) {
				var argValue = !!arguments.length,
				    hasValue = this._descriptor.hasOwnProperty('value'),
				    hasDefault = this._descriptor.hasOwnProperty('dflt'),
				    _descriptor2 = this._descriptor,
				    type = _descriptor2.type,
				    dflt = _descriptor2.dflt,
				    validator = _descriptor2.validator,
				    merge = _descriptor2.merge,
				    value = _descriptor2.value,
				    values = _descriptor2.values;

				if (argValue) {
					value = v;
				} else if (hasValue) {
					if (Object.keys(this._descriptor).length === 1) {
						return;
					}
				} else if (hasDefault) {
					this._descriptor.value = value = dflt;
				} else {
					throw new Error('[' + this._name + '] option descriptor definition must include a value or a default value');
				}

				if (type !== void 0) {
					if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === STR) {
						if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== type) {
							throw new Error('[' + this._name + '] option value not of type: ' + type);
						}
					} else if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === FN) {
						if (!(value instanceof type) && value !== dflt) {
							throw new Error('[' + this._name + '] option value not an instance of: ' + type.name);
						}
					} else {
						WARN && console.warn('[%s] option type checking skipped due to unsupported type validation', this._name);
					}
				}

				// todo: plain object checking
				if (merge) {
					if (type !== STR && type !== OBJ && !Array.isArray(value)) {
						throw new Error('[' + this._name + '] option merging can only be performed on arrays, strings, and plain objects');
					}
				}

				if (values) {
					if (Array.isArray(values)) {
						if (!values.includes(value)) {
							INFO && console.dir(value);
							throw new Error('[' + this._name + '] value not in possible valid values');
						}
					} else if ((typeof values === 'undefined' ? 'undefined' : _typeof(values)) === OBJ) {
						if (!Object.values(values).includes(value)) {
							INFO && console.dir(value);
							throw new Error('[' + this._name + '] value not in possible valid values');
						}
					} else {
						WARN && console.warn('[%s] values type checking skipped due to unsupported validation');
					}
				}

				if (validator && !validator(value)) {
					throw new Error('[' + this._name + '] value failed custom validation');
				}
			}

			// todo: deep merge, plain object checking

		}, {
			key: '_mergeValue',
			value: function _mergeValue(v) {
				if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === STR) {
					this._descriptor.value += this._descriptor.value ? this._descriptor.delimiter + v : v;
				} else if (Array.isArray(v)) {
					this._descriptor.value = this._descriptor.value.concat(v);
				} else if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === OBJ) {
					Object.assign(this._descriptor.value, v);
				}
			}
		}, {
			key: '_shiftValues',
			value: function _shiftValues() {
				var _descriptor3 = this._descriptor,
				    type = _descriptor3.type,
				    value = _descriptor3.value;

				if (type === STR) {
					this._descriptor.value = '';
				} else if (Array.isArray(value)) {
					this._descriptor.value = [];
				} else if (type === OBJ) {
					this._descriptor.value = {};
				} else {
					throw new Error('Unsupported merge type encountered while shifting values for option [' + this._name + ']');
				}

				return value;
			}
		}, {
			key: 'value',
			value: function value(v) {
				if (!arguments.length) {
					return this._descriptor.value;
				}

				this._validateValue(v);

				if (this._descriptor.merge) {
					this._mergeValue(v);
				} else {
					this._descriptor.value = v;
				}
			}
		}, {
			key: 'values',
			value: function values(arr) {
				var shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

				var shiftValues = void 0;

				if (!Array.isArray(arr)) {
					WARN && console.warn('[%s] option values must be specified in an array: treated as single value', this._name);
					this.value(arr);
					return;
				}

				if (this._descriptor.merge) {
					if (shift) {
						shiftValues = this._shiftValues();
					}

					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var v = _step.value;

							this.value(v);
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator.return) {
								_iterator.return();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}

					if (shift && shiftValues) {
						this.value(shiftValues);
					}
				} else {
					if (arr.length > 1) {
						WARN && console.warn('[%s] option descriptor ignored pending options while not merging', this._name);
					}
					this.value(arr[0]);
				}
			}
		}]);

		return UiOption;
	}();

	exports.default = UiOption;

	/***/
}]);
//# sourceMappingURL=app.js.map