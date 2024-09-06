import TodoType from "./todo";

const LOCAL_STORAGE_KEY: string = "SECRET_KEY"

const TodoServices = {

    // Getting all the todos
    getTodos: (): TodoType[] =>{
        const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        return todoStr? JSON.parse(todoStr) : []

    },

    // inserting a new todo
    insertTodo: (content: string): void | undefined=>{
        if (content.length === 0){
            return 
        }
        const todos: TodoType[] = TodoServices.getTodos()
        const newTodo: TodoType= {
            id: todos.length + 1,
            text: content,
            completed: false
        } 
        const updatedTodo: TodoType[] = [newTodo, ...todos]
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodo))

    },

    //updating todo
    updateTodo: (updatedTodo: TodoType): void =>{
        const todos = TodoServices.getTodos()
        const updatedTodos =todos.map((todo)=>{
            return updatedTodo.id === todo.id? updatedTodo : todo 
        })
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))

        
    }, 

    //delete todo
    deleteTodo: (todoID: number):void => {
        const todos = TodoServices.getTodos()
        const updatedTodos =todos.filter((todo)=>{
            return todoID !== todo.id
        })

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos))
    }

}

export default TodoServices