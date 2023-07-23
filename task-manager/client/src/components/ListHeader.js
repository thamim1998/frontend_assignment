import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.ts'
import Modal from './Modal'
import { useAuth } from '../hooks/useAuth.ts'
import ProfileModal from './ProfileModal'
import { getUserData } from '../services/userApi'


function ListHeader({ fetchTasks }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user, setUser } = useContext(AuthContext)
  const { logout } = useAuth()
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isUserDataFetched, setIsUserDataFetched] = useState(false)

  const handleLogout = () => {
    logout()
  }

  const handleProfileClick = async () => {
    // Check if user data has been fetched
    if (!isUserDataFetched) {
      try {
        // Fetch user data using getUserData API
        const userData = await getUserData(user.userEmail);
        if (userData) {
          // Update the user context with the fetched user data
          setUser({ ...user, userName: userData.name, userDOB: userData.dob });
        }
      } catch (error) {
        console.error('Error occurred while fetching user data:', error);
      } finally {
        // Mark user data as fetched
        setIsUserDataFetched(true);
      }
    }

    setIsProfileModalOpen(true);
  };

  return (
    <div className="list-header">
      <h3>{user.userEmail}'s Tasks</h3>
      <div className="button-container">
        <button className="add" onClick={() => setIsModalOpen(true)}>
          Add New task
        </button>
        <button className="profile" onClick={handleProfileClick}>
          Profile
        </button>
        <button className="logout" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} mode={'create'} fetchTasks={fetchTasks} />}
      {isProfileModalOpen && <ProfileModal closeModal={() => setIsProfileModalOpen(false)} />}
    </div>
  )
}

export default ListHeader
