import {
	RECEIVED_COMMENTS,
	RECEIVED_NEW_COMMENT,
	RECEIVED_DELETED_COMMENT
} from '../actions'
//[
// {
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

// }
// {
// 	    id: String
//      ...
// }
//]
export default function comments(state = [], action) {

	switch(action.type){

		case RECEIVED_COMMENTS:
			return action.comments

		case RECEIVED_DELETED_COMMENT:
			console.log("in reducer comments: RECEIVED_DELETED_COMMENT")
			const {comment} = action
			const newState = state.filter((c)=>c.id !== comment.id)
			return [...newState, comment]

		case RECEIVED_NEW_COMMENT:
			// const comments = [].concat(state)
			// comments.push(action.comment)
			// return comments
			return [...state, action.comment]
		default:
			return state

	}

}

