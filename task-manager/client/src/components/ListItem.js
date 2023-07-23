import { CheckCircleIcon } from '@heroicons/react/24/outline'
import UrgencyBar from './UrgencyBar'
import { deleteData } from '../services/tasksApi'

const textLevels = {
  1: { label: 'Casual', color: 'green', flagIcon: 'green_flag.png' },
  2: { label: 'Casual', color: 'green', flagIcon: 'green_flag.png' },
  3: { label: 'Important', color: 'yellow', flagIcon: 'yellow_flag.png' },
  4: { label: 'Important', color: 'yellow', flagIcon: 'yellow_flag.png' },
  5: { label: 'Urgent', color: 'red', flagIcon: 'red_flag.png' },
};

function ListItem({ task, fetchTasks, openModal }) {
  const deleteTask = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?')

    if (confirmDelete) {
      try {
        await deleteData(id).then((res) => {
          fetchTasks()
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const { label, color, flagIcon } = textLevels[task.urgency] || {}

  return (
    <div className="list-item">
      {/*<div className="info-container">*/}
      {/*  <CheckCircleIcon className="icon" />*/}
      {/*  <p className="task-title">{task.title}</p>*/}
      {/*  <UrgencyBar urgency={task.urgency} />*/}
      {/*</div>*/}
      <div className="info-container">
        <CheckCircleIcon className="icon" />
        <p className={`task-title ${color}`}>{task.title}</p>
        <UrgencyBar urgency={task.urgency} />
        {flagIcon && <img className="flag-icon" src={`/flags/${flagIcon}`} alt="Flag Icon" />}
        {label}
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => openModal(task)}>
          Edit
        </button>
        <button className="delete" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default ListItem
