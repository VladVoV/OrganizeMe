import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../CSS/Todo/AddingTodo.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Plus, X} from 'react-bootstrap-icons';
import todoService from '../../Services/todos.service';
import Navbar from "../Navbar";

const AddingTodo = () => {


    const [todo, setTodo] = useState({
        text: '',
        priority: 'medium'
});

    const navigation = useNavigate();
    const onChangeTodoDescription = (e) => {
        setTodo({
            ...todo,
            text: e.target.value,
        });
    };

    const onChangePriorityHandler = (event) => {
        setTodo({
            ...todo,
            priority:
                event.target.value === 'high' ? 'high'
                    : event.target.value === 'medium' ? 'medium'
                        : event.target.value === 'low' ? 'low' : 'medium',
        });
    };

    const addNewTodo = () => {
        todoService.createTodo(todo)
            .then(() => {
                toast.success('Added Todo!');
                navigation('/to-do');
            }).catch((err) => {
            console.log(err);
            toast.error(err.message);
            navigation('/');
        });
    };


    const abort = () => {
        navigation('/');
        toast.warn('canceled creating Todo');
    };

    return (
        <div className={'AddingTodo'}>
            <Navbar/>
            <h3>Add a new Todo</h3>
            <input
                className={'form-control'}
                type={'text'}
                placeholder={'description'}
                onChange={onChangeTodoDescription}/>
            <div className={'radio-group'}>
                <h3>Priority</h3>
                <label>
                    <input
                        type={'radio'}
                        value={'high'}
                        className={'form-check-input radio-btn'}
                        onChange={onChangePriorityHandler}
                        checked={todo.priority === 'high'}/>
                    High
                </label><br/>
                <label>
                    <input
                        type={'radio'}
                        value={'medium'}
                        className={'form-check-input radio-btn'}
                        onChange={onChangePriorityHandler}
                        checked={todo.priority === 'medium'}/>
                    Medium
                </label><br/>
                <label>
                    <input
                        type={'radio'}
                        value={'low'}
                        className={'form-check-input radio-btn'}
                        onChange={onChangePriorityHandler}
                        checked={todo.priority === 'low'}/>
                    Low
                </label><br/>
            </div>
            <button
                disabled={todo.text.trim() === ''}
                className={'btn btn-primary btn-add'}
                onClick={addNewTodo}>
                <label>
                    <Plus/>
                    Create Todo
                </label>
            </button>
            <button
                className={'btn btn-warning btn-add'}
                onClick={abort}>
                <label>
                    <X/>
                    Cancel
                </label>
            </button>
        </div>
    );
};
export default AddingTodo;
