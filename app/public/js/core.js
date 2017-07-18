import _ from './utility.js'
import mix from './mixin.js'
import PubSubMixin from './pubsub.js'

class Core extends mix(class {}).with(PubSubMixin) {
	constructor( ...args ) {
		super(args)
		this._initTopics()
	}
}

export default new Core() 
