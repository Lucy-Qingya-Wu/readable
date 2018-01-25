import React, {Component} from 'react'
import uuid from 'uuid'
import {connect} from 'react-redux'

import {postNewComment} from '../actions'

class CommentForm extends Component{

	handleSubmit = (e) => {

        e.preventDefault();
		const { history, parentId, postNewComment} = this.props


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

		const { parentId } = this.props


		return (
			<div>

				<form onSubmit={this.handleSubmit}>

					<div>author</div>
		            <input
		              name="author"
		              type="text"

		              ref={input => (this.author = input)}
		            />

		            <div>body</div>
		            <textarea
		            	name="body"
		            	type="text"

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
	return {
		postNewComment: (data) => dispatch(postNewComment(data))
	}
}

export default connect(null, mapDispatchToProps)(CommentForm)