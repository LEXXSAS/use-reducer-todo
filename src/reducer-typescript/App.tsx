import React, { useReducer, useState } from "react"

type User = {
    id: number;
    fullName: string;
};

type State = User[];

type Actions = AddUserAction | RemoveUserAction | ClearUsersAction;

type AddUserAction = {
    type: 'ADD_USER';
    payload: string;
}

type RemoveUserAction = {
    type: 'REMOVE_USER';
    payload: number;
}

type ClearUsersAction = {
    type: 'CLEAR_USERS';
}

function reducer(state: State, action: Actions) {
    switch (action.type) {
        case 'ADD_USER':
        return [...state, {id: state.length + 1, fullName: action.payload}]

        case 'REMOVE_USER': 
        return state.filter((_, index) => index !== action.payload);

        case 'CLEAR_USERS':
        return [];

        default:
        return state;
    }
}

function App() {
    const [inputValue, setInputValue] = useState('');
    const [state, dispatch] = useReducer(reducer, []);

    const addUser = () => {
        dispatch({
            type: 'ADD_USER',
            payload: inputValue
        })
        setInputValue('')
    };

    const removeUser = (index: number) => {
        dispatch({
            type: 'REMOVE_USER',
            payload: index
        })
    };

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS'
        })
    };

    return(
        <div className="App">
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Введите имя пользователя" />
            <button onClick={addUser}>Добавить</button>
            <hr />
            <ul>
                {state.map((obj, index) => (
                <li key={obj.id}>
                    {obj.fullName}<button onClick={() => removeUser(index)}>X</button>
                </li>
                ))}
            </ul>
            {state.length > 0 && (
             <>
            <hr />
            <button onClick={clearUsers}>Очистить</button>
             </>
            )}
        </div>
    )
}

export default App
