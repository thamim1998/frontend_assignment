import axios from 'axios';

export const getUserData = async (email) => {
    try {
        const response = await axios.get(`http://localhost:8000/users/${email}`);
        return response.data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
};

export const updateUserData = async (email, data) => {
    try {
        const response = await axios.put(`http://localhost:8000/users/${email}`, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
};
