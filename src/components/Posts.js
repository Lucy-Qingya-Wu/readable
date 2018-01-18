import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

// import {requestCategories, requestPosts} from '../actions'

import Post from './Post'
import PostForm from './PostForm'
class Posts extends Component{




	// componentDidMount(){
	// 	this.props.dispatch(requestCategories())
	// 	this.props.dispatch(requestPosts())
	// }

	render(){

        const {posts, categories, history} = this.props

        console.log(">>>>>>>>>>>>>>>>>Posts this.props", this.props)

        const allCategories = categories.length > 0 ? categories.map((category)=>
        	<li key={category}><Link to={{pathname : `/${category}/posts`}}>{category}</Link></li>
        ) : null

        const allPosts = posts.length > 0 ?
        posts
        .filter(post => {
                  if (this.props.category) {
                    if (post.category === this.props.category) {
                      return -1
                    }
                  } else {
                    return -1
                  }
                  return null
                })
        .map((post) => {
                  if (!post.deleted)
                    return <Post key={post.id} post={post} history={history}/>
                  return null
                }) : null


		return (
		<div>
			<Link to={{pathname : "/"}}>
				<h1>
					Readable
				</h1>
			</Link>

			<div>

				<h1>Here are the categories:</h1>
				<ul>
				<Link to={{pathname : "/"}}>
					<li key="all">
						all
					</li>
				</Link>
				{allCategories}
				</ul>
			</div>

			<div>
			    <h1>Here are the posts:</h1>
			    <div>
			    	<Link to={{pathname: "/add/post"}}>
			    		<button type="button" >add new post</button>
			    	</Link>


				    <button type="button" >sort by voteScore</button>
				    <button type="button" >sort by timestamp</button>
			    </div>
				{allPosts}
			</div>
		</div>)
	}
}

function mapStateToProps(state, ownProps) {
	console.log(">>>>>>>Posts, state>>>>>>", state)
	console.log(">>>>>>>Posts, ownProps>>>>>>", ownProps)
	const {categories, posts} = state

	return {
		categories,
		posts : posts
		.filter(post=>!post.deleted)
	}

}

export default connect(mapStateToProps)(Posts)
