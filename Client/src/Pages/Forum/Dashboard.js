import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Common/Pagination";
import ListGroup from "../../Components/Forum/ListGroup";
import Posts from "../../Components/Forum/Posts";
import { paginate } from "../../Common/Paginate";
import Jumbotron from "../../Common/Jumbotron";
import axios from "axios";
import AuthService from "../../Services/auth.service";
import Navbar from "../../Components/Navbar";

const Dashboard = () => {
    const [allposts, setAllPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(4);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState({ id: "1", name: "All Posts" });
    const [isLoading, setIsLoading] = useState(true);
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const allpostsResponse = await axios.get("http://localhost:3000/api/posts/");
                const tagsResponse = await axios.get("http://localhost:3000/api/tags/");
                setAllPosts(allpostsResponse.data);
                setTags([
                    { id: "1", name: "All Posts" },
                    ...tagsResponse.data,
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePostDelete = (post) => {
        // Implement post deletion logic here
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        setCurrentPage(1);
    };

    const getPosts = () => {
        const filtered = allposts.filter((post) =>
            post.tags.some((postTag) => postTag.name === selectedTag.name)
        );
        return filtered;
    };

    const filtered = selectedTag.id === "1" ? allposts : getPosts();
    const posts = paginate(filtered, currentPage, pageSize);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (allposts.length === 0) return <p>There are no posts in the database!</p>;

    return (
        <React.Fragment>
            <Navbar />
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
                    <div className="col-3">
                        <ListGroup
                            items={tags}
                            selectedItem={selectedTag}
                            onItemSelect={handleTagSelect}
                        />
                    </div>
                    <div className="col-9">
                        <Posts posts={posts} onDelete={handlePostDelete} />
                    </div>
                </div>
                <Pagination
                    itemCount={filtered.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
