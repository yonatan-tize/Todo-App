import {useState } from 'react'
import TodoType from '../todo'
import TodoServices from '../todoServices';
import TodoForm from './TodoForm';
import '../CSS/TodoTasks.css'

const TodoTasks = () => {
  const [todos, setTodos] = useState<TodoType[]>(TodoServices.getTodos)
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  // select the task to be edited 
  const handleStartEdit = (id: number, text:string)=>{
    setEditingTodoId(id)
    setEditedTodoText(text)
  }

  //edit a todo by id
  const handleConfirmEdit = (id: number)=>{
    if (editedTodoText.trim() !== ""){
        TodoServices.updateTodo({
            id,
            text: editedTodoText,
            completed: false
        })
        const updatedTodos = TodoServices.getTodos()
        setEditingTodoId(null)
        setEditedTodoText("")
        setTodos(updatedTodos)
    }
  }

  //cancel editing
  const handleAbortEdit = () => {
    setEditingTodoId(null)
    setEditedTodoText("")
  }


//   Deletes a task with the specified ID. 
  const handleDeleteTask = (id: number)=>{
    TodoServices.deleteTodo(id)
    const updatedTodos = TodoServices.getTodos()
    setTodos(updatedTodos)
  }

  return (
    <div>
        <div>
            <TodoForm setTodos={setTodos}/>
        </div>
        <div className='tasks'>
            { todos.map((todo)=>(
                <div key={todo.id} className='taskList'>
                    {editingTodoId === todo.id ?
                    (<div className='taskDiv'>
                        <input type="text" value={editedTodoText} onChange={(e)=> setEditedTodoText(e.target.value)}/>
                        <button onClick={() => handleConfirmEdit(todo.id)}>confirm Edit</button>
                        <button onClick={handleAbortEdit}>Cancel Edit</button>
                    </div>) : (
                    <div className='taskDiv'>
                        <p className='todoContent'>{todo.text}</p>
                        <div className='todoBtn'>
                            <button onClick={()=> handleStartEdit(todo.id, todo.text)}>
                                Edit
                            </button>
                            <button onClick={() => handleDeleteTask(todo.id)}>
                                Delete
                            </button>
                        </div>
                     </div>
                    )}

                </div>
              ))
            }
        </div>
    </div>
  )
}

export default TodoTasks