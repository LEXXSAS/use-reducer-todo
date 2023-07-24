import { IconButton, Checkbox, ListItem, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { ValueContext } from "./context";
import { useContext, useEffect } from "react";

const Item = ({items}) => {
  const {removeTask, toggleTodo, setEditing, setEdit, newTask} = useContext(ValueContext);

    useEffect(() => {
      localStorage.setItem('state', JSON.stringify(items));
  }, [items])

  return (
    items.map((obj, index) => 
    <ListItem key={obj.id} sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }} >
            <Checkbox onClick={() => toggleTodo(obj.id)} checked={obj.completed} icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} />
            {!obj.editing && <Typography
            style={{textDecoration: obj.completed ? 'line-through' : 'none' }}
            className="item-text"
            >
            {obj.text}
            </Typography>}
            {obj.editing && <input type="text" defaultValue={obj.text} onKeyUp={(event) => {if (event.key === 'Enter') {setEditing(obj.id)}}}
            onChange={(e) => {if (e.target.value !== '') {setEdit(e.target.value), newTask(obj.id)}}}
            />}
            <div className="item-buttons d-flex">
                <IconButton onClick={() => {setEditing(obj.id)}} >
                    <EditIcon style={{fontSize: 20}} />
                </IconButton>
                <IconButton onClick={() => removeTask(index)}>
                    <DeleteOutlineIcon style={{fontSize: 20}} />
                </IconButton>
            </div>
    </ListItem>
    )
  )
}

export default Item
