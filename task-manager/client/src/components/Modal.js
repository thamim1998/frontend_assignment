import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.ts'

import { postData, updateData } from '../services/tasksApi'

function Modal({ setIsModalOpen, mode, task, fetchTasks }) {
  const { user } = useContext(AuthContext)
  const isEdit = mode === 'edit'

  const [data, setData] = useState({
    user_email: isEdit ? task.user_email : user.userEmail,
    title: isEdit ? task.title : '',
    urgency: isEdit ? task.urgency : 1,
    date: isEdit ? task.date : new Date(),
    description: isEdit ? task.description : '',
    completion: isEdit ? task.completion : 'Not started',
  })

  const [titleError, setTitleError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the title error message when the title is changed
    if (name === 'title') {
      setTitleError('');
    }
  }

  const addTask = async (e) => {
    e.preventDefault()

    // Check if the title is blank and display the error message if it is
    if (!data.title.trim()) {
      setTitleError('Title must not be blank');
      return;
    }

    try {
      await postData(data).then((res) => {
        setIsModalOpen(false)
        fetchTasks()
      })
    } catch (err) {
      console.log(err)
    }
  }

  const editTask = async (e) => {
    e.preventDefault()

    // Check if the title is blank and display the error message if it is
    if (!data.title.trim()) {
      setTitleError('Title must not be blank');
      return;
    }

    try {
      await updateData(task.id, data).then((res) => {
        setIsModalOpen(false)
        fetchTasks()
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{isEdit ? 'Edit Task' : 'Add New Task'}</h3>
          <XMarkIcon className="icon" onClick={() => setIsModalOpen(false)} />
        </div>
        <form>
          <label className="label">Title</label>
          <input
            required
            name="title"
            id="title"
            type="text"
            placeholder="Please enter your task title"
            value={data.title}
            onChange={handleChange}
          />
          {titleError && <p className="error-text">{titleError}</p>}
          <label className="label">Description</label>
          <input
              required
              name="description"
              id="description"
              type="text"
              placeholder="Please enter your task description"
              value={data.description}
              onChange={handleChange}
          />
          <label className="label">Urgency</label>
          <input
            required
            name="urgency"
            id="urgency"
            type="range"
            min="1"
            max="5"
            value={data.urgency}
            onChange={handleChange}
          />
          <label className="label">Completion</label>
          <select
              required
              name="completion"
              id="completion"
              value={data.completion}
              onChange={handleChange}
          >
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
          <input
            type="submit"
            className="submit-button"
            onClick={isEdit ? editTask : addTask}
            value={isEdit ? 'Save Task' : 'Add Task'}
          />
        </form>
      </div>
    </div>
  )
}

export default Modal
