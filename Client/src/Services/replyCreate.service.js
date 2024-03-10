import axios from "axios";

export function createReply(commentbody, id) {
    return axios.post('http://localhost:3000/api/replies/create/' + id, {
        comment: commentbody.comment,
    });
}
