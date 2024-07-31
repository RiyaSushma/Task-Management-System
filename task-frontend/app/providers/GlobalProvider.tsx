// providers/GlobalProvider.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface ThemeType {
    name: string;
    colorBg: string;
    colorBg2: string;
    colorBg3: string;
    colorBg4: string;
    colorButton: string;
    colorDanger: string;
    colorFontPrimary: string;
    colorTextSecondary: string;
    colorTextPrimary: string;
    colorTextLight: string;
    colorbackground: string;
    colorGradient: string;
    colorGreenDark: string;
    colorGreenLight: string;
    activeNavLink: string;
    activeNavLinkHover: string;
    colorPrimary: string;
    colorPrimary2: string;
    colorGreyDark: string;
    colorGrey0: string;
    colorGrey1: string;
    colorGrey2: string;
    colorGrey3: string;
    colorGrey4: string;
    colorGrey5: string;
    colorGrey6: string;
    colorWhite: string;
    colorPrimaryGreen?: string;
    borderColor: string;
    borderColor2: string;
    shadow1?: string;
    shadow2?: string;
    shadow3?: string;
    shadow4?: string;
    shadow5?: string;
    shadow6?: string;
    shadow7: string;
    sidebarWidth: string;
    sidebarCollapsed: string;
    fH4: string;
    fontSmall: string;
    fontSmall2: string;
    gridGap: string;
    padLRSm: string;
    colorIcons: string;
    colorIcons2: string;
    colorIcons3: string;
    colorIcons4: string;
    marLRSm: string;
    buttonGradient1?: string;
    buttonGradient2?: string;
    buttonGradient3?: string;
    buttonGradient4?: string;
    buttonGradient5?: string;
    buttonGradient6?: string;
    buttonGradient7?: string;
    buttonGradient8?: string;
    buttonGradient9?: string;
    buttonGradient10?: string;
    buttonGradient11?: string;
    buttonGradient12?: string;
    buttonGradient13?: string;
    buttonGradient14?: string;
    borderRadiusMd?: string;
    borderRadiusMd2?: string;
    borderRadiusSm?: string;
  };  

const themes: ThemeType[] = [
    {
        name: "default",
        colorBg: "#252525",
        colorBg2: "#212121",
        colorBg3: "#181818",
        colorBg4: "#1A1A1A",
        colorButton: "#3A3B3C",
        colorDanger: "#fe6854",
        colorFontPrimary: "#e5e7eb",
        colorTextSecondary: "#B0B3B8",
        colorTextPrimary: "#FFFFFF",
        colorTextLight: "#f8f8f8",
        colorbackground: "#FBFBFD",
        colorGradient: "linear-gradient(110.42deg, #CF57A3 29.2%, #4731B6 63.56%)",
        colorGreenDark: "#27AE60",
        colorGreenLight: "#dbe1e8",
        activeNavLink: "rgba(249,249,249, 0.08)",
        activeNavLinkHover: "rgba(249,249,249, 0.03)",
        colorPrimary: "#7263F3",
        colorPrimary2: "#705DF2",
        colorGreyDark: "#131313",
        colorGrey0: "#f8f8f8",
        colorGrey1: "#dbe1e8",
        colorGrey2: "#b2becd",
        colorGrey3: "#6c7983",
        colorGrey4: "#454e56",
        colorGrey5: "#2a2e35",
        colorGrey6: "#12181b",
        colorWhite: "#fff",
        colorPrimaryGreen: "#6FCF97",
        borderColor: "rgba(249,249,249, 0.08)",
        borderColor2: "rgba(249,249,249, 0.08)",
        shadow7: "1px 7px 12px rgba(8, 18, 69, 0.1)",
        sidebarWidth: "15rem",
        sidebarCollapsed: "5.4rem",
        fH4: "19px",
        fontSmall: "14px",
        fontSmall2: "15px",
        gridGap: "2rem",
        padLRSm: "0 2rem",
        colorIcons: "rgba(249,249,249, 0.35)",
        colorIcons2: "rgba(249,249,249, 0.75)",
        colorIcons3: "rgba(249,249,249, 0.08)",
        colorIcons4: "rgba(0,0,0, 0.3)",
        marLRSm: "0 1rem",
      },
      {
        name: "light",
        colorBg: "#fff",
        colorBg2: "#F9F9F9",
        colorBg3: "#EDEDED",
        colorBg4: "#1A1A1A",
        colorButton: "#3A3B3C",
        colorDanger: "#fe6854",
        colorTextSecondary: "#B0B3B8",
        colorFontPrimary: "#6c7983",
        colorTextPrimary: "#FFFFFF",
        colorTextLight: "#f8f8f8",
        colorbackground: "#FBFBFD",
        colorGradient: "linear-gradient(110.42deg, #CF57A3 29.2%, #4731B6 63.56%)",
        colorGreenDark: "#27AE60",
        colorGreenLight: "#dbe1e8",
        activeNavLink: "rgba(230,230,230, .87)",
        activeNavLinkHover: "#C5C5C5",
        colorPrimary: "#7263F3",
        colorPrimary2: "#705DF2",
        colorGreyDark: "#131313",
        colorGrey0: "#f8f8f8",
        colorGrey1: "#dbe1e8",
        colorGrey2: "#b2becd",
        colorGrey3: "#6c7983",
        colorGrey4: "#454e56",
        colorGrey5: "#2a2e35",
        colorGrey6: "#12181b",
        colorWhite: "#fff",
        buttonGradient1:
          "linear-gradient(110.42deg, rgba(107, 190, 146, 0.7) 29.2%, rgba(245, 102, 146, 0.7) 63.56%)",
        buttonGradient2:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.7) 29.2%, rgba(168, 85, 247, 0.7) 63.56%)",
        buttonGradient3:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.7) 29.2%, rgba(168, 85, 247, 0.7) 63.56%)",
        buttonGradient4:
          "linear-gradient(110.42deg, rgba(168, 85, 247, 0.7) 29.2%, rgba(245, 102, 146, 0.7) 63.56%)",
        buttonGradient5:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.7) 29.2%, rgba(168, 85, 247, 0.7) 63.56%)",
        buttonGradient6:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.7) 29.2%, rgba(168, 85, 247, 0.7) 63.56%)",
        buttonGradient7:
          "linear-gradient(110.42deg, rgba(41, 25, 222, 0.7) 29.2%, rgba(235, 87, 87, 0.7) 63.56%)",
        buttonGradient8:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.7) 29.2%, rgba(168, 85, 247, 0.7) 63.56%)",
        buttonGradient9:
          "linear-gradient(110.42deg, rgba(226, 195, 33, 0.7) 29.2%, rgba(247, 104, 85, 0.7) 63.56%)",
        buttonGradient10:
          "linear-gradient(110.42deg, rgba(235, 87, 87, 0.7) 29.2%, rgba(189, 68, 166, 0.7) 53.82%, rgba(247, 85, 143, 0.1) 63.56%)",
        buttonGradient11:
          "linear-gradient(110.42deg, rgba(25, 151, 222, 0.7) 29.2%, rgba(168, 85, 247, 0.7) 63.56%)",
        buttonGradient12:
          "linear-gradient(110.42deg, rgba(226, 195, 33, 0.7) 29.2%, rgba(247, 104, 85, 0.7) 63.56%)",
        buttonGradient13:
          "linear-gradient(110.42deg, rgba(226, 195, 33, 0.7) 29.2%, rgba(99, 3, 255, 0.7) 63.56%)",
        buttonGradient14:
          "linear-gradient(110.42deg, rgba(41, 25, 222, 0.7) 29.2%, rgba(235, 87, 87, 0.7) 63.56%)",
        borderRadiusMd: "12px",
        borderRadiusMd2: "15px",
        borderRadiusSm: "8px",
        borderColor: "rgba(249,249,249, 0.08)",
        borderColor2: "rgba(249,249,249, 0.08)",
        shadow1: "4px 4px 84px rgba(16, 10, 86, 0.04)",
        shadow2: "0px 48px 77px rgba(8, 18, 69, 0.07)",
        shadow3: "0 14px 40px rgb(0 0 0 / 25%)",
        shadow7: "0px 48px 77px rgba(8, 18, 69, 0.16)",
        shadow5: "0px 4px 0px rgba(249,249,249, 0.35)",
        shadow6:
          "0px 6px 20px rgba(0, 0, 0, 0.15), 0px -3px 20px rgba(0, 0, 0, 0.1)",
        sidebarWidth: "15rem",
        sidebarCollapsed: "5.4rem",
        fH4: "19px",
        fontSmall: "14px",
        fontSmall2: "15px",
        gridGap: "2rem",
        padLRSm: "0 2rem",
        colorIcons: "#999999",
        colorIcons2: "#181818",
        colorIcons3: "rgba(249,249,249, 0.08)",
        colorIcons4: "rgba(0,0,0, 0.3)",
        marLRSm: "0 1rem",
      },
];


type GlobalContextType = {
  tasks: any[];
  deleteTask: (id: string) => Promise<void>;
  isLoading: boolean;
  completedTasks: any[];
  importantTasks: any[];
  incompleteTasks: any[];
  updateTask: (task: any) => Promise<void>;
  allTasks: () => void;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  collapsedMenu: boolean;
  setCollapsedMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultGlobalContextValue: GlobalContextType = {
  tasks: [],
  deleteTask: async (id: string) => {},
  isLoading: false,
  completedTasks: [],
  importantTasks: [],
  incompleteTasks: [],
  updateTask: async (task: any) => {},
  allTasks: () => {},
  collapsed: false,
  setCollapsed: () => {},
  theme: themes[0], // Set default theme
  setTheme: () => {},
  collapsedMenu: false,
  setCollapsedMenu: () => {}
};

export const GlobalContext = createContext<GlobalContextType>(defaultGlobalContextValue);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeType>(themes[0]); // Default to the first theme
  const [collapsedMenu, setCollapsedMenu] = useState<boolean>(false);

  const getToken = () => localStorage.getItem('token');

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/tasks", {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });

      const sorted = res.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch tasks");
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
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

  const updateTask = async (task: any) => {
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
        theme,
        setTheme,
        collapsedMenu,
        setCollapsedMenu
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
