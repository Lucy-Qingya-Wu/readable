import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import uuid from 'uuid'
import {connect} from 'react-redux'
import NavigationBar from './NavigationBar'
import {postNewPost, updatePost} from '../actions'


class PostForm extends Component{


	handleSubmit = (e) => {
        e.preventDefault();
		const { history, postId, posts, postNewPost, updatePost} = this.props

		const post = postId ? posts.find(p=>p.id===postId) : null


		if (!this.body.value){
			alert("please fill in comment body")
			return
		}

		if (!this.title.value){
			alert("please fill in comment title")
			return
		}


		if (post){
			console.log("in postform handleSubmit: has post")
			const postEditedInfo = {
				title: this.title.value,
				body: this.body.value
			}
			console.log("in postForm changePost", updatePost)
			updatePost(post.id, postEditedInfo)

			history.push(`/posts/${post.id}`)
		}
		else{
			console.log("in postform handleSubmit: do not post")
			if (!this.category.value){
				alert("please fill in comment category")
				return
			}

			if (!this.author.value){
				alert("please fill in comment author")
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


			postNewPost(newPost)


			history.push("/")
		}

	}
	render(){

		//       id - UUID should be fine, but any unique id will work
		//       timestamp - timestamp in whatever format you like, you can use Date.now() if you like
		//       title - String
		//       body - String
		//       author - String
		//       category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

		const {categories, postId, posts} = this.props
		const post = postId ? posts.find(p=>p.id===postId) : null

		const defaultTitle = post ? post.title : ''
		const defaultBody = post ? post.body : ''

		const title = post ? "Edit Post" : "Add A New Post"


		return (

			<div>
				<NavigationBar />

			    <div className="container">

			      <div className="row">


			        <div className="col-md-8">

					    <h2 className="post-form-title">{title}</h2>
						<div className="card my-4">

							<form onSubmit={this.handleSubmit} className="form-horizontal">

								<div className="form-group">
									<div  className="post-form-label">Title:</div>

									<input

						              name="title"
						              defaultValue={defaultTitle}
						              type="text"
						              className="form-control post-input"
						              ref={input => (this.title = input)}
						            />
						        </div>

					            {!post &&
						            <div className="form-group">
							            <div className="post-form-label">Author:</div>
							            <input
							              className="form-control post-input"
							              name="author"
							              type="text"
							              ref={input => (this.author = input)}
							            />
						            </div>
					        	}

					            <div className="form-group">
					                <div className="post-form-label">Body:</div>
						            <textarea
						                className="form-control post-input"
						                rows="3"
						            	name="body"
						            	type="text"
						            	defaultValue={defaultBody}
						            	ref={input => (this.body = input)}
						            />
					            </div>



								{!post && <div className="form-group">
									<select
										type="select"
										className="form-control post-input"
										ref={input=> (this.category = input)}
									>
										<option value="">Please choose one category</option>
										{categories && categories.map(
											category=>(<option key={category} value={category}>{category}</option>)
										)}
									</select>
								</div>}
								<div className="post-form-option">
					            <button type="submit" className="btn btn-primary btn-sm post-form-btn">Submit</button>

								<Link to={{pathname: '/'}}>
									<button type="button" className="btn btn-primary btn-sm post-form-btn">Cancel</button>
								</Link>
								</div>
							</form>


						</div>
					  </div>
				   </div>
				</div>
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
		postNewPost: (data) => dispatch(postNewPost(data)),
		updatePost: (postId, postEditedInfo) => dispatch(updatePost(postId, postEditedInfo))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)