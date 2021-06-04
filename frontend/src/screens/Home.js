import React from 'react';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import CardView from '../components/CardView';

const Home = () => {
    return (
        <Container>
            <Row>
                <Col md={3}></Col>
                <Col md={6}>
                    <Row style={{ marginTop: "120px" }}>

                        <LinkContainer to="/createPost" style={{ background: "#9e9e9e", fontSize: 30, fontWeight: 'bold', borderRadius: 30, borderColor: '#616161', boxShadow: '2px 2px 2px #bdbdbd' }}>
                            <Button variant="success" size="lg" block >
                                Create New Post
                        </Button>
                        </LinkContainer>
                    </Row>
                    <Row>
                        <CardView />
                    </Row>
                </Col>
                <Col md={3}></Col>
            </Row >
        </Container >
    )
};

export default Home;
