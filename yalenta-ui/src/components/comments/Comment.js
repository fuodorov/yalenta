import React, { Component } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }

    render() {
        const { comment } = this.props;

        return (
            <div>
                <br/>
                <Card>
                    <Card.Body>
                        <Card.Text>{ comment.text }</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
};

export default Comment;
