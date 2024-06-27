import {SaveFill, TrashFill} from 'react-bootstrap-icons';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import '../../CSS/Todo/EditTodo.css';
import {toast} from 'react-toastify';
import todoService from '../../Services/todos.service';

const EditTodo = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [todo, setTodo] = useState({
        text: '',
        priority: 'medium',
        completed: false,
    });

    useEffect(() => {
        todoService
            .fetchTodos()
            .then((res) => {
                setTodo({
                    completed: res.data.completed,
                    text: res.data.text,
                    priority: res.data.priority,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const onChangeTodoDescription = (e) => {
        setTodo({
            ...todo,
            text: e.target.value,
        });
    };

    const onChangeTodoCompleted = () => {
        setTodo({
            ...todo,
            completed: !todo.completed,
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

    const updateTodoById = () => {
        if (todo.text.length > 0) {
            todoService
                .updateTodo(id, todo)
                .then((res) => {
                    console.log('updated Todo successfully!', res);
                    toast.info('updated Todo');
                    navigate('/to-do');
                })
                .catch((err) => {
                    navigate('/');
                    console.log(err);
                    toast.error('error updating todo');
                });
        }
    };

    const deleteTodo = () => {
        todoService
            .deleteTodo(id)
            .then((res) => {
                console.log('deleted todo:', res.data);
                toast.info('Deleted Todo');
                navigate('/');
            })
            .catch((err) => {
                navigate('/');
                console.log(err);
                toast.error('error deleting todo');
            });
    };

    return (
        <div className={'EditTodo'}>
            <h4>Update Todo:</h4>
            <input
                className={'form-control'}
                type={'text'}
                value={todo.text}
                placeholder='Description'
                onChange={onChangeTodoDescription}/>
            <div className={'radio-group'}>
                <h4>Priority</h4>
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
            <label className={'done'}>
                <input
                    className={'form-check-input'}
                    type={'checkbox'}
                    checked={todo.completed}
                    onChange={onChangeTodoCompleted}/>
                mark as done
            </label> <br/>
            <button
                className={'btn btn-danger btn-edit'}
                onClick={deleteTodo}>
                <label>
                    <TrashFill/>
                    Delete
                </label>
            </button>
            <button
                className={'btn btn-primary btn-edit'}
                onClick={updateTodoById}>
                <label>
                    <SaveFill/>
                    Save
                </label>
            </button>
        </div>
    );
};

export default EditTodo;
