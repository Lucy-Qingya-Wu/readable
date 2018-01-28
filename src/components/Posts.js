import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Post from './Post'
import sortby from 'sort-by'
import NavigationBar from './NavigationBar'
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
        	<li key={category}><Link to={{pathname : `/${category}`}}>{category}</Link></li>
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
				<NavigationBar />

			    <div className="container">

			      <div className="row">


			        <div className="col-md-8">


			        	<Link to={{pathname: "/add/post/new"}}>
					    	<button type="button" className="btn btn-primary btn-sm main-option">

						    		add new post

					    	</button>

					    </Link>

					    <button type="button" className="btn btn-primary btn-sm main-option" onClick={()=>this.setSort("voteScore")}>sort by voteScore</button>
					    <button type="button" className="btn btn-primary btn-sm main-option" onClick={()=>this.setSort("timestamp")}>sort by timestamp</button>



						{allPosts}

					</div>

					<div className="col-md-4">



			          <div className="card my-4">
			            <h5 className="card-header">Categories</h5>
			            <div className="card-body">
			              <div className="row">
			                <div className="col-lg-6">
			                  <ul className="list-unstyled mb-0">

									<li key="all">
										<Link to={{pathname : "/"}}>
											all
										</Link>
									</li>


									{allCategories}
			                  </ul>
			                </div>
			              </div>
			            </div>
			          </div>

					</div>
		      </div>


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