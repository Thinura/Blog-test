import {
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_CREATE_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    POST_DETAILS_FAIL,
    POST_LIST_FAIL,
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_COMMENT_REQUEST,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAIL,
    POST_COMMENT_RESET,
    POST_COMMENT_DETAILS_REQUEST,
    POST_COMMENT_DETAILS_SUCCESS,
    POST_COMMENT_DETAILS_FAIL,
    POST_COMMENT_DETAILS_RESET
} from '../constants/postConstant';

export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_CREATE_REQUEST:
            return { loading: true }
        case POST_CREATE_SUCCESS:
            return { loading: false, success: true, post: action.payload }
        case POST_CREATE_FAIL:
            return {}
        default:
            return state
    }
}

export const postDetailsReducer = (state = { post: {} }, action) => {
    switch (action.type) {
        case POST_DETAILS_REQUEST:
            return { loading: true, ...state }
        case POST_DETAILS_SUCCESS:
            return { loading: false, post: action.payload }
        case POST_DETAILS_FAIL:
            return { loading: false, post: action.payload }
        default:
            return state
    }
}

export const postListReducer = (state = { post: [] }, action) => {
    switch (action.type) {
        case POST_LIST_REQUEST:
            return { loading: true, post: [] }
        case POST_LIST_SUCCESS:
            return { loading: false, post: action.payload }
        case POST_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const postCommentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_COMMENT_REQUEST:
            return { loading: true }
        case POST_COMMENT_SUCCESS:
            return { loading: false, success: true }
        case POST_COMMENT_FAIL:
            return { loading: false, error: action.payload }
        case POST_COMMENT_RESET:
            return {}
        default:
            return state
    }
}


export const postCommentDetailsReducer = (state = { post: {} }, action) => {
    console.log("")
    switch (action.type) {
        case POST_COMMENT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case POST_COMMENT_DETAILS_SUCCESS:
            return { loading: false, post: action.payload }
        case POST_COMMENT_DETAILS_FAIL:
            return { loading: false, post: action.payload }
        case POST_COMMENT_DETAILS_RESET: {
            return { loading: true, post: {} }
        }
        default:
            return state
    }
}