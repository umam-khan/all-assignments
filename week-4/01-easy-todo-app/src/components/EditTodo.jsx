import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const EditTodo = (props) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    edit(props.id, title, description);
    handleClose();
  };

  const edit = (id, title, description) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        console.log('edited');
        // Perform any additional actions after successful edit
        props.setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, title, description } : todo
          )
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Edit Todo
      </Button> */}
      <FontAwesomeIcon icon={faPenToSquare} onClick={handleClickOpen} style={{marginTop:"10px"}}/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new title and description for the todo:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTodo;
