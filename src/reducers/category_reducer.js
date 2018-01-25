import {RECEIVED_CATEGORIES} from '../actions'

export default function categories(state = [], action) {

	switch(action.type){
		case RECEIVED_CATEGORIES:
		    const {categories} = action
		    const allCategories = categories.map((category)=>category.name)
			return allCategories
		default:
			return state

	}

}