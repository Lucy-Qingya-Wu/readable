import React, {Component} from 'react'
import uuid from 'uuid'
import {connect} from 'react-redux'

import {postNewComment} from '../actions'

class CommentForm extends Component{

	handleSubmit = (e) => {
        e.preventDefault();
		const { history, comment, parentId, postNewComment} = this.props
		console.log("im in CommentForm handleSubmit")
		console.log("this.props: ", this.props)




		if (!this.author.value){
			alert("please fill in your name as author name")
			return
		}

		if (!this.body.value){
			alert("please fill in comment")
			return
		}


		const newComment = {

			id: uuid(),
			parentId,
			timestamp: Date.now(),
			body: this.body.value,
			author: this.author.value,

		}


		postNewComment(newComment)

		this.author.value = ""
		this.body.value = ""


		history.push(`/posts/${parentId}`)


	}

	render(){

		const { comment } = this.props

		const author = comment ? comment.author : ""
		const body = comment ? comment.body : ""

		return (
			<div>

				<form onSubmit={this.handleSubmit}>

					<div>author</div>
		            <input
		              name="author"
		              type="text"
		              defaultValue={author}
		              ref={input => (this.author = input)}
		            />

		            <div>body</div>
		            <textarea
		            	name="body"
		            	type="text"
		                defaultValue={body}
		            	ref={input => (this.body = input)}
		            />

		            <div>
		            	<input type="submit" />
		            </div>

				</form>
			</div>
		)
	}

}

function mapDispatchToProps(dispatch){
	console.log("in CommentForm: mapDispatchToProps")
	console.log("dispatch", dispatch)
	console.log("postNewComment", postNewComment)
	return {
		postNewComment: (data) => dispatch(postNewComment(data))
	}
}

export default connect(null, mapDispatchToProps)(CommentForm)