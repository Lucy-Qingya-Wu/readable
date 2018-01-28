import React, {Component} from 'react'
import uuid from 'uuid'
import {connect} from 'react-redux'

import {postNewComment} from '../actions'

class CommentForm extends Component{

	handleSubmit = (e) => {

        e.preventDefault();
		const { history, parentId, postNewComment, postCategory} = this.props


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


		history.push(`/${postCategory}/${parentId}`)


	}

	render(){

		const { parentId } = this.props


		return (
			<div>

	          <div className="card my-4">
	            <h5 className="card-header">Leave a Comment:</h5>
	            <div className="card-body">


					<form onSubmit={this.handleSubmit}>
						<div className="form-group ">
							<div>Author </div>
				            <input
				              name="author"
				              type="text"
				              className="form-control form-control-sm"
				              ref={input => (this.author = input)}
				            />
				        </div>
				        <div className="form-group">
				            <div>Body</div>
				            <textarea rows="3"
				            	name="body"
				            	type="text"
				            	className="form-control"
				            	ref={input => (this.body = input)}
				            />
				        </div>
			            <button type="submit" className="btn btn-primary btn-sm">Submit</button>

					</form>
				</div>
			  </div>
			</div>
		)
	}

}



export default connect(null, {postNewComment})(CommentForm)