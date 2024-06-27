import axios from 'axios';

const todoService = {
    fetchTodos() {
        return axios.get('/api/todos');
    },
    fetchTodoById(taskId) {
        return axios.get(`/api/todos/${taskId}`)
    },
    createTodo(todo) {
        return axios.post('/api/todos', { text: todo.text, priority: todo.priority });
    },
    updateTodo(taskId, todo) {
        return axios.put(`/api/todos/update/${taskId}`,
            {
            text: todo.text,
            priority: todo.priority,
            completed: todo.completed,
            })
    },
    deleteTodo(taskId) {
        return axios.delete(`/api/todos/${taskId}`);
    },
    deleteAllTodos() {
        return axios.delete('/api/todos');
    },
};

export default todoService;
