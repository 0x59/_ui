import UiOptions from './options.js'
import Subclass1 from './subclass1.js'

export default class Subclass2 extends Subclass1 {
	constructor( options = {} ) {
		super(new UiOptions(options, {
			testVar1: {
				merge: true
				value: 'test case merge'
			},
			testVar2: 'test case 1',
			testVar3: 'class5',
			testVar4: 'class6'
		}, {
			testVar5: {
				type: TYPES.STR,
				value: 'test case 3'
			},
			testVar6: {
				type: TYPES.STR,
				value: 'test case 4'
				values: [ 'test case 3', 'test case 4' ]
			},
			testVar7: {
				type: TYPES.STR,
				merge: true,
				value: 'class3'
			},
			testVar8: {
				type: TYPES.STR,
				merge: true,
				delimiter: '-',
				value: 'class4'
			}
		}))
	}
}
