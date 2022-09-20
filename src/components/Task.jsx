export default function Task({ task, deleteTask, completeTask, isCompleted, id }) {

    return (
        <div
            className={
                isCompleted ? 'is-completed task' : 'task'
            }>
            <span
                onClick={(e) => completeTask(id, e)}
                className="task-text">
                {task}
            </span>
            <span
                onClick={() => deleteTask(id)}
                className="delete-icon">

            </span>
        </div>
    )
}