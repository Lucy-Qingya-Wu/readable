const api = 'http://localhost:3001';

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const votePost = (id, option) => {
  return fetch(`${api}/posts/${id}`, {
            method: 'POST',
            body: JSON.stringify({option}),
            headers:{
              ...headers,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            console.log("res", res)
            return res.json();
          })
          .then(data=>{
            console.log("im in api : votePost")
            console.log("here is option", option)
            console.log("here is data: ", data)
            return data
          })
}

export const updateComment = (id, updatedCommentdata) => {
  return fetch(`${api}/comments/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedCommentdata),
            headers:{
              ...headers,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            console.log("res", res)
            return res.json();
          })
          .then(data=>{
            console.log("im in api : updateComment")
            console.log("here is updatedCommentdata", updatedCommentdata)
            console.log("here is data: ", data)
            return data
          })
}

export const voteComment = (id, option) => {
  return fetch(`${api}/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify({option}),
            headers:{
              ...headers,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            console.log("res", res)
            return res.json();
          })
          .then(data=>{
            console.log("im in api : voteComment")
            console.log("here is option", option)
            console.log("here is data: ", data)
            return data
          })
}
export const updatePost = (id, updatedPostdata) => {
  //console.log("in updatePost=====")
  return fetch(`${api}/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedPostdata),
            headers:{
              ...headers,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            //console.log("res", res)
            return res.json();
          })
          .then(data=>{
            // console.log("im in api : updatePost")
            // console.log("here is ori_data", updatedPostdata)
            // console.log("here is data: ", data)
            return data
          })
}
export const deleteComment = (commentId) => {

  return fetch(`${api}/comments/${commentId}`, {
            method: 'DELETE',
            headers
          })
          .then(res => {
            return res.json();
          })
}
export const postNewPost = (post) => {
  console.log("in postNewPost=====")
  return  fetch(`${api}/posts`, {
            method: 'POST',
            body: JSON.stringify(post),
            headers:{
              ...headers,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            return res.json();
          })
          .then(data=>{
            console.log("im in api : postNewPost")
            console.log("here is data: ", data)
            return data
          })
}

export const deletePost = (postId) => {

  return fetch(`${api}/posts/${postId}`, {
            method: 'DELETE',
            headers
          })
          .then(res => {
            return res.json();
          })
}

export const postNewComment = (comment) => {

  return  fetch(`${api}/comments`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers:{
              ...headers,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            return res.json();
          })
          .then(data=>{
            console.log("original comment", comment)
            console.log("new comment", data)
            return data
          })
}

export const getAllPosts = () => {
  return fetch(`${api}/posts`, {
            method: 'GET',
            headers,
          })
          .then(res => {
            return res.json();
          })
}

export const getAllCategories = () => {
  return fetch(`${api}/categories`, {
            method: 'GET',
            headers,
          })
          .then(res => {
            return res.json();
          })
          .then(data => {
            return data.categories;
          });
}

export const getPostComments = (id) => {
  return  fetch(`${api}/posts/${id}/comments`, {
            method: 'GET',
            headers
          })
          .then(res => res.json());
}