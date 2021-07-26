import React, { Component } from "react";
import {Container, Button} from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getPosts } from "./PostsActions";
import Post from "./Post";

class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            perPage: 5
        };
    }

    componentDidMount() {
        this.props.getPosts(this.state.currentPage, this.state.perPage);
    }

    onNextPage = () => {
        const { posts } = this.props.posts;
        if (posts.length === this.state.perPage) {
            this.setState(
                state =>({currentPage: state.currentPage + 1}),
                () => {this.props.getPosts(this.state.currentPage, this.state.perPage)}
            );
        }
    }

    onPreviousPage = () => {
        if (this.state.currentPage > 1) {
            this.setState(
                state =>({currentPage: state.currentPage - 1}),
                () => this.props.getPosts(this.state.currentPage, this.state.perPage)
            );
        }
    }

    onSelectPerPage = e => {
        this.setState(
            state => ({ perPage: e.target.value }),
            () => (this.props.getPosts(this.state.currentPage, this.state.perPage))
        );
    }

    render() {
        const { posts } = this.props.posts;

        let items = posts.map(post => {
            return <Post key={post.id} post={post} />;
        });

        return (
            <div>
                <Container>
                    <h2>Latest news</h2>
                    <hr />
                    <select className="form-control" value={this.state.perPage} onChange={this.onSelectPerPage}>
                        <option value={5}>5 posts per page</option>
                        <option value={10}>10 posts per page</option>
                        <option value={20}>20 posts per page</option>
                    </select>
                    { items }
                    <hr />
                    <Button variant="light" size="lg" onClick={this.onPreviousPage}>Previous</Button>
                    <Button variant="light" size="lg" onClick={this.onNextPage}>Next</Button>
                    <Button variant="light" size="lg" onClick={this.onNextPage} style={{float: 'right'}}>{this.state.currentPage}</Button>
                </Container>
            </div>
        );
    }
}

PostsList.propTypes = {
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    posts: state.posts
});

export default connect(mapStateToProps, {
    getPosts
})(withRouter(PostsList));