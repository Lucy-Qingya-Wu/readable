import {
	RECEIVED_COMMENTS,
	RECEIVED_NEW_COMMENT,
	RECEIVED_DELETED_POST,
	RECEIVED_DELETED_COMMENT,
	RECEIVED_UPDATED_COMMENT
} from '../actions'

//{
//
// id: {
//		id: String,
//      parentId: String - id of the parent post,
// 		author : String,
// 		body: String,
//      parentDeleted: boolean - Flag for when the the parent post was deleted,
//                               but the comment itself was not.
// 		deleted: boolean - Flag if comment has been 'deleted'
//                       - (inaccessible by the front end), (default: false)
// 		timestamp: whatever format you want,
// 		voteScore: Integer - net votes the post has received (default: 1)
//
//     }
//
// id: {
// 	    id: String
//      ...
//     }
//
//}

export default function comments(state = {}, action) {



	switch(action.type){
		case RECEIVED_UPDATED_COMMENT:
			return Object.assign({}, state, {[action.comment.id]:action.comment})

		case RECEIVED_DELETED_COMMENT:
			console.log("RECEIVED_DELETED_COMMENT, action.comment", action.comment)
			return Object.assign({}, state, {[action.comment.id]:action.comment})

		case RECEIVED_DELETED_POST:

			let result = {}
			for (var key in state){
				if (state[key]["parentId"] === action.post.id){
					result[key] = Object.assign({}, state[key], {parentDeleted:true})
				}
			}
			return Object.assign({}, state, result)

		case RECEIVED_NEW_COMMENT:


			//console.log("in comment_reducer: action is ", action)
			return {...state, [action.comment.id]:action.comment}

		case RECEIVED_COMMENTS:

			const newState = {}
			action.comments.forEach(c=>newState[c.id] = c)
			return newState


		default:
			return state

	}

}




