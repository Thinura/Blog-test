import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Button, Card, Col, Row, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Notification from './../components/Notification';
import Loader from './../components/Loader';
import CommentView from './../components/CommentView'
import { getPostById, createPostComment, getPostComment, getResetCommentDetails } from './../actions/postActions';
import './index.css';

const PostDetail = () => {

    const [comment, setComment] = useState("")
    const dispatch = useDispatch()

    const { id } = useParams()

    const postCommentCreate = useSelector(state => state.postCommentCreate)
    const { loading: loadingUpdate, error: errorUpdate, success } = postCommentCreate

    const postCommentDetails = useSelector(state => state.postCommentDetails)
    const { loading, error, post } = postCommentDetails

    useEffect(() => {

        if (post && Object.keys(post).length === 0 && post.constructor === Object) {
            console.log("post details Id ", id)

            dispatch(getPostComment(id))
        }
    }, [dispatch, id]);

    const submitHandler = (e) => {
        dispatch(createPostComment(
            {
                _id: id,
                comment,
            }
        ))
        e.preventDefault()
        setComment("")
    }

    useEffect(() => {
        return () => {
            dispatch(getResetCommentDetails())
            console.log("post componenetwillUnmount", post)


        };
    }, [])

    console.log("post ", post)
    return (
        <Container style={{ marginTop: "120px" }}>
            {loading && <Loader />}
            {error && <Notification variant='danger'>{error}</Notification>}
            {loadingUpdate && <Loader />}
            {errorUpdate && <Notification variant='danger'>{errorUpdate}</Notification>}
            {loading && <Loader />}
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    {success && (
                        <Notification variant='success'>
                            Review submitted successfully
                        </Notification>
                    )}
                    {
                        loading ? <Loader /> :
                            error ? <Notification variant='danger'>{error}</Notification>
                                : (
                                    <Card key={post._id} style={{ width: '100%', marginBottom: "20px", marginTop: "20px", borderColor: '#616161' }}>
                                        <Card.Header className="text-center" style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}><b>{post.title}</b></Card.Header>
                                        <Card.Body>
                                            <Card.Text>{post.description}</Card.Text>
                                        </Card.Body>
                                        {
                                            !(post && Object.keys(post).length === 0 && post.constructor === Object) ?
                                                <CommentView comments={post.comments} /> : <></>
                                        }
                                        <Container>
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Add Comment</Form.Label>
                                                    <Form.Control
                                                        required
                                                        type="comment"
                                                        placeholder="Enter Comment"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>
                                                <Button className="mr-3 mb-3" size="lg" block type="submit" variant="success" style={{ fontWeight: 'bold', fontSize: 22, background: "#9e9e9e", borderColor: '#616161' }}>Comment</Button>
                                            </Form>
                                        </Container>
                                    </Card>
                                )
                    }
                </Col>
                <Col md={3}></Col>
            </Row>
        </Container>
    )
}

export default PostDetail;
