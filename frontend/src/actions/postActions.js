import axios from 'axios';

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
    POST_COMMENT_DETAILS_REQUEST,
    POST_COMMENT_DETAILS_SUCCESS,
    POST_COMMENT_DETAILS_FAIL,
    POST_COMMENT_DETAILS_RESET
} from './../constants/postConstant';


const { REACT_APP_SERVER_URL } = process.env;

export const createPost = (
    title,
    description,
    titleColor,
) => async (dispatch) => {
    try {
        dispatch({ type: POST_CREATE_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        }

        const { data } = await axios.post(`${REACT_APP_SERVER_URL}/post/create`,
            {
                title,
                description,
                titleColor,
            },
            config
        )

        dispatch({
            type: POST_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listPosts = () => async (dispatch) => {
    try {
        dispatch({
            type: POST_LIST_REQUEST,
        })


        const { data } = await axios.get(`${REACT_APP_SERVER_URL}/post/all`)

        dispatch({
            type: POST_LIST_SUCCESS,
            payload: data.posts.post,
        })
    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getPostById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: POST_DETAILS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        }
        console.log("asdsa")

        const { data } = await axios.get(
            `${REACT_APP_SERVER_URL}/post/${id}`,
            config
        )
        dispatch({
            type: POST_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const createPostComment = (data) => async (dispatch) => {
    try {
        dispatch({
            type: POST_COMMENT_REQUEST,
        })

        console.log(data)

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        await axios.post(`${REACT_APP_SERVER_URL}/post/comment/${data._id}`, data, config)

        dispatch({
            type: POST_COMMENT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: POST_COMMENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getPostComment = (id) => async (dispatch) => {
    try {
        dispatch({
            type: POST_COMMENT_DETAILS_REQUEST,
        })


        const { data } = await axios.get(`${REACT_APP_SERVER_URL}/post/comment/${id}`)
        console.log(data)

        dispatch({
            type: POST_COMMENT_DETAILS_SUCCESS,
            payload: data.response
        })
    } catch (error) {
        dispatch({
            type: POST_COMMENT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}