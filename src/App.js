import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";

import "./assets/css/app.css";
import "./assets/css/loading.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Loading />
      <ToastContainer />
      <main className="app__main">
        <Outlet />
      </main>
    </>
  );
}

export default App;
