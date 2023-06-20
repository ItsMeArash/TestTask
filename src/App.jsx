import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import store from "./redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Provider>
  );
};

export default App;
