import {
	RECEIVED_POSTS,
	RECEIVED_NEW_COMMENT,
	RECEIVED_DELETED_POST,
	RECEIVED_NEW_POST,
	RECEIVED_DELETED_COMMENT,
	RECEIVED_UPDATED_POST,
	RECEIVED_UPDATED_POST_SCORE

} from '../actions/types'


//[
// {
//		id: String,
// 		author : String,
// 		title: String,
// 		body: String,
// 		category: String,
// 		commentCount: Integer,
//      comments: [] - array of comment id
// 		deleted: boolean - flag if post has been 'deleted', default is false,
// 		timestamp: whatever format you want,
// 		voteScore: Integer - net votes the post has received (default: 1)
// }
// {
// 	    id: String
//      ...
// }
//]

export default function posts(state = [], action) {
	switch(action.type){
		case RECEIVED_UPDATED_POST_SCORE:
			const {id, score} = action
			return state.reduce((acc, p)=>{

				if (p.id === id){

					acc.push(Object.assign({}, p, {voteScore: score}))

				}
				else{
					acc.push(p)
				}

				return acc

			}, [])
		case RECEIVED_DELETED_COMMENT:
			return state.reduce((acc, p)=>{

				if (p.id === action.comment.parentId){

					acc.push(Object.assign({}, p, {commentCount: p.commentCount-1}))

				}
				else{
					acc.push(p)
				}

				return acc

			}, [])
		case RECEIVED_NEW_POST:
			return [action.post, ...state]
		case RECEIVED_UPDATED_POST:
			//console.log("in RECEIVED_UPDATED_POST, action.post", action.post)

			return state.map(p=>{
				if (p.id === action.post.id){
					return Object.assign({}, p, {body:action.post.body, title: action.post.title})
				}
				else{
					return p
				}
			})
		case RECEIVED_DELETED_POST:

			return state.reduce((acc, p)=>{

				if (p.id === action.post.id){
					acc.push(Object.assign({}, p, {deleted:true}))

				}
				else{
					acc.push(p)
				}

				return acc

			}, [])
		case RECEIVED_NEW_COMMENT:

			const commentId = action.comment.id

			const parentId = action.comment.parentId

			return state.reduce((acc, p)=>{

				if (p.id === parentId){
					acc.push(Object.assign({}, p, {commentCount: p.commentCount+1, comments:[commentId, ...p.comments]}))

				}
				else{
					acc.push(p)
				}

				return acc

			}, [])



		case RECEIVED_POSTS:
			return action.posts
		default:
			return state
	}
}