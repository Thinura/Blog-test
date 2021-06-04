import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom"
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../Notification';
import Loader from '../Loader';

import { listPosts } from '../../actions/postActions';
import './index.css';

const CardView = () => {

    const dispatch = useDispatch()
    let history = useHistory()

    const postList = useSelector(state => state.postList)

    const { loading, error, post } = postList
    console.log(post)
    const postView = (id) => {
        history.push(`/post/${id}`)
    }

    useEffect(() => {
        dispatch(listPosts())
    }, [dispatch])

    return (
        <>
            {
                loading ? <Loader /> :
                    error ? <Notification variant='danger' style={{ width: "100%" }}>{error}</Notification>
                        : (
                            post.map(postItem => (
                                <Card key={postItem._id} className="card-main" >
                                    <Card.Header className="card-title" style={{ backgroundColor: postItem.titleColor }}><b>{postItem.title}</b></Card.Header>
                                    <Card.Body>
                                        <Card.Text>{postItem.description}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Row>
                                            <Col md={9}>
                                                <small className="text-muted">Comment</small>
                                            </Col>
                                            <Col md={3}>
                                                <Button
                                                    style={{ background: "#9e9e9e", borderColor: '#616161' }}
                                                    onClick={() => postView(postItem._id)}
                                                >View</Button>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            ))
                        )
            }
        </>
    )
};

export default CardView;
