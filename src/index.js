import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk'

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';


import {createStore, applyMiddleware, compose} from 'redux'

import rootReducer from './reducers'
import {requestCategories, requestPosts} from './actions'


const logger = store => next => action => {
	console.log("action.type: ", action.type)
	console.log('dispatching', action)
	let result = next(action)
	console.log('next state', store.getState())

	console.log("result", result)
	return result
}




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(logger, thunk))
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




