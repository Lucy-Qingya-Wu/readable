import React, {Component} from 'react'
import Moment from 'react-moment'
import {connect} from 'react-redux'

import CommentForm from './CommentForm'

import {deleteComment} from '../actions'
class Comment extends Component{
	constructor(props){
		super(props)

	}
	handleDeleteComment = (commentId) => {
		console.log("im in handleDeleteComment")
		const {comment, history, deleteComment} = this.props
		deleteComment(commentId)
		history.push(`/posts/${comment.parentId}`)
	}

	render(){
		const {comment, history} = this.props



		return (
		<div>

			<p>comment: {comment.body}</p>
			<p>score: {comment.voteScore}</p>
			<p>submitted by {comment.author} @ <Moment format="YYYY-MM-DD HH:mm">{comment.timestamp}</Moment></p>

        	<button type="button" >Edit</button>
        	<button type="button" onClick={()=>this.handleDeleteComment(comment.id)}>Delete</button>
        	<button type="button" >VoteUp</button>
        	<button type="button" >VoteDown</button>

			<br/>
			<br/>

		</div>)
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		deleteComment : (commentId) => dispatch(deleteComment(commentId))
	}
}
export default connect(null, mapDispatchToProps)(Comment)