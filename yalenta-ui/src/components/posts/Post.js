import React, { Component } from "react";
import {Card, Button, Modal, Form, InputGroup, FormControl, Accordion} from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deletePost, updatePost, getComments, addComment } from "./PostsActions";
import Comment from "../comments/Comment";

const styles = {
    cardImage: {
        objectFit: 'cover',
        height: '339px'
    }
}

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            text: "",
            image: null,
            comment_text: "",
        };
    }

    componentDidMount() {
        this.props.getComments();
    }

    onDeleteClick = () => {
        const { post } = this.props;
        this.props.deletePost(post.id)
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onImageChange = e => {
        this.setState({ [e.target.name]: e.target.files[0] });
    };

    onUpdateClick = () => {
        const { post } = this.props;
        let up_post = new FormData();
        if (this.state.title) {
            up_post.append('title', this.state.title);
        } else {
            up_post.append('title', post.title);
        }
        if (this.state.text) {
            up_post.append('text', this.state.text);
        } else {
            up_post.append('text', post.text);
        }
        if (this.state.image) {
            up_post.append('image', this.state.image, this.state.image.name);
        }
        this.props.updatePost(post.id, up_post);
        this.setState({ isOpen: false });
    };

    onAddCommentClick = () => {
        const { post } = this.props;
        let comment = new FormData();
        comment.append('text', this.state.comment_text);
        comment.append('post', post.id);
        this.props.addComment(comment);
    };

    state = {
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render() {
        const { isAuthenticated } = this.props.auth;
        const { post } = this.props;
        const { comments } = this.props.comments;

        const dateFormat = require("dateformat");
        const pub_date = new Date(post.pub_date);
        const mask_date = "dddd mmmm dS yyyy, HH:MM";

        let comments_items = comments.map(comment => {
            if (comment.post === post.id) {return <Comment key={comment.id} comment={comment} />;}
            else {return null;}
        });

        return (
            <div>
                <hr />
                <Card>
                    {post.image && <Card.Img variant="top" src={post.image} style={styles.cardImage}/>}
                    <Card.Body>
                        <Card.Title>{ post.title }</Card.Title>
                        <Card.Text>{ post.text }</Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        { dateFormat(pub_date, mask_date) }
                        {isAuthenticated &&
                        <div style={{float: 'right'}}>
                            <Button variant="light" size="sm" onClick={this.openModal}>
                                Update
                            </Button>{" "}

                            <Modal show={this.state.isOpen} onHide={this.closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Update post</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group controlId="contentId">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={1}
                                                name="title"
                                                placeholder={post.title}
                                                value={this.title}
                                                onChange={this.onChange}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="contentId">
                                            <Form.Label>Text</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="text"
                                                placeholder={post.text}
                                                value={this.text}
                                                onChange={this.onChange}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="contentId">
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={this.onImageChange}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.closeModal}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={this.onUpdateClick}>
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Button variant="secondary" size="sm" onClick={this.onDeleteClick}>
                                Delete
                            </Button>
                        </div>
                        }
                        {isAuthenticated &&
                        <Accordion defaultActiveKey="0">
                            <hr />
                            <InputGroup className="mb-3">
                                <InputGroup.Append>
                                    <Accordion.Toggle as={Button} variant="outline-secondary" eventKey="1">
                                        Show
                                    </Accordion.Toggle>
                                </InputGroup.Append>
                                <FormControl
                                    as="textarea"
                                    rows={1}
                                    name="comment_text"
                                    placeholder="Comment"
                                    value={this.comment_text}
                                    onChange={this.onChange}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={this.onAddCommentClick}>Post</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>{comments_items}</Card.Body>
                            </Accordion.Collapse>
                        </Accordion>
                        }
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}

Post.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    getComments: PropTypes.func.isRequired,
    comments: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    comments: state.comments,
});

export default connect(mapStateToProps, { deletePost, updatePost, getComments, addComment })(withRouter(Post));
