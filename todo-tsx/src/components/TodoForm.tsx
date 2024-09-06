import { useState, Dispatch, SetStateAction } from 'react';
import TodoServices from '../todoServices'
import TodoType from '../todo';


interface TodoFormProps {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

const TodoForm = ({ setTodos }: TodoFormProps) => {
  const [task, setTask] = useState<string>("") 

  function handleSubmit(){
    TodoServices.insertTodo(task)
    const allTasks = TodoServices.getTodos()
    setTodos(allTasks)
    setTask("")
  }

  return (
    <div>
        <input 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Add a Task"
        />
        <button onClick={handleSubmit}>Add task</button>
    </div>
  )
}

export default TodoForm