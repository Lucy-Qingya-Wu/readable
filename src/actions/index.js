import * as api from './../util/api'

export const RECEIVED_CATEGORIES = 'RECEIVED_CATEGORIES'
export const RECEIVED_POSTS = "RECEIVED_POSTS"
export const RECEIVED_COMMENTS = "RECEIVED_COMMENTS"
export const RECEIVED_NEW_COMMENT = "RECEIVED_NEW_COMMENT"
export const RECEIVED_NEW_POST = "RECEIVED_NEW_POST"

export const RECEIVED_DELETED_COMMENT = "RECEIVED_DELETED_COMMENT"
export const RECEIVED_DELETED_POST = "RECEIVED_DELETED_POST"

export const receivedDeletedComment = (comment) => ({
  type: RECEIVED_DELETED_COMMENT,
  comment
})

export const receivedDeletedPost = (post) => (
  {
    type: RECEIVED_DELETED_POST,
    post
  }
)

export const deletePost = (postId) => {
  console.log("im in action : deletePost")
  return dispatch => {
    return api.deletePost(postId)
            .then((data)=>dispatch(receivedDeletedPost(data)))
            .catch(err=>{throw(err)})

  }
}
export const deleteComment = (commentId) => {
  console.log("im in action : deleteComment")
  return dispatch => {
    return api.deleteComment(commentId)
            .then((comment) => dispatch(receivedDeletedComment(comment)))
            .catch(err => {throw(err)});
  }
}

export const receivedNewPost = (post) => {
  post.comments = []
  return {
    type: RECEIVED_NEW_POST,
    post
  }
}

export const postNewPost = (post) => {
  console.log("im in action : postNewPost")
  return dispatch => {
    return api.postNewPost(post)
            .then(newPost=> dispatch(receivedNewPost(newPost)))
            .catch(err => {throw(err)});
  }

}

export const receivedNewComment = (comment) => {
  console.log("im in receivedNewComment")
  console.log("comment", comment)
  return {
    type: RECEIVED_NEW_COMMENT,
    comment
  }
};

export const postNewComment = (comment) => {
  console.log("im in action : postNewComment")
  return dispatch => {
    return api.postNewComment(comment)
            .then(newComment=> dispatch(receivedNewComment(newComment)))
            .catch(err => {throw(err)});
  }

}

export const receivedCategories = (categories) => ({
  type: RECEIVED_CATEGORIES,
  categories,
});



export const receivedPosts = (posts) => ({
  type: RECEIVED_POSTS,
  posts,
})



export const receivedComments = (comments) => ({
  type: RECEIVED_COMMENTS,
  comments,
})


export const requestCategories = () => {
  /* A thunk always returns a function that accepts a dispatch. */
  return (dispatch) => {
    return api.getAllCategories()
            .then(categories => dispatch(receivedCategories(categories)))
            .catch(err => {throw(err)});
  }
}


export const requestPosts = () => {
  /* A thunk always returns a function that accepts a dispatch. */
  return (dispatch) => {
    return api.getAllPosts()
            .then(posts=> {
              return new Promise(resolve=>{

              let promiseToGetComments = []

              posts.forEach(post=>{
                promiseToGetComments.push(api.getPostComments(post.id))
              })

              Promise.all(promiseToGetComments)
              .then(commentsArray=>{

                return [].concat(...commentsArray)
              })
              .then(allComments=>{

                dispatch(receivedComments(allComments))
                posts = posts.map(post=>{
                  post.comments = allComments.filter((c)=>c.parentId === post.id).map(c=>c.id)
                  return post

                })
                resolve(posts)
              })

            })
          })
            .then(posts => dispatch(receivedPosts(posts)))
            .catch(err => {throw(err)});
  }
}

