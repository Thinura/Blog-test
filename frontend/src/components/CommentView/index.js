import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import './index.css';

const CommentView = (comments) => {
    return (
        <>
            <Card.Footer>
                <Row>
                    <Col className="col-comment" >
                        {JSON.stringify(comments.comments.count)} Comments
                    </Col>
                </Row>
            </Card.Footer>

            <Card.Body>
                {comments.comments.comment.map((item, index) => (
                    <Row key={`comment_${index}`} className="row-comment" style={{ marginLeft: 1 }}>
                        <Card.Text className="text-comment" >{item.comment}</Card.Text>
                    </Row>
                ))
                }
            </Card.Body>
        </>
    )
};

export default CommentView;
