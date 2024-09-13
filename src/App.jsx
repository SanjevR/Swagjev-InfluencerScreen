import { RouterProvider } from "react-router-dom";
import { router } from "./scripts/router";
import {ToastContainer} from "react-toastify";


function App() {
  return (
    <>
      <RouterProvider router={router} />
        <ToastContainer autoClose={4000}/>
    </>
  );
}

export default App;
