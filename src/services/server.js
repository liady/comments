import axios from 'axios';

export function addComment(comment) {
    return axios.post('/comment', comment);
}

export function getAllComments() {
    return axios.get('/comment');
}

export function clearComments() {
    return axios.delete('/comment');
}