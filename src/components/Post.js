import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

import {deletePost} from '../actions'

class Post extends Component{


	handleDeletePost = (postId) => {

		console.log("im in handleDeletePost")

		const {post, history, deletePost} = this.props

		deletePost(postId)


		history.push("/")

	}

	render(){
		console.log("in Post, this.props: ",  this.props)
		const {post} = this.props

        return (
        	<div key={post.id}>
        	    <Link to={{pathname : "/posts/" + post.id}}>
        	    	<p>{post.title}</p>
        	    </Link>

	        	<p>id: {post.id}</p>
	        	<p>category: {post.category}</p>
	        	<p>voteScore: {post.voteScore}</p>

	        	<p>body: {post.body}</p>
	        	<p>submitted by {post.author} @ <Moment format="YYYY-MM-DD HH:mm">{post.timestamp}</Moment></p>



        	    <Link to={{pathname : "/posts/comments/" + post.id}}>
        	    	<button type='button'>{post.commentCount} comments</button>
        	    </Link>



	        	<button type="button" >Edit</button>
	        	<button type="button" onClick={()=>this.handleDeletePost(post.id)} >Delete</button>
	        	<button type="button" >VoteUp</button>
	        	<button type="button" >VoteDown</button>

	        	<hr align="left" width="50%"/>
	        	<hr align="left" width="50%"/>
        	</div>)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		deletePost : (postId) => dispatch(deletePost(postId))
	}
}


export default connect(null, mapDispatchToProps)(Post)