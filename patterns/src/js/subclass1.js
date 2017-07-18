import UiOptions from './options.js'
import Baseclass from './baseclass.js'

export default class Subclass1 extends Baseclass {
	constructor( options = {} ) {
		super(new UiOptions(options, {
			testVar1: {
				type: TYPES.STR,
				value: 'test case 1'
			},
			testVar2: {
				type: TYPES.STR,
				value: 'test case 2'
				values: [ 'test case 1', 'test case 2' ]
			},
			testVar3: {
				type: TYPES.STR,
				merge: true,
				value: 'class1'
			},
			testVar4: {
				type: TYPES.STR,
				merge: true,
				delimiter: '-',
				value: 'class2'
			}
		}))
	}
}
