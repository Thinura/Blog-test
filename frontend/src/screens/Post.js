import React, { useState } from 'react';
import {
    Form,
    Button,
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../components/Notification';
import Loader from '../components/Loader';

import { createPost } from '../actions/postActions';

const Post = () => {
    const dispatch = useDispatch()
    let history = useHistory()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [titleColor, setTitleColor] = useState("")

    const postCreate = useSelector(state => state.postCreate)
    const { loading, success, error } = postCreate

    const submitHandler = (e) => {
        dispatch(createPost(
            title,
            description,
            titleColor
        ))
        e.preventDefault()
        history.push('/')
    }

    return (
        <Container style={{ marginBottom: "100px", marginTop: "20px" }}>
            {loading && <Loader />}
            {error && <Notification variant='danger'>{error}</Notification>}
            {success && <Notification variant='danger'>{success}</Notification>}
            <Form onSubmit={submitHandler} style={{ marginTop: "120px" }}>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <h3 className="text-center mb-3">Create Post</h3>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="title"
                                placeholder="Enter title name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                required
                                type="description"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col md={6}>
                                    <Form.Label>Title Color</Form.Label>
                                </Col>
                                <Col md={6}>
                                    <Button
                                        className="mr-2"
                                        style={{ padding: "20px", backgroundColor: "#42a5f5", borderColor: '#616161' }}
                                        onClick={() => setTitleColor("#42a5f5")}
                                    ></Button>
                                    <Button
                                        className="mr-2"
                                        style={{ padding: "20px", backgroundColor: "#ffee58", borderColor: '#616161' }}
                                        onClick={() => setTitleColor("#ffee58")}
                                    ></Button>
                                    <Button
                                        style={{ padding: "20px", backgroundColor: "#ef5350", borderColor: '#616161' }}
                                        onClick={() => setTitleColor("#ef5350")}
                                    ></Button>
                                </Col>
                                <Button className="mt-3" size="lg" block type="submit" variant="success" style={{ borderRadius: 30, borderColor: '#616161', boxShadow: '2px 2px 2px #bdbdbd', background: "#9e9e9e", fontSize: 30, fontWeight: 'bold' }}>Publish</Button>
                            </Row>
                        </Form.Group>
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </Form>
        </Container>
    )
};

export default Post;