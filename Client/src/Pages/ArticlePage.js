import React, { useEffect, useState } from 'react';
import authService from '../Services/auth.service';
import axios from 'axios';
import {Modal, Button, Form} from 'react-bootstrap';
import Navbar from "../Components/Navbar";

const ArticlesPage = () => {
    const [articles, setArticles] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: null,
        isEditMode: false,
        editId: null,
    });

    useEffect(() => {
        const user = authService.getCurrentUser();
        setCurrentUser(user);

        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/api/articles');
            setArticles(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteArticle = async (id) => {
        try {
            await axios.delete(`/api/articles/${id}`);
            await fetchArticles();
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenModal = (isEditMode = false, article = null) => {
        setFormData({
            title: isEditMode ? article.title : '',
            content: isEditMode ? article.content : '',
            image: null,
            isEditMode,
            editId: isEditMode ? article._id : null,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            title: '',
            content: '',
            image: null,
            isEditMode: false,
            editId: null,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('content', formData.content);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            if (formData.isEditMode) {
                await axios.put(`/api/articles/${formData.editId}`, formDataToSend);
            } else {
                await axios.post('/api/articles', formDataToSend);
            }
            handleCloseModal();
            fetchArticles();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="container">
                <h1>Articles</h1>
                {currentUser && currentUser.roles.includes('ROLE_MODERATOR') && (
                    <Button variant="primary" onClick={() => handleOpenModal()}>
                        Create Article
                    </Button>
                )}
                {articles.map((article) => (
                    <div key={article._id} className="card mb-3">
                        <div className="card-body">
                            {article.image && article.image.data && (
                                <img
                                    src={`data:${article.image.contentType};base64,${article.image.data}`}
                                    alt={article.title}
                                    className="img-fluid"
                                />
                            )}
                            <h5 className="card-title">{article.title}</h5>
                            <p className="card-text">{article.content}</p>
                            {currentUser && currentUser.roles.includes('ROLE_MODERATOR') && (
                                <>
                                    <Button
                                        variant="warning"
                                        onClick={() => handleOpenModal(true, article)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteArticle(article._id)}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                ))}

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{formData.isEditMode ? 'Edit Article' : 'Create Article'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="formContent">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                {formData.isEditMode ? 'Update' : 'Create'}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default ArticlesPage;
