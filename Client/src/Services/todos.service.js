import axios from 'axios';

const todoService = {
    fetchTodos() {
        return axios.get('/api/todos');
    },
    createTodo(newTask) {
        return axios.post('/api/todos', { text: newTask });
    },
    deleteTodo(taskId) {
        return axios.delete(`/api/todos/${taskId}`);
    },
    deleteAllTodos() {
        return axios.delete('/api/todos');
    },
};

export default todoService;
