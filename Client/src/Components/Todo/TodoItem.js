import '../../CSS/Todo/TodoItem.css';
import {Link} from 'react-router-dom';
import {BellFill, ExclamationCircleFill, PencilSquare, Trash} from 'react-bootstrap-icons';
import todoService from '../../Services/todos.service';
import React from 'react';

const TodoComponent = ({todo, setTodos, userId, handleNotification}) => {

    const handleChecked = () => {
        todoService
            .updateTodo(
                todo._id,
                {
                    text: todo.text,
                    priority: todo.priority,
                    completed: !todo.completed,
                },

            )
            .then(() => {
                todoService
                    .fetchTodos()
                    .then((res) => {
                        setTodos(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function deleteTodo() {
        todoService
            .deleteTodo(todo._id)
            .then(() => {
                todoService
                    .fetchTodos(userId)
                    .then((res) => {
                        setTodos(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }



    return (
        <tr>
            <td className={'td-done'}>
                <input type={'checkbox'} checked={todo.completed} onChange={handleChecked}/>
            </td>
            <td className={todo.completed ? 'completed td-desc' : 'td-desc'}>{todo.text}</td>
            <td className={'actions'}>
                <label>
                    {todo.priority}
                    {
                        todo.priority === 'high' ? <ExclamationCircleFill className={'priority'} color={'#f56464'}/>
                            : todo.priority === 'medium' ?
                                <ExclamationCircleFill className={'priority'} color={'#f5dd64'}/>
                                : todo.priority === 'low' ?
                                    <ExclamationCircleFill className={'priority'} color={'#989898'}/> :
                                    <ExclamationCircleFill className={'priority'} color={'#989898'}/>
                    }
                </label>
            </td>
            <td className={'actions'}>
                <Link className={'edit-icons'} to={'/edit/' + todo._id}>
                    <PencilSquare/>
                </Link>
                <Trash color={'#e51616'} className={'trash-icon'} onClick={deleteTodo}/>
                <BellFill
                    color={'#007bff'}
                    className={'notification-icon'}
                    onClick={() => handleNotification(todo._id)}
                />
            </td>

        </tr>
    );
};


export default TodoComponent;
