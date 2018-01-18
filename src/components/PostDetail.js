import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Post from './Post'
import Comment from './Comment'
import CommentForm from './CommentForm'

class PostDetail extends Component{
	render(){
		console.log(">>>>>>PostDetail this.props>>>>>>>>>>>>>>>>", this.props)

		const {posts, id, dispatch, history, match} = this.props


        const post = posts.length > 0 ?
        posts.filter(post=>post.id === id) : []

        console.log("post!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", post)

		return (
			<div>
				<Link to={{pathname : "/"}}>
					<h1>
						Readable
					</h1>
				</Link>


				{post.length > 0 && (
				<div>
					<h1>PostDetail</h1>
					{post.map(p=><Post key={p.id}  history={history} post={p} />)}

					<h1>Comments</h1>

					<CommentForm parentId={id} history={history}  />

					{post.map(p=>{
						return p.comments.map(c=><Comment history={history} key={c.id} comment={c} />)
					})}
				</div>)}


				{post.length < 1 && (<p>Sorry, this post does not exist.</p>)}

			</div>

		)
	}
}

function mapStateToProps(state, ownProps) {
	console.log(">>>>>>>>>PostDetail state>>>>>>>>>>", state)
	console.log(">>>>>>>>>>>PostDetail ownProps>>>>>>>>", ownProps)


	const {posts, comments} = state

	return {

		posts : posts
		.filter(post=>!post.deleted)
		.map(post=>
				{
		            // add comments info to each post
					const commentsInfo = post.comments.map(key=>
						comments.filter(c=>c.id === key && !c.deleted)
					)

					return {
						...post,
						comments: [].concat(...commentsInfo)
					}
				}
		)
	}

}

export default connect(mapStateToProps)(PostDetail)
