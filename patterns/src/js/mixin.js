class mixin {
	constructor(superclass) {
		this.superclass = superclass
	}

	with(...mixins) {
		return mixins.reduce(( c, mixin ) => mixin(c), this.superclass)
	}
}

export default ( superclass ) => new mixin(superclass)

