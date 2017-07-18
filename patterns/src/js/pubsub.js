import _ from './utility.js'

export default ( superclass ) => class extends superclass {

	_initTopics() {
		if( this._topics ) {
			return
		}
		this._topics = new Map()
	}
	
	_makeTopic( data ) {
		return {
			data: data,
			subscribers: []
		}
	}

	_addTopic( name, initialData ) {
		if( !this._topics.has(name) ) {
			this._topics.set(name, this._makeTopic(initialData))
		}

		return this._topics.get(name)
	}

	publish( name, data ) {
		let topic
		
		if( _.nStr(name) ) {
			throw new Error('Topic name required to publish')
		}

		if( this._topics.has(name) ) {
			topic = this._topics.get(name)
		
			for( let fn of topic.subscribers ) {
				fn(topic, data)
			}

		} else {
			topic = this._addTopic(name)
		}

		topic.data = data
	}
	
	subscribe( name, fn, callImmediately = false ) {
		let topic

		if( _.nStr(name) ) {
			throw new Error('Topic name required to subscribe')
		}

		if( _.nFn(fn) ) {
			throw new Error('Function required to subscribe')
		}
		
		if( this._topics.has(name) ) {
			topic = this._topics.get(name)
		
			if( topic.data !== void 0 && callImmediately ) {
				fn(name, topic.data)
			}
		
		} else {
			topic = this._addTopic(name)
		}

		topic.subscribers.push(fn)
	}

	unsubscribe( name, fn ) {
		let topic

		if( _.nStr(name) ) {
			throw new Error('Topic name required to unsubscribe')
		}

		if( _.nFn(fn) ) {
			throw new Error('Function required to unsubscribe')
		}

		if( this._topics.has(name) ) {
			let index,
				topic = this._topics.get(name)
				
			while( (index = topic.subscribers.indexOf(fn)) > -1 ) {
				topic.subscribers.splice(index, 1)
			}
		}
	}

}

