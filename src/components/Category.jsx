import Task from "./Task"

export default function Category({ id, name, tasks, showTasks, addNewTask, deleteTask, completeTask, deleteCategory }) {
    return (
        <div
            className={
                tasks.length > 0
                    ?
                    'task-category is-active'
                    :
                    'task-category'
            }
            onClick={(event) => showTasks(event, id)}
        >
            <span
                onClick={() => deleteCategory(id)}
                className="delete-icon">

            </span>
            <span className="task-category-name">{name}</span>
            <span className='arrow'></span>

            <div className="tasks">
                {
                    tasks &&
                    tasks.map((task, index) => {
                        return <Task key={index} id={task.id} task={task.value} deleteTask={deleteTask} isCompleted={task.isCompleted} completeTask={completeTask} />
                    })
                }
                <div className="task-add">
                    <input type="text"
                        onKeyPress={event => addNewTask(event, id)}
                        placeholder="Write a task..." />
                </div>
            </div>
        </div>
    )
}