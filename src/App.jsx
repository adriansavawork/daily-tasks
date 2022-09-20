import { useEffect, useState } from 'react'
import { categories } from './categories'
import Category from './components/Category'
import { nanoid } from 'nanoid'
import './assets/styles.css'

function App() {

    const [cats, setCats] = useState(JSON.parse(localStorage.getItem('categories')) || [])
    // const [cats, setCats] = useState([])
    const [newCat, setNewCat] = useState('')

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(cats))
    }, [cats])

    const showTasks = (event) => {
        if (event.target === event.currentTarget) {
            event.currentTarget.classList.toggle('is-active')
        }
    }

    const addNewTask = (event, id) => {
        if (event.key === "Enter") {
            const newTask = event.target.value
            setCats(prevSetCats => {
                return prevSetCats.map(category => {
                    if (category.id === id) {
                        return {
                            ...category,
                            tasks: [...category.tasks, {
                                id: nanoid(),
                                value: newTask,
                                isCompleted: false
                            }]
                        }
                    } else {
                        return category
                    }
                })
            })
            event.target.value = '';
        }
    }

    const handleChange = (event) => {
        setNewCat(event.target.value)
    }
    const addNewCategory = (event) => {
        if (event.key === "Enter") {
            setCats(prevSetCats => {
                return [
                    ...prevSetCats,
                    {
                        name: newCat,
                        id: nanoid(),
                        tasks: []
                    }
                ]
            })
            setNewCat('')
        }
    }
    console.log(cats)
    const deleteTask = (id) => {
        setCats(prevSetCats => {
            return prevSetCats.map(category => {
                return {
                    ...category,
                    tasks: category.tasks.filter(task => {
                        if (task.id !== id) {
                            return true
                        } else {
                            return false
                        }
                    })
                }
            })
        })
    }

    const deleteCategory = (id) => {
        console.log(id)
        setCats(prevSetCats => {
            return prevSetCats.filter(cat => {
                return cat.id !== id
                // if (cat.id !== id) {
                //     return true
                // } else {
                //     return false
                // }
            })
        })
    }

    const completeTask = (id, e) => {
        setCats(prevSetCats => {
            return prevSetCats.map(category => {
                return {
                    ...category,
                    tasks: category.tasks.map(task => {
                        if (task.id === id) {
                            return {
                                ...task,
                                isCompleted: !task.isCompleted
                            }
                        } else {
                            return task
                        }
                    })
                }
            })
        })
    }

    return (
        <div className='daily-tasks-wrapper'>
            <div className="daily-tasks-intro">
                <h2>Daily Tasks</h2>
                <p>Easily add your tasks and group them in categories!</p>
            </div>
            <div className="daily-tasks">
                <div className='task-categories'>
                    <div className="category-add">
                        <input type="text"
                            onKeyPress={event => addNewCategory(event)}
                            onChange={handleChange}
                            value={newCat}
                            placeholder="Add a task category..." />
                    </div>
                    {
                        cats.length > 0
                        &&
                        cats.map(category => {
                            return <Category
                                key={category.id}
                                id={category.id}
                                name={category.name}
                                tasks={category.tasks}
                                showTasks={showTasks}
                                addNewTask={addNewTask}
                                deleteTask={deleteTask}
                                completeTask={completeTask}
                                deleteCategory={deleteCategory}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default App
