import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTitle(e.currentTarget.value);
  };

  const errorStyles = {fontWeight: 'bold', color: 'red'};
  const errorMessage = error ? (
    <div style={errorStyles}>Please, enter new title</div>
  ) : null;

  const addNewItem = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      props.addItem(trimmedTitle);
    } else {
      setError(true);
    }
    setTitle('');
  };

  const onEnterAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewItem();
    }
  };

  return (
    <div>
      <TextField
        style={{padding: '6px'}}
        size='small'
        value={title}
        onKeyDown={onEnterAddItem}
        onChange={setLocalTitle}
        variant='outlined'
        label='Title'
        error={error}
        helperText={error && 'Please, enter new title'}
      />

      <Button
        sx={{mr: '3px', fontSize: '10px', p: '4px 4px'}}
        size='small'
        variant='contained'
        onClick={addNewItem}
        endIcon={<PostAddIcon />}
      >
        Add
      </Button>
      {errorMessage}
    </div>
  );
};
