import React, { Component } from 'react';
import {Route} from 'react-router-dom'


import Posts from './Posts'
import PostDetail from './PostDetail'
import CommentForm from './CommentForm'
import PostForm from './PostForm'
class App extends Component {
  render() {
    return (
      <div className="App">


        <Route exact path="/" component={Posts} />
        <Route exact path="/posts" render={
          (props)=><Posts {...props}/>
        } />


        <Route exact path="/:category/posts" render={
          (props)=><Posts {...props} category={props.match.params.category}/>
        } />


        <Route exact path="/posts/:id"
        	render={
        		(props)=><PostDetail {...props} id={props.match.params.id} />
        	}
        />

        <Route exact path="/posts/comments/:id"
        	render={
	    		  (props)=><PostDetail {...props} id={props.match.params.id} />
        	}
        />


        <Route exact path="/comments/add/:parentId" render={(props) => (
          <CommentForm {...props} parentId={props.match.params.parentId} />
        )}/>


        <Route exact path="/add/post" render={(props) => (
          <PostForm {...props} />
        )}/>

        <Route exact path="/comments/edit/:id" render={(props) => (
          <PostForm {...props} commentId={props.match.params.id}/>
        )}/>

      </div>
    )
  }
}

export default App;
