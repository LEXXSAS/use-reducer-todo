import { TextField, Button, Checkbox, ListItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useContext } from "react";
import { ValueContext } from "./context";

const AddField = () => {
  const {inputValue, setInputValue, addTask, checked, setChecked, addTaskEnter} = useContext(ValueContext)
  
  // function handleChange(event) {
  //   setChecked(!checked)
  // }

  return (
    <ListItem
      sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
    >
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <TextField
        onKeyDown={addTaskEnter}
        className="field"
        placeholder="Введите текст задачи..."
        variant="standard"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button onClick={addTask} className="circle">
        <AddIcon />
      </Button>
    </ListItem>
  );
};

export default AddField;
