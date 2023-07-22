import { Route, Routes } from "react-router-dom";

import { create } from "zustand";

// Components
import Login from "./components/Login";
import Dashborad from "./components/Dashborad";
import Weather from "./components/Weather";
import ToDo from "./components/ToDo";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

const useStore = create((set) => ({
  username: "",
  password: "",
  isLoggedIn: false,
  setUsername: (username) => set(() => ({ username: username })),
  setPassword: (password) => set(() => ({ password: password })),
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn: isLoggedIn })),
  logOut: () => set(() => ({ username: '', password: '', isLoggedIn: false}))
}));

const App = () => {
  return (
    <div className="dark:bg-slate-600">
      <Routes>
        <Route path="/" element={<Login useStore={useStore} />} />
        <Route path="/dashboard" element={<Dashborad useStore={useStore} />} />
        <Route path="/weather" element={<Weather useStore={useStore} />} />
        <Route path="/todo" element={<ToDo useStore={useStore} />} />
        <Route path="/profile" element={<Profile useStore={useStore} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
