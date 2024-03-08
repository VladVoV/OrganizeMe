import axios from "axios";

export function createPost(postbody) {
    console.log('http://localhost:3000/api/posts/create');
    return axios.post('http://localhost:3000/api/posts/create', {
        title: postbody.title,
        description: postbody.description,
        tags: postbody.tags
    });
}
