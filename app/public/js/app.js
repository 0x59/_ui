import T from './TOPICS.js'
import _ from './utility.js'
import Core from './core.js'
import UiScreen from './screen.js'
import UiToolbar from './toolbar.js'
import UiIcon from './icon.js'
import UiSet from './set.js'

const
	INFO = 1

_.ready(() => {
	const
		doc = document,
		body = doc.body
	
	let screen = new UiScreen({
			parent: body
		}),
		navButtons = new UiSet({
			items: [
				new UiIcon({
					classes: 'icon-svg-left-arrow'
				}),
				new UiIcon({
					classes: 'icon-svg-right-arrow'
				})
			],
			resizeHandle: null
		}),
		pageButtons = new UiSet({
			items: [
				new UiIcon({
					classes: 'icon-svg-up-arrow'
				}),
				new UiIcon({
					classes: 'icon-svg-down-arrow'
				})
			]
		}),
		menuButtons = new UiSet({
			items: [
				new UiIcon({
					classes: 'icon-svg-menu-text'
				}),
				new UiIcon({
					classes: 'icon-svg-menu-grid'
				}),
				new UiIcon({
					classes: 'icon-svg-menu-expand'
				}),
				new UiIcon({
					classes: 'icon-svg-menu-drop'
				})
			]
		}),
		viewButtons = new UiSet({
			items: [
				new UiIcon({
					classes: 'icon-svg-expand'
				}),
				new UiIcon({
					classes: 'icon-svg-contract'
				})
			]
		}),
		toolbar = new UiToolbar({
			parent: screen.el(),
			sets: [
				navButtons,
				pageButtons,
				menuButtons,
				viewButtons
			]
		})

	INFO && Core.subscribe(T.SCREEN_SIZE, ( topic, data ) => {
		console.info(data.width + 'px  ' + data.height + 'px ')
	})
})
