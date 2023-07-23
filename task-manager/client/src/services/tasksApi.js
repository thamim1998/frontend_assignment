import axios from 'axios'

export const getData = async (userEmail) => {
  try {
    const response = await axios.get(`http://localhost:8000/tasks/${userEmail}`)
    return response.data
  } catch (err) {
    console.log(err.message)
    return []
  }
}

export const postData = async (data) => {
  try {
    const response = await axios.post(`http://localhost:8000/tasks`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (err) {
    console.error(err.message)
    return []
  }
}

export const updateData = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:8000/tasks/${id}`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (err) {
    console.error(err.message)
    return []
  }
}

export const deleteData = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/tasks/${id}`)
    return response.data
  } catch (err) {
    console.error(err.message)
    return []
  }
}

export const auth = async (data, endpoint) => {
  try {
    console.log(data)
    const response = await axios.post(`http://localhost:8000/${endpoint}`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (err) {
    console.error(err.message)
    return []
  }
}
