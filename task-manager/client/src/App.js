import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Modal from './components/Modal'
import Auth from './components/Auth'

import { getData } from './services/tasksApi'
import { useEffect, useState } from 'react'

import { AuthContext } from './context/AuthContext.ts'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './components/Profile'
import { updateUserData } from './services/userApi';

function App() {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [user, setUser] = useState(null)

  const openModal = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  const fetchTasks = async () => {
    await getData(user.userEmail).then((res) => {
      setTasks(res)
    })
  }

  useEffect(() => {
    if (user) {
      fetchTasks()
    }
  })

  const sortedTasks = tasks.sort((a, b) => {
    return b.urgency - a.urgency
  })

  const updateUser = async (updatedUser) => {
    try {
      await updateUserData(updatedUser.email, updatedUser);
      setUser(updatedUser);
    } catch (error) {
      console.error('Error occurred while updating user:', error);
    }
  };

  return (
    <div className="app">
      <AuthContext.Provider value={{ user, setUser, updateUser }}>
        <Router>
          <div className="app">
            <Switch>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route exact path="/">
                {!user ? (
                  <Auth />
                ) : (
                  <div className="default-view">
                    <ListHeader fetchTasks={fetchTasks} />
                    <div className="list-container">
                      {sortedTasks.map((task) => (
                        <ListItem task={task} key={task.id} fetchTasks={fetchTasks} openModal={openModal} />
                      ))}
                    </div>
                    {isModalOpen && (
                      <Modal
                        setIsModalOpen={setIsModalOpen}
                        mode={'edit'}
                        task={selectedTask}
                        fetchTasks={fetchTasks}
                      />
                    )}
                  </div>
                )}
              </Route>
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App
