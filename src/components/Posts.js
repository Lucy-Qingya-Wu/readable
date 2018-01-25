import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Post from './Post'
import sortby from 'sort-by'
class Posts extends Component{
	constructor(props){
		super(props)
		this.state = {
			sort:""
		}
	}
	setSort = (value) => {
		if (this.state.sort === value){
			this.setState({sort: "-" + value})
		}else{
			this.setState({sort:value})
		}
	}
	render(){

		const {posts, categories, history} = this.props

        const allCategories = categories.length > 0 ? categories.map((category)=>
        	<li key={category}><Link to={{pathname : `/${category}/posts`}}>{category}</Link></li>
        ) : null


        const allPosts = posts.length > 0 ?
        posts
        .filter(post => {
                  if (this.props.category) {
                    if (post.category === this.props.category) {
                      return true
                    }
                    else{
                    	return false
                    }
                  }
                  return true
                })
        .sort(sortby(this.state.sort))
        .map((post) => {

        	return (<Post key={post.id} post={post} history={history}/>)
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


				    <button type="button" onClick={()=>this.setSort("voteScore")}>sort by voteScore</button>
				    <button type="button" onClick={()=>this.setSort("timestamp")}>sort by timestamp</button>
			    </div>

				{allPosts}

			</div>

			</div>
		)
	}

}

function mapStateToProps(state, ownProps) {


	const {categories, posts} = state

	return {
		categories,
		posts : posts
		.filter(post=>!post.deleted)
	}

}

export default connect(mapStateToProps)(Posts)