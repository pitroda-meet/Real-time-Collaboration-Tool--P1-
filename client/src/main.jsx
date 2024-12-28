import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";

import App from "./App.jsx";
import Home from "./Layouts/Home.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./store/store.js";
import Signup from "./Layouts/signup.jsx";
import Verify from "./Layouts/Verify.jsx";
import Login from "./Layouts/Login.jsx";
import Forgot from "./Layouts/Forgot.jsx";
import Otp from "./Layouts/Otp.jsx";
import Resetpassword from "./Layouts/Resetpassword.jsx";
// Set up your router here with `createBrowserRouter`
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },

      { path: "/signup", element: <Signup /> },
      { path: "/verify/:userId", element: <Verify /> },
      { path: "/login", element: <Login /> },
      { path: "/forgot", element: <Forgot /> },
      { path: "/otp", element: <Otp /> },
      { path: "/resetpassword", element: <Resetpassword /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        pauseOnFocusLoss={true}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
