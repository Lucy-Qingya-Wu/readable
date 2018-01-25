import * as api from './../util/api'

export const RECEIVED_CATEGORIES = "RECEIVED_CATEGORIES"
export const RECEIVED_COMMENTS = "RECEIVED_COMMENTS"
export const RECEIVED_POSTS = "RECEIVED_POSTS"

export const RECEIVED_NEW_COMMENT = "RECEIVED_NEW_COMMENT"

export const RECEIVED_DELETED_POST = "RECEIVED_DELETED_POST"

export const RECEIVED_NEW_POST = "RECEIVED_NEW_POST"

export const RECEIVED_DELETED_COMMENT = "RECEIVED_DELETED_COMMENT"

export const RECEIVED_UPDATED_POST = "RECEIVED_UPDATED_POST"
export const RECEIVED_UPDATED_COMMENT = "RECEIVED_UPDATED_COMMENT"
export const RECEIVED_UPDATED_POST_SCORE = "RECEIVED_UPDATED_POST_SCORE"
export const receivedDeletedComment = (comment) => ({
  type: RECEIVED_DELETED_COMMENT,
  comment
})

export const deleteComment = (commentId) => {

  return dispatch => {
    return api.deleteComment(commentId)
            .then((comment) => dispatch(receivedDeletedComment(comment)))
            .catch(err => {throw(err)});
  }
}

export const receivedDeletedPost = (post) => (
  {
    type: RECEIVED_DELETED_POST,
    post
  }
)

export const receivedNewPost = (post) => {
  post.comments = []
  return {
    type: RECEIVED_NEW_POST,
    post
  }
}

export const receivedUpdatedPost = (post) => {
	return {
		type: RECEIVED_UPDATED_POST,
		post
	}
}

export const receivedUpdatedPostScore = (post) => ({
  type: RECEIVED_UPDATED_POST_SCORE,
  id: post.id,
  score: post.voteScore
})

export const votePost = (id, option) => {
  return dispatch => {
    return api.votePost(id, option)
      .then(newPost => dispatch(receivedUpdatedPostScore(newPost)))
      .catch(err=>{throw(err)})
  }
}

export const voteComment = (id, option) => {
	return dispatch => {
		return api.voteComment(id, option)
			.then(newComment => dispatch(receivedUpdatedComment(newComment)))
			.catch(err=>{throw(err)})
	}
}

export const receivedUpdatedComment = (comment) => {
	return {
		type: RECEIVED_UPDATED_COMMENT,
		comment
	}
}


export const updateComment = (id, data) => {
	return dispatch => {
		return api.updateComment(id, data)
			.then(newComment=>dispatch(receivedUpdatedComment(newComment)))
			.catch(err=>{throw(err)})
	}
}

export const updatePost = (id, data) => {

  return dispatch => {
    return api.updatePost(id, data)
            .then(newPost=> dispatch(receivedUpdatedPost(newPost)))
            .catch(err => {throw(err)});
  }
  // console.log(api.changePost(id, data))
  // return function (dispatch){
  //   return api.changePost(id, data)
  //     .then(response => {console.log("response", response)})
  // }
}



export const postNewPost = (post) => {

  return dispatch => {
    return api.postNewPost(post)
            .then(newPost=> dispatch(receivedNewPost(newPost)))
            .catch(err => {throw(err)});
  }

}

export const deletePost = (postId) => {

  return dispatch => {
    return api.deletePost(postId)
            .then((data)=>dispatch(receivedDeletedPost(data)))
            .catch(err=>{throw(err)})

  }
}

export const receivedCategories = (categories) => ({
  type: RECEIVED_CATEGORIES,
  categories,
});

export const receivedNewComment = (comment) => {

  return {
    type: RECEIVED_NEW_COMMENT,
    comment
  }
};

export const postNewComment = (comment) => {

  return dispatch => {
    return api.postNewComment(comment)
            .then(newComment=> dispatch(receivedNewComment(newComment)))
            .catch(err => {throw(err)});
  }

}

export const requestCategories = () => {

  return (dispatch) => {
    return api.getAllCategories()
            .then(categories => dispatch(receivedCategories(categories)))
            .catch(err => {throw(err)});
  }
}

export const requestPosts = () => {

	return (dispatch) => {
		return api.getAllPosts()
		.then(posts => {
			return new Promise(resolve=>{
				let promiseToGetComments = []
				posts.forEach(post=>{
					promiseToGetComments.push(api.getPostComments(post.id))
				})
				Promise.all(promiseToGetComments)
				.then(commentsArray => {

					//console.log("commentsArray: ", commentsArray) // [[{}, {}], []]

					// concat function is to join two or more arrays
					//console.log("...commentsArray: ", ...commentsArray)
					return [].concat(...commentsArray)

				})
				.then(allComments => {
					dispatch(receivedComments(allComments))

					// post has {comments: [id of for each comment]}
					posts = posts.map(post=>{
	                  post.comments = allComments.filter((c)=>c.parentId === post.id).map(c=>c.id)
	                  return post

	                })
	                resolve(posts)
				})
			})
		})
		.then(posts => dispatch(receivedPosts(posts)))
		.catch(err => {throw(err)})
	}
}

export const receivedComments = (comments) => ({
  type: RECEIVED_COMMENTS,
  comments,
})

export const receivedPosts = (posts) => ({
  type: RECEIVED_POSTS,
  posts,
})