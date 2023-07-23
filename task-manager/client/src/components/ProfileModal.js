import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.ts';
import { updateUserData } from '../services/userApi';

const ProfileModal = ({ closeModal }) => {
    const { user, setUser } = useContext(AuthContext);
    const [name, setName] = useState(user?.userName || '');
    const [email, setEmail] = useState(user?.userEmail || '');
    const [dateOfBirth, setDateOfBirth] = useState(user?.userDOB || '');
    const [updateResult, setUpdateResult] = useState(null);

    // Add state variables for email errors
    const [emailError, setEmailError] = useState('');

    const handleUpdate = async () => {
        // Validate the email before updating the user data
        if (!email) {
            setEmailError('Email must not be blank');
            return;
        }

        // Regular expression to check the email format
        const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if (!email.match(emailFormat)) {
            setEmailError('Email is in an incorrect format');
            return;
        }

        // Update the user object with the new information
        const updatedUser = {
            ...user,
            userName: name,
            userEmail: email,
            userDOB: dateOfBirth,
        };

        try {
            // Call the updateUserData API function with the updated user data
            const response = await updateUserData(user.userEmail, updatedUser);
            if (response) {
                setUser(updatedUser);
                setUpdateResult('User information updated successfully.');
            } else {
                setUpdateResult('Failed to update user information.');
            }
        } catch (error) {
            console.error('Error occurred while updating user:', error);
            setUpdateResult('Error occurred while updating user.');
        }
    };

    const handleClear = () => {
        // Clear all form inputs
        setName('');
        setEmail('');
        setDateOfBirth('');
    };

    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Update Profile</h3>
                    <button className="close-button" onClick={closeModal}>
                        X
                    </button>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ width: '300px' }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError('');
                            }}
                            style={{ width: '300px' }}
                        />
                        {emailError && <p className="error-text">{emailError}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            style={{ width: '200px' }}
                        />
                    </div>
                    <div className="button-container">
                        <button type="button" className="profile" onClick={handleUpdate}>
                            Update
                        </button>
                        <button type="button" className="add" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </form>
                {updateResult && (
                    <div className="update-result-popup">
                        <p>{updateResult}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileModal;
