const api = 'http://localhost:3001';

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}
export const deleteComment = (commentId) => {
  console.log("in api deleteComment, at the very beggining")
  return fetch(`${api}/comments/${commentId}`, {
            method: 'DELETE',
            headers
          })
          .then(res => {
            return res.json();
          })
}

export const deletePost = (postId) => {
  console.log("in api deletePost, at the very beggining")
  return fetch(`${api}/posts/${postId}`, {
            method: 'DELETE',
            headers
          })
          .then(res => {
            return res.json();
          })
}

export const postNewPost = (comment) => {
  console.log("in api postNewPost, at the very beggining")
  return  fetch(`${api}/posts`, {
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
            console.log("im in api : postNewPost")
            console.log("here is data: ", data)
            return data
          })
}

export const postNewComment = (comment) => {
  console.log("in api postComment, at the very beggining")
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
            console.log("im in api : postNewComment")
            console.log("here is data: ", data)
            return data
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
          	console.log("------ im in api.js - function getAllCategories------")
          	console.log("response data ", data)
            return data.categories;
          });
}

export const getAllPosts = () => {
  return fetch(`${api}/posts`, {
            method: 'GET',
            headers,
          })
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log("------ im in api.js - function getAllPosts------")
            console.log("response data ", data)
            return data
          });
}


export const getPostComments = (id) => {
  return  fetch(`${api}/posts/${id}/comments`, {
            method: 'GET',
            headers
          })
          .then(res => res.json());
}