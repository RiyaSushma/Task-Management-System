// providers/GlobalProvider.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const getToken = () => localStorage.getItem('token');

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/tasks", {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });

      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch tasks");
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      toast.success("Task deleted");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  };

  const updateTask = async (task) => {
    try {
      await axios.put(`http://localhost:5000/tasks`, task, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        }
      });
      toast.success("Task updated");
      allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  useEffect(() => {
    allTasks();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        tasks,
        deleteTask,
        isLoading,
        completedTasks,
        importantTasks,
        incompleteTasks,
        updateTask,
        allTasks,
        collapsed,
        setCollapsed,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
