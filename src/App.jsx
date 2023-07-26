import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Paper, Divider, Button, List, Tabs, Tab, Container, Typography, Stack } from '@mui/material';
import Item from './components/Item'
import AddField from './components/AddField'
import { useReducer, useState } from 'react';
import {ValueContext} from './components/context'
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <List>{children}</List>
        </Box>
      )}
    </div>
  );
}

function allProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

let tasks = [];

//{id: 1, text: 'Пока тут ничего нет...', completed: false, editing: false}

function App() {
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [edit, setEdit] = useState('');
  const [, ] = useState(() => {
    return tasks = JSON.parse(localStorage.getItem('state')) || [];
  })
  const [state, dispatch] = useReducer(reducer, {tasks});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function reducer(state, action) {
    switch(action.type) {
      case 'ADD_TASK': 
      return {
        ...state,
        tasks: [...state.tasks, {id: uuidv4().substring(0, 12), text: action.payload, completed: checked, editing: false}],
      }
  
      case 'REMOVE_USER': 
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.payload)
      }

      case 'TOGGLE_TODO':
      return {
        ...state,
        tasks: state.tasks.map((obj) => 
        obj.id === action.payload ? {...obj, completed: !obj.completed} : obj)
      }

      case 'EDIT_TODO':
      return {
        ...state,
        tasks: state.tasks.map((obj) => 
        obj.id === action.payload ? {...obj, editing: !obj.editing} : obj)
      }

      case 'NEW_TASK':
      return {
        ...state,
        tasks: state.tasks.map((obj) => 
        obj.id === action.payload ? {...obj, text: edit} : obj)
      }

      case 'ALL_TRUE':
      return {
      ...state,
      tasks: state.tasks.map((obj) => obj.id == obj.id ? {...obj, completed: true} : obj)
      }

      case 'ALL_FALSE':
      return {
      ...state,
      tasks: state.tasks.map((obj) => obj.id == obj.id ? {...obj, completed: false} : obj)
      }

  
      default:
        return state;
    }
  
  }
  
  console.log('state:', state)

  const addTaskEnter = (event) => {
    if(event.key === 'Enter') {
      addTask()
    }
  }

  const addTask = () => {
    if (inputValue !== '') {
      dispatch({
        type: 'ADD_TASK',
        payload: inputValue,
        completed: checked,
      })
    } 
    setTimeout(() => {
      setChecked(false)
    }, 0);
    setInputValue('');
  }

  const removeTask = (index) => {
    dispatch({
      type: 'REMOVE_USER',
      payload: index
    })
  }

  const getCompletedTodos = () => {
    if (state.tasks.length > 0) {
      return state.tasks.filter((obj) => obj.completed)
    } else {
      return state.tasks
    }
  }

  const getActualTodos = () => {
    if (state.tasks.length > 0) {
      return state.tasks.filter((obj) => !obj.completed)
    } else {
      return state.tasks
    }
  }

  const getAll = () => {
    return state.tasks;
  }

  const toggleTodo = (id) => {
    dispatch({
      type: 'TOGGLE_TODO',
      payload: id,
    })
  }

  const allTasksTrue = () => {
    dispatch({
      type: 'ALL_TRUE',
    })
  }

  const allTasksFalse = () => {
    dispatch({
      type: 'ALL_FALSE',
    })
  }

  const setEditing = (id) => {
    dispatch({
      type: 'EDIT_TODO',
      payload: id,
    })
  }

  const newTask = (id) => {
      dispatch({
        type: 'NEW_TASK',
        payload: id,
        text: edit
      });
    // console.log(edit)
  }
  
  return (
    <ValueContext.Provider value={{inputValue, setInputValue, addTask, removeTask, checked, setChecked, state, toggleTodo, tasks, addTaskEnter, setEditing, setEdit, newTask}}>
    <Container >
      <Paper className='wrapper'>
        <Paper className='header' elevation={0}>
          <Typography variant='h6' component='h1'>Список задач</Typography>
        </Paper>
        <AddField />
        <Divider />
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Все" {...allProps(0)} />
          <Tab label="Активные" onClick={getCompletedTodos} {...allProps(1)} />
          <Tab label="Завершённые" onClick={getActualTodos} {...allProps(2)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Item items={getAll()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Item items={getActualTodos()} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Item items={getCompletedTodos()} />
        </CustomTabPanel>
        <Divider />
        <Divider />
        <Stack padding={1} spacing={0} direction={'row'} >
          <Button onClick={allTasksTrue} >Отметить всё</Button>
          <Button onClick={allTasksFalse}>Очистить</Button>
        </Stack>
      </Paper>
    </Container>
    </ValueContext.Provider>
  )
}

export default App
