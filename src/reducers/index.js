import {combineReducers} from 'redux'

import categories from './category_reducer'
import comments from './comment_reducer'
import posts from './post_reducer'

const rootReducer = combineReducers({
	categories,
	comments,
	posts
})

export default rootReducer