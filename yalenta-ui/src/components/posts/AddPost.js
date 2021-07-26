import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {Button, Form, Container, Card} from "react-bootstrap";
import { addPost } from "./PostsActions";

class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            text: "",
            image: null
        };
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onImageChange = e => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    onAddClick = () => {
        let post = new FormData();
        post.append('title', this.state.title);
        post.append('text', this.state.text);
        if (this.state.image) {
            post.append('image', this.state.image, this.state.image.name);
        }
        this.props.addPost(post);
    };

    render() {
        return (
            <div>
                <Container>
                    <h2>Add new post</h2>
                    <hr />
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="contentId">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={1}
                                        name="title"
                                        placeholder="Title news"
                                        value={this.title}
                                        onChange={this.onChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Write the title of the news item here
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="contentId">
                                    <Form.Label>Text</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="text"
                                        placeholder="Text news"
                                        value={this.text}
                                        onChange={this.onChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Write the text of the news item here
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="contentId">
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={this.onImageChange}
                                    />
                                    <Form.Text className="text-muted">
                                        Select a picture for the news
                                    </Form.Text>
                                </Form.Group>
                            </Form>
                            <Button href="/" variant="primary" type="submit" onClick={this.onAddClick}>
                                Add News
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        );
    }
}

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addPost })(withRouter(AddPost));