import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {Box, Container} from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import {Menu} from '@mui/icons-material';
import Button from '@mui/material/Button';
import {Grid, Paper} from '@mui/material';

//C - create (validation)
//R - read (pagination, sorting, filtration)
//U - update (validation)
//D - delete (validation)

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [todoListId: string]: Array<TaskType>;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const id_1 = v1();
  const id_2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: id_1, title: 'What to Learn', filter: 'all'},
    {id: id_2, title: 'What to Buy', filter: 'all'},
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [id_1]: [
      {id: v1(), title: 'HTML & CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'React', isDone: false},
    ],
    [id_2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Meat', isDone: true},
      {id: v1(), title: 'Wheat', isDone: false},
    ],
  });

  const removeTask = (taskId: string, todoListId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((task) => task.id !== taskId),
    });
  };

  const addTask = (title: string, todoListId: string) => {
    const newTask: TaskType = {id: v1(), title, isDone: false};
    //Массив, в котором нужно сделать изменени я
    const tasksForUpdate: Array<TaskType> = tasks[todoListId];
    setTasks({...tasks, [todoListId]: [newTask, ...tasksForUpdate]});
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => {
    const tasksForUpdate: Array<TaskType> = tasks[todoListId];

    setTasks({
      ...tasks,
      [todoListId]: tasksForUpdate.map((t) =>
        t.id === taskId ? {...t, isDone: isDone} : t
      ),
    });
  };

  const changeTaskTitle = (
    taskId: string,
    title: string,
    todoListId: string
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) =>
        t.id === taskId ? {...t, title: title} : t
      ),
    });
  };

  const changeTodoListFilter = (
    nextFilterValue: FilterValuesType,
    todoListId: string
  ) => {
    setTodoLists(
      todoLists.map((tl) =>
        tl.id === todoListId ? {...tl, filter: nextFilterValue} : tl
      )
    );
  };

  const changeTodoListTitle = (title: string, todoListId: string) => {
    setTodoLists(
      todoLists.map((tl) => (tl.id === todoListId ? {...tl, title: title} : tl))
    );
  };

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListId));
    delete tasks[todoListId];
  };

  const getFilteredTasks = (
    tasks: Array<TaskType>,
    filter: FilterValuesType
  ): Array<TaskType> => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.isDone);
      case 'active':
        return tasks.filter((task) => !task.isDone);
      default:
        return tasks;
    }
  };
  //Добавление новых тудушек
  const addTodoList = (title: string) => {
    const newTodoListId = v1();
    const newTodoList: TodoListType = {
      id: newTodoListId,
      title: title,
      filter: 'all',
    };
    setTodoLists([...todoLists, newTodoList]);
    setTasks({...tasks, [newTodoListId]: []});
  };
  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            arial-lable='menu'
            sx={{mr: 2}}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container sx={{p: '10px 0'}}>
          {todoLists.map((item: TodoListType) => {
            const filteredTask = getFilteredTasks(tasks[item.id], item.filter);
            return (
              <Grid sx={{p: '0 10px'}}>
                <Paper sx={{p: '20px'}} elevation={15}>
                  <TodoList
                    key={item.id}
                    removeTodoList={removeTodoList}
                    tasks={filteredTask}
                    title={item.title}
                    filter={item.filter}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTodoListFilter={changeTodoListFilter}
                    todoListId={item.id}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
