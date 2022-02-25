import React, { useCallback, useReducer, useRef } from 'react';
import { Box, Button, Flex, SimpleGrid } from '@chakra-ui/react';

import './List.css';

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
            localStorage.setItem('myTodos', `${todos}`);
            newToDo.current.value = "";

        }

    }, []);

    const newToDo = useRef<HTMLInputElement>(null)
    return (
        <div>
            <Box bg='tomato' w='100%' m={"auto"} p={4} color='white'>
                <Flex align={"center"} justify={"center"}>
                    <input className='todo_input' type="text" ref={newToDo} />
                    <button className='create_btn' onClick={onCreateTodo}>Create</button>
                </Flex>
            </Box>

            <Box className='todo_items' pt="20">
                <SimpleGrid columns={2} spacingX='40px' spacingY='20px'>
                    {
                        todos.map((singleTodo) => (
                            <Box className='single_item' key={singleTodo.id} bg='tomato' height='80px'>
                                <h3>{singleTodo.name}</h3>
                                <Button className='remove_btn' onClick={(id) => dispatch({ type: "REMOVE", id: singleTodo.id })}>Remove</Button>
                            </Box>

                        ))
                    }

                </SimpleGrid>
            </Box>
        </div>
    )
}

export default List;