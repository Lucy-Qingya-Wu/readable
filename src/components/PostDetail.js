import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import CommentForm from './CommentForm'

class PostDetail extends Component{

	render(){


		const {posts, postId, history} = this.props


        const post = posts.length > 0 ?

        posts.find(post=>post.id === postId) : null

        //console.log("post----", post)

		return (
			<div>
				<Link to={{pathname : "/"}}>
					<h1>
						Readable
					</h1>
				</Link>


				{post &&
						(

							<div>
								<h1>PostDetail</h1>

								<Post key={post.id}  history={history} post={post} />

								<h1>Comments</h1>

								<CommentForm parentId={post.id} history={history}  />

								{post.comments.map(c=><Comment history={history} key={c.id} comment={c} />)}

							</div>
						)

				}


				{!post && (<p>Sorry, this post does not exist.</p>)}

			</div>

		)
	}
}

function mapStateToProps(state, ownProps) {

	const {posts, comments} = state

	return {

		posts : posts
		.filter(post=>!post.deleted)
		.map(post=>
				({
					...post,
		            comments: post.comments.map(key=>comments[key]).filter(c=>!c.deleted)


				})
		)
	}

}

export default connect(mapStateToProps)(PostDetail)