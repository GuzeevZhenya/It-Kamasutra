import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddItemForm} from './AddItemForm';
import {FilterValuesType, TaskType} from './App';
import {EditTableSpan} from './EditTableSpan';
import {Button, IconButton, Checkbox, ButtonGroup} from '@mui/material';
import CanselPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {CheckBox} from './Checkbox';
//rsc
// typescript =>
// 1. Variable
// 2. Param of func
// 3. Return of func

type TodoListPropsType = {
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  removeTask: (taskId: string, todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  changeTodoListFilter: (
    nextFilterValue: FilterValuesType,
    todoListId: string
  ) => void;
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void;
  changeTodoListTitle: (title: string, todoListId: string) => void;
};

const TodoList = (props: TodoListPropsType, taskId: string) => {
  const changeTaskHandler = (tID: string, checkedValue: boolean) => {
    props.changeTaskStatus(tID, checkedValue, props.todoListId);
  };
  const tasksListItems = props.tasks.length ? (
    <List>
      {props.tasks.map((task) => {
        const removeTask = () => props.removeTask(task.id, props.todoListId);
        // const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        //   props.changeTaskStatus(
        //     task.id,
        //     e.currentTarget.checked,
        //     props.todoListId
        //   );

        const changeTaskTitle = (title: string) => {
          props.changeTaskTitle(task.id, title, props.todoListId);
        };

        return (
          <ListItem key={task.id} sx={{p: '0'}}>
            {/* <Checkbox
              size='small'
              checked={task.isDone}
              onChange={changeTaskStatus}
            /> */}
            <CheckBox
              callBack={(checkedValue) =>
                changeTaskHandler(task.id, checkedValue)
              }
              checked={task.isDone}
            />
            <div
              style={{display: 'inline-block'}}
              className={task.isDone ? 'task-done' : ''}
            >
              <EditTableSpan title={task.title} changeTitle={changeTaskTitle} />
            </div>

            <IconButton size='small' color='error' onClick={() => removeTask()}>
              <CanselPresentationOutlinedIcon fontSize='small' />
            </IconButton>
          </ListItem>
        );
      })}
    </List>
  ) : (
    <span>List is empty</span>
  );

  const onClickHandlerCreator = (filter: FilterValuesType) => () =>
    props.changeTodoListFilter(filter, props.todoListId);

  const removeTodoList = () => {
    props.removeTodoList(props.todoListId);
  };

  const addNewTask = (title: string) => {
    props.addTask(title, props.todoListId);
  };
  const changeTodoLisetTitle = (title: string) => {
    props.changeTodoListTitle(title, props.todoListId);
  };

  return (
    <div>
      <div>
        <EditTableSpan title={props.title} changeTitle={changeTodoLisetTitle} />

        <IconButton onClick={() => removeTodoList()}>
          <CanselPresentationOutlinedIcon />
        </IconButton>
      </div>
      <AddItemForm addItem={addNewTask} />

      {tasksListItems}
      <div>
        <ButtonGroup fullWidth disableElevation size='small'>
          <Button
            sx={{mr: '3px', fontSize: '10px', p: '4px 4px'}}
            color={props.filter === 'all' ? 'secondary' : 'primary'}
            variant='contained'
            onClick={onClickHandlerCreator('all')}
          >
            All
          </Button>
          <Button
            sx={{mr: '3px', fontSize: '10px', p: '4px 4px'}}
            color={props.filter === 'active' ? 'secondary' : 'primary'}
            variant='contained'
            onClick={onClickHandlerCreator('active')}
          >
            Active
          </Button>
          <Button
            sx={{fontSize: '10px', p: '4px 4px'}}
            color={props.filter === 'completed' ? 'secondary' : 'primary'}
            variant='contained'
            onClick={onClickHandlerCreator('completed')}
          >
            Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TodoList;
