import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Extera() {
  return (
    <div className="App">
      <ToastContainer
        autoClose={2000}
        draggable={true}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={() => toast("Wow so easy !")}>Toast</button>
      <button onClick={() => toast.info("Wow so easy !")}>Info</button>
      <button onClick={() => toast.warn("Wow so easy !")}>Warn</button>
      <button onClick={() => toast.success("Wow so easy !")}>Success</button>
      <button onClick={() => toast.error("Wow so easy !")}>Error</button>
    </div>
  );
}

export default Extera;
