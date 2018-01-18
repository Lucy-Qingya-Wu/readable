import {
	RECEIVED_POSTS,
	RECEIVED_NEW_COMMENT,
	RECEIVED_NEW_POST,
	RECEIVED_DELETED_COMMENT,
	RECEIVED_DELETED_POST

} from '../actions'
//[
// {
//		id: String,
// 		author : String,
// 		title: String,
// 		body: String,
// 		category: String,
// 		commentCount: Integer,
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

		case RECEIVED_POSTS:
			return action.posts

		case RECEIVED_NEW_POST:
			return [...state, action.post]


		case RECEIVED_DELETED_POST:
			let posts = [...state].filter(p => p.id !== action.post.id)
			return [...posts, action.post]

		case RECEIVED_DELETED_COMMENT:

			posts = [...state].reduce((acc, post)=>{
				if (post.id === action.comment.parentId){
					post.commentCount -= 1
				}
				acc.push(post)
				return acc
			}, [])

			return posts

		case RECEIVED_NEW_COMMENT:

			console.log("im in post_reducer: RECEIVED_NEW_COMMENT")
			console.log("comment: ", action.comment)


			posts = [...state].reduce((acc, post)=>{

				console.log("here is post in posts: ", post)

				if (post.id === action.comment.parentId){

					const newPost = Object.assign({}, post)
					newPost.comments.push(action.comment.id)

					newPost.commentCount += 1

					acc.push(newPost)
				}
				else{
					acc.push(post)
				}

				return acc

			}, [])


			// console.log("here is new posts", posts)
			return posts
			// return state


		default:
			return state

	}

}