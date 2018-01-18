import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import uuid from 'uuid'
import {connect} from 'react-redux'

import {postNewPost} from '../actions'


class PostForm extends Component{


	handleSubmit = (e) => {
        e.preventDefault();
		const { history, post, postNewPost} = this.props

		console.log("im in PostForm handleSubmit")
		console.log("this.props: ", this.props)


		if (!this.author.value){
			alert("please fill in comment author")
			return
		}

		if (!this.body.value){
			alert("please fill in comment body")
			return
		}

		if (!this.title.value){
			alert("please fill in comment title")
			return
		}

		if (!this.category.value){
			alert("please fill in comment category")
			return
		}

	    //       id - UUID should be fine, but any unique id will work
	    //       timestamp - timestamp in whatever format you like, you can use Date.now() if you like
	    //       title - String
	    //       body - String
	    //       author - String
	    //       category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.


		const newPost = {

			id: uuid(),
			title: this.title.value,
			timestamp: Date.now(),
			body: this.body.value,
			author: this.author.value,
			category: this.category.value

		}
		console.log("im here")

		postNewPost(newPost)
		console.log("im there")

		history.push("/")


	}
	render(){

		//       id - UUID should be fine, but any unique id will work
		//       timestamp - timestamp in whatever format you like, you can use Date.now() if you like
		//       title - String
		//       body - String
		//       author - String
		//       category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

		const {defaultCategory, categories, post} = this.props
		console.log("in PostForm: this.props", this.props)



		return (
			<div>
				<h1>Add new post</h1>

				<form onSubmit={this.handleSubmit}>


					<div>title</div>
					<input
		              name="title"
		              type="text"
		              ref={input => (this.title = input)}
		            />
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

		            <div></div>

					<select
						type="select"
						defaultValue={defaultCategory}
						ref={input=> (this.category = input)}
					>
						<option value="">Please choose one category</option>
						{categories && categories.map(
							category=>(<option key={category} value={category}>{category}</option>)
						)}
					</select>

		            <div>
		            	<input type="submit" />
		            </div>

				</form>

				<Link to={{pathname: '/'}}>
					<button type="button" >Cancel</button>
				</Link>

			</div>)
	}
}

function mapStateToProps(state, ownProps){
	const {categories, posts} = state
	return {
		categories,
		posts
	}
}

function mapDispatchToProps(dispatch){
	return {
		postNewPost: (data) => dispatch(postNewPost(data))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)