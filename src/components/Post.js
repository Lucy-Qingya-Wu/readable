import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

import {deletePost, votePost} from '../actions'

class Post extends Component{


	handleDeletePost = (postId) => {

	 	const {post, history, deletePost} = this.props

	 	deletePost(postId)

	 	history.push("/")

	}

	render(){

		const {post, votePost} = this.props

		//console.log("Post: ", post)

        return (
        	<div key={post.id}>

        	    <Link to={{pathname : "/posts/" + post.id}}>
        	    	<p>{post.title}</p>
        	    </Link>


	        	<p>category: {post.category}</p>
	        	<p>voteScore: {post.voteScore}</p>

	        	<p>body: {post.body}</p>
	        	<p>submitted by {post.author} @ <Moment format="YYYY-MM-DD HH:mm">{post.timestamp}</Moment></p>



        	    <Link to={{pathname : "/posts/comments/" + post.id}}>
        	    	<button type='button'>{post.commentCount} comments</button>
        	    </Link>


        	    <Link to={{pathname : "/edit/post/" + post.id}}>
	        		<button type="button" >Edit</button>
	        	</Link>

	        	<button type="button" onClick={()=>this.handleDeletePost(post.id)} >Delete</button>
	        	<button type="button" onClick={()=>votePost(post.id, "upVote")} >VoteUp</button>
	        	<button type="button" onClick={()=>votePost(post.id, "downVote")}>VoteDown</button>

	        	<hr align="left" width="50%"/>
	        	<hr align="left" width="50%"/>
        	</div>)
	}
}



const mapDispatchToProps = (dispatch) => {
	return {
		deletePost : (postId) => dispatch(deletePost(postId)),
		votePost: (postId, option) => dispatch(votePost(postId, option))
	}
}


export default connect(null, mapDispatchToProps)(Post)
