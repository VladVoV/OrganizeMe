import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import { PersonCircle, HandThumbsUpFill } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import PostReply from "./CreateReply";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthService from "../../Services/auth.service";

const PostPage = () => {
    const user = AuthService.getCurrentUser();
    const [post, setPost] = useState({
        description: "",
        title: "",
        tags: [],
        author: [],
        upvotes: [],
        views: 0,
    });
    const [replies, setReplies] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await axios.get(`http://localhost:3000/api/posts/${id}`);
                const repliesResponse = await axios.get(`http://localhost:3000/api/replies/${id}`);

                setPost(postResponse.data);
                setReplies(repliesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        return () => {
            // Any cleanup code goes here
        };
    }, [id]);

    const checkLike = () => {
        return user && post.upvotes && post.upvotes.includes(user._id);
    };

    const checkReplyLike = (id) => {
        return user && replies.some((reply) => reply._id === id && reply.upvotes.includes(user._id));
    };

    const handleUpvote = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/posts/like/${id}`, {});
            const updatedPost = response.data[0];
            setPost(updatedPost);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error("You can't upvote your own post!");
            }
        }
    };

    const handleReplyUpvote = async (replyId) => {
        try {
            await axios.put(`http://localhost:3000/api/replies/like/${replyId}`, {});
            const { data: updatedReplies } = await axios.get(`http://localhost:3000/api/replies/${id}`);
            setReplies(updatedReplies);
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error("You can't upvote your own reply!");
            }
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="container col-lg-6 shadow-lg p-3 mt-5 bg-body rounded">
                <h2>{post.title}</h2>
                <p className="mt-4" style={{ color: "#505050" }}>
                    {post.description}
                </p>
                <div className="mt-1">
                    Related Topics:
                    {post.tags &&
                        post.tags.map((tag) => (
                            <span key={tag.name} className="badge badge-success m-1 p-2">
                {tag.name}
              </span>
                        ))}
                    <div className="d-flex w-100 justify-content-between mt-3 mb-3">
                        <button
                            disabled={!user}
                            className={checkLike() ? "btn btn-primary" : "btn btn-outline-primary"}
                            onClick={handleUpvote}
                        >
                            <HandThumbsUpFill className="mr-2" />
                            {(post.upvotes && post.upvotes.length) || 0}
                        </button>
                        <p>{post.views} Views</p>
                    </div>
                    <div className="d-flex w-100 justify-content-between" style={{ color: "#505050" }}>
                        <div>
                            <PersonCircle size={30} className="mr-2" />
                            Posted by {(post.author && post.author.username) || ""}
                        </div>
                        <p className="mb-1">
                            <Moment fromNow>{post.time}</Moment>
                        </p>
                    </div>
                </div>
            </div>
            {user && <PostReply id={id} />}
            <div className="container col-lg-6 shadow-lg p-3 mt-5 bg-body rounded">
                Showing {replies.length} replies
            </div>
            <div>
                {replies.map((reply) => (
                    <div key={reply._id} className="container col-lg-6 shadow-lg p-3 mt-3 bg-body rounded">
                        <div className="ml-4">
                            <PersonCircle size={30} className="mr-3" />
                            Posted by {reply.author.username}
                        </div>
                        <div className="m-4">{reply.comment}</div>
                        <div className="d-flex w-100 justify-content-between mt-3 mb-3">
                            <button
                                className={
                                    checkReplyLike(reply._id) ? "btn btn-primary" : "btn btn-outline-primary"
                                }
                                disabled={!user}
                                onClick={() => handleReplyUpvote(reply._id)}
                            >
                                <HandThumbsUpFill className="mr-2" />
                                {reply.upvotes.length}
                            </button>
                            <p className="mb-1" style={{ color: "#505050" }}>
                                <Moment fromNow>{reply.time}</Moment>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostPage;
