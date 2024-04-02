import React from 'react';
import '../../CSS/Todo/Table.css';

const Table = ({todoLength, label, todoList}) => {

    return (
        <div className={todoLength > 0 ? 'table-todo' : 'not-empty table-todo'}>
            <h3>{label}:</h3>
            <table className={'table table-striped'}>
                <thead>
                <tr>
                    <th>Done</th>
                    <th className={'desc-heading'}>Description</th>
                    <th className={'priority-heading'}>Priority</th>
                    <th className={'action-heading'}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {todoList()}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
