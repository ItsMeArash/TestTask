import { Route, Routes } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

// Components
import Login from "./components/Login";
import Dashborad from "./components/Dashborad";
import Weather from "./components/Weather";
import ToDo from "./components/ToDo";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div className="dark:bg-slate-600">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashborad />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
