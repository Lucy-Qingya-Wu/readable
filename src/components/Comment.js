import React, {Component} from 'react'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
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

		            <div>Edit Comment</div>

		            <textarea

		            	name="body"
		            	type="text"
		            	defaultValue={comment.body}
		            	ref={input => (this.body = input)}
		            />

		            <div>

			            <button type="submit" className="btn btn-primary btn-sm comment-form-btn">Submit</button>

			            <button type="button" className="btn btn-primary btn-sm comment-form-btn" onClick={()=>this.setState({editComment:false})}>Cancel</button>

		            </div>

				</form>

			</div>)
		}
		else{
			return (



				<div className="media-body ">
				    <p className="comment-author">{comment.author}</p><p className="comment-submit-info">submitted @ <Moment format="YYYY-MM-DD HH:mm">{comment.timestamp}</Moment> ({comment.voteScore} points)</p>
					<p className="comment-body">{comment.body}</p>


		        	<button type="button" className="btn btn-link first-btn" onClick={()=>this.setState({editComment:true})}>edit</button>
		        	<button type="button" className="btn btn-link option-btn" onClick={()=>this.handleDeleteComment(comment.id)}>delete</button>

		        	<button type="button" className="btn btn-link option-btn" onClick={()=>voteComment(comment.id, "upVote")}>voteUp</button>
		        	<button type="button" className="btn btn-link option-btn" onClick={()=>voteComment(comment.id, "downVote")}>voteDown</button>

				</div>

			)
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