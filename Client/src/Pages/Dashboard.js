import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";
import ListGroup from "../Components/ListGroup";
import Posts from "../Components/Posts";
import { paginate } from "../Common/Paginate";
import Jumbotron from "../Common/Jumbotron";
import axios from "axios";
import AuthService from "../Services/auth.service";

const Dashboard = () => {
    const [allposts, setAllPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(4);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState({ _id: "1", name: "All Posts" });

    const user = AuthService.getCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allpostsResponse = await axios.get("http://localhost:3000/api/posts/");
                const tagsResponse = await axios.get("http://localhost:3000/api/tags/");

                setAllPosts(allpostsResponse.data);
                setTags([
                    {
                        _id: "1",
                        name: "All Posts",
                    },
                    ...tagsResponse.data,
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        // Clean-up function
        return () => {
            // Any cleanup code goes here
        };
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePostDelete = (post) => {
        // Handle post deletion logic
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        setCurrentPage(1);
    };

    const getPosts = () => {
        const filtered = allposts.filter((post) =>
            post.tags.some((postTag) => postTag.name === selectedTag.name)
        );
        console.log(filtered);
        return filtered;
    };

    const filtered = selectedTag._id === "1" ? allposts : getPosts();
    const posts = paginate(filtered, currentPage, pageSize);

    if (allposts.length === 0) return <p>There are no posts in the database!</p>;

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
                        <Posts posts={posts} onDelete={handlePostDelete} />
                    </div>
                    <div className="col-3">
                        <ListGroup
                            items={tags}
                            selectedTag={selectedTag}
                            onTagSelect={handleTagSelect}
                        />
                    </div>
                    <Pagination
                        itemCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
