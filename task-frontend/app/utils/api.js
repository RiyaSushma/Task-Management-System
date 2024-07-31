const API_URL = 'http://localhost:5000/tasks';
const getToken = () => localStorage.getItem('token');

// get all tasks
export const getTasks = async() => {
    const response = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if(!response.ok) {
        throw new Error("Failed to fetch task");
    }
    return response.json();
};

// create new task
export const createTask = async(task) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(task),
    });

    if(!response.ok) {
        throw new Error('Failed to create new task');
    }

    return response.json();
};


// fetch particular task
export const getTaskByTitle = async(title) => {
    const response = await fetch(`${API_URL}/${encodeURIComponent(title)}`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    if(!response.ok) {
        throw new Error('Failed to fetch this task');
    }
    return response.json();
};

// update task
export const updateTask = async (title, task) => {
    const response = await fetch(`${API_URL}/${encodeURIComponent(title)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(task),
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    return response.json();
};

// delete task
export const deleteTask = async(title) => {
    const response = await fetch(`${API_URL}/${encodeURIComponent(title)}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
    });

    if(!response.ok) {
        throw new Error('Failed to delete task');
    }

    return response.json();
};

