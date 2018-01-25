import React from 'react';
import ReactDOM from 'react-dom';


import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk'

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import {createStore, applyMiddleware, compose} from 'redux'


import rootReducer from './reducers'

import App from './components/App';
import './index.css';

import {requestCategories, requestPosts} from './actions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const logger = store => next => action => {
// 	console.log("action.type: ", action.type)
// 	console.log('dispatching', action)
// 	let result = next(action)
// 	console.log('next state', store.getState())

// 	console.log("result", result)
// 	return result
// }

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
)

store.dispatch(requestCategories())
store.dispatch(requestPosts())


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    	<App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();