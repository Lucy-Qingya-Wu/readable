import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import PostDetail from './PostDetail'
import PostForm from './PostForm'
import Posts from './Posts'

export default class App extends Component {
  render() {
    return (
    	<div>
    		  <Route exact path="/" component={Posts} />

	        <Route exact path="/posts" render={
	          (props)=><Posts />
	        } />

          <Route exact path="/:category" render={
            (props)=><Posts {...props} category={props.match.params.category}/>
          } />

          <Route exact path="/:category/:postId"
            render={
              (props)=><PostDetail {...props} postId={props.match.params.postId} />
            }
          />

          <Route exact path="/posts/comments/:postId"
            render={
              (props)=><PostDetail {...props} postId={props.match.params.postId} />
            }
          />



          <Route exact path="/add/post/new"
            render={
              (props)=><PostForm {...props} />
            }
          />

          <Route exact path="/edit/post/:postId"
            render={
              (props)=><PostForm {...props} postId={props.match.params.postId}/>
            }
          />

    	</div>
    )
  }
}