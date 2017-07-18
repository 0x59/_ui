import _ from './utility.js'
import Core from './core.js'
import Screen from './screen.js'
import Toolbar from './toolbar.js'
import UiIcon from './icon.js'
import UiSet from './set.js'

_.ready(() => {
	const
		doc = document,
		body = doc.body
	
	let screen = new Screen({
			parent: body
		}),
		navButtons = new UiSet({
			items: [
				new UiIcon({
					imageClass: 'icon-svg-left-arrow'
				}),
				new UiIcon({
					imageClass: 'icon-svg-right-arrow'
				})
			],
			resizeHandle: null
		}),
		pageButtons = new UiSet({
			items: [
				new UiIcon({
					imageClass: 'icon-svg-up-arrow'
				}),
				new UiIcon({
					imageClass: 'icon-svg-down-arrow'
				})
			]
		}),
		menuButtons = new UiSet({
			items: [
				new UiIcon({
					imageClass: 'icon-svg-menu-text'
				}),
				new UiIcon({
					imageClass: 'icon-svg-menu-grid'
				}),
				new UiIcon({
					imageClass: 'icon-svg-menu-expand'
				}),
				new UiIcon({
					imageClass: 'icon-svg-menu-drop'
				})
			]
		}),
		viewButtons = new UiSet({
			items: [
				new UiIcon({
					imageClass: 'icon-svg-expand'
				}),
				new UiIcon({
					imageClass: 'icon-svg-contract'
				})
			]
		}),
		toolbar = new Toolbar({
			parent: screen.el(),
			sets: [
				navButtons,
				pageButtons,
				menuButtons,
				viewButtons
			]
		})

	Core.subscribe('/screen/size', ( topic, data ) => {
		console.info(data.width + 'px  ' + data.height + 'px ')
	})
})
