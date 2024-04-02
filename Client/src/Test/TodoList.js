import React, {useEffect, useState} from "react";
import todoService from "../Services/todos.service";
import {toast} from "react-toastify";


const TodoList= ()=> {
    const [todos, setTodos] = useState();

    useEffect(() => {
        todoService.fetchTodos()
            .then(res => {
                setTodos(res.data)

        })
            .catch((err) => {
                toast.error(err.message)
            })
    })

}

export default TodoList
