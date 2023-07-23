import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.ts';
import ProfileModal from './ProfileModal'; // Update the import statement

const Profile = ({ closeModal }) => { // Pass closeModal prop from parent component (App.js)
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');

  const handleSave = () => {
    // Update the user object with the new information
    const updatedUser = {
      ...user,
      name: name,
      email: email,
      dateOfBirth: dateOfBirth,
    };

    // Call the updateUser function from the context to update the user data
    updateUser(updatedUser);
  };

  const handleClear = () => {
    // Clear all form inputs
    setName('');
    setEmail('');
    setDateOfBirth('');
  };

  const handleExit = () => {
    // Go back to the previous page
    window.history.back();
  };

  return (
      <ProfileModal closeModal={closeModal}> {/* Use ProfileModal component here */}
        <div>
          <h2>Profile</h2>
          <form>
            <div>
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </div>
            <div className="button-container">
              <button type="button" className="add" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="profile" onClick={handleClear}>
                Clear
              </button>
              <button type="button" className="logout" onClick={() => { handleExit(); closeModal(); }}>
                Exit
              </button>
            </div>
          </form>
        </div>
      </ProfileModal>
  );
};

export default Profile;
