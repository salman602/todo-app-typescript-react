import React, { useCallback, useReducer, useRef } from 'react';

interface ISingleTodo {
    id: number,
    name: string,
    isCompleted?: boolean
}
type ActionType = { type: "ADD", name: string, isCompleted: boolean } | { type: "REMOVE", id: number }

const List = () => {
    function reducer(state: ISingleTodo[], action: ActionType) {
        switch (action.type) {
            case "ADD":
                return [...state,
                {
                    id: state.length,
                    name: action.name,
                    isCompleted: false
                }]
            case "REMOVE":
                return state.filter(({ id }) => id !== action.id)
        }

    }
    const [todos, dispatch] = useReducer(reducer, []);
    const onCreateTodo = useCallback(() => {
        if (newToDo.current) {
            dispatch({
                type: "ADD",
                name: newToDo.current?.value,
                isCompleted: false
            })
            newToDo.current.value = "";
        }

    }, []);

    const onRemoveTodo = useCallback((id) => {
        dispatch({
            type: "REMOVE",
            id: id

        })
    }, []);

    const newToDo = useRef<HTMLInputElement>(null)
    return (
        <div>
            <input type="text" ref={newToDo} />
            <button onClick={onCreateTodo}>Create</button>
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Task Name</td>
                        <td>isCompleted</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map((singleToDo) => (
                            <tr key={singleToDo.id}>
                                <td>{singleToDo.id}</td>
                                <td>{singleToDo.name}</td>
                                <td>{singleToDo.isCompleted}</td>
                                <td><button onClick={onRemoveTodo}>Remove</button></td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default List