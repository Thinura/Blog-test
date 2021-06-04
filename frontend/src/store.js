import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    postCreateReducer,
    postDetailsReducer,
    postListReducer,
    postCommentCreateReducer,
    postCommentDetailsReducer
} from './reducers/postReducers';

const reducer = combineReducers({
    postCreate: postCreateReducer,
    postDetails: postDetailsReducer,
    postList: postListReducer,
    postCommentCreate: postCommentCreateReducer,
    postCommentDetails: postCommentDetailsReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;