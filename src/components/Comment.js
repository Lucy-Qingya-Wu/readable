import React, {Component} from 'react'
import Moment from 'react-moment'
import {connect} from 'react-redux'

//import CommentForm from './CommentForm'

import {deleteComment, updateComment, voteComment} from '../actions'

class Comment extends Component{

	constructor(props){
		super(props)
		this.state = {
			editComment : false
		}
	}

	handleDeleteComment = (commentId) => {
		console.log("im in handleDeleteComment")
		const {comment, history, deleteComment} = this.props
		console.log("commentId: ", commentId)
		deleteComment(commentId)
		history.push(`/posts/${comment.parentId}`)

	}

	handleEditComment = (e) => {
		e.preventDefault();
		const {history, updateComment, comment} = this.props

		if (!this.body.value){
			alert("please fill in comment body")
			return
		}


		console.log("in handleEditComment")

		const updatedCommentInfo = {
			body: this.body.value,
			timestamp: Date.now()
		}


		updateComment(comment.id, updatedCommentInfo)
		this.setState({editComment:false})

		history.push(`/posts/${comment.parentId}`)

	}
	render(){

		const {comment, history, voteComment} = this.props

		if (this.state.editComment) {
			return (<div>

				<form onSubmit={this.handleEditComment}>

		            <div>body</div>
		            <textarea
		            	name="body"
		            	type="text"
		            	defaultValue={comment.body}
		            	ref={input => (this.body = input)}
		            />

		            <div>
		            	<input type="submit" />
		            </div>

				</form>
			</div>)
		}
		else{
			return (
			<div>

				<p>comment: {comment.body}</p>
				<p>score: {comment.voteScore}</p>
				<p>submitted by {comment.author} @ <Moment format="YYYY-MM-DD HH:mm">{comment.timestamp}</Moment></p>


	        	<button type="button" onClick={()=>this.setState({editComment:true})}>Edit</button>
	        	<button type="button" onClick={()=>this.handleDeleteComment(comment.id)}>Delete</button>

	        	<button type="button" onClick={()=>voteComment(comment.id, "upVote")}>VoteUp</button>
	        	<button type="button" onClick={()=>voteComment(comment.id, "downVote")}>VoteDown</button>

				<br/>
				<br/>

			</div>)
		}
	}
}



const mapDispatchToProps = (dispatch) => {
	return {
		deleteComment : (commentId) => dispatch(deleteComment(commentId)),
		updateComment : (commentId, updatedCommentInfo) => dispatch(updateComment(commentId, updatedCommentInfo)),
		voteComment : (commentId, option) => dispatch(voteComment(commentId, option))
	}
}
export default connect(null, mapDispatchToProps)(Comment)