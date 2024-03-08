import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";
import ListGroup from "../Components/ListGroup";
import Posts from "../Components/Posts";
import { paginate } from "../Common/Paginate";
// import { api } from "../config.js";
import http from "../Services/http.service";
import Jumbotron from "../Common/Jumbotron";
import axios from "axios";

class Dashboard extends Component {
    state = {
        allposts: [],
        currentPage: 1,
        pageSize: 4,
        tags: [],
        selectedTag: { _id: "1", name: "All Posts" },
    };
    async componentDidMount() {
        const allpostsResponse = await axios.get('http://localhost:3000/api/posts/');
        const allposts = allpostsResponse.data;

        const tagsResponse = await axios.get('http://localhost:3000/api/tags/');
        const tags = tagsResponse.data;

        this.setState({
            allposts: [...allposts],
            tags: [
                {
                    _id: "1",
                    name: "All Posts",
                },
                ...tags,
            ],
        });
    }
    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };
    handlePostDelete = (post) => {};
    handleTagSelect = (tag) => {
        this.setState({ selectedTag: tag, currentPage: 1 });
    };
    getPosts() {
        const { allposts, selectedTag } = this.state;
        const filtered = [];
        for (let i in allposts) {
            const post = allposts[i];
            const { tags } = post;
            for (let j in tags) {
                if (tags[j].name === selectedTag.name) {
                    filtered.push(post);
                    break;
                }
            }
        }
        console.log(filtered);
        return filtered;
    }
    render() {
        const { user } = this.props;
        const { allposts, pageSize, currentPage, tags, selectedTag } = this.state;
        const filtered = selectedTag._id === "1" ? allposts : this.getPosts();
        const posts = paginate(filtered, currentPage, pageSize);
        if (allposts.length === 0)
            return <p>There are no posts in the database!</p>;
        return (
            <React.Fragment>
                <Jumbotron />
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex w-100 justify-content-between m-3">
                                Showing {filtered.length} posts.
                                {user && (
                                    <Link to="/new-post">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            style={{ marginBottom: 20 }}
                                        >
                                            New Post
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            <Posts posts={posts} onDelete={this.handlePostDelete} />
                        </div>
                        <div className="col-3">
                            <ListGroup
                                items={tags}
                                selectedTag={this.state.selectedTag}
                                onTagSelect={this.handleTagSelect}
                            />
                        </div>
                        <Pagination
                            itemCount={filtered.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
