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
        	<div key={post.id} className="card mb-4 post-div">
        		<div className="card-body">
	        	    <Link to={{pathname : "/posts/" + post.id}}>
	        	    	<h4 className="card-title">{post.title}</h4>
	        	    </Link>




		        	<p className="card-text">{post.body}</p>


		        </div>
		        <div className="card-footer text-muted">
		            <div className="post-submit-info">submitted by {post.author} @ <Moment format="YYYY-MM-DD HH:mm">{post.timestamp}</Moment> ({post.voteScore} points) ({post.category})</div>

		            <button type="button" className="btn btn-link first-btn" >
		        	    <Link className="link" to={{pathname : "/posts/comments/" + post.id}}>
		        	    	{post.commentCount} comments
		        	    </Link>
	        	    </button>

	        	    <button type="button" className="btn btn-link option-btn">
		        	    <Link className="link" to={{pathname : "/edit/post/" + post.id}}>
			        		edit
			        	</Link>
		        	</button>

		        	<button type="button" className="btn btn-link option-btn" onClick={()=>this.handleDeletePost(post.id)} >delete</button>
		        	<button type="button" className="btn btn-link option-btn" onClick={()=>votePost(post.id, "upVote")} >voteUp</button>
		        	<button type="button" className="btn btn-link option-btn" onClick={()=>votePost(post.id, "downVote")}>voteDown</button>

	        	</div>
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
