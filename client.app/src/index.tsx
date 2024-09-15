import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./pages/Login";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";

const router = createBrowserRouter([{
  path: '/login',
  element: <Login/>
}, {
  path: '/sign-in',
  element: <SignIn/>
}])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <>
      <Header></Header>
      <main className={"p-4 md:max-w-[60%] md:mt-0 md:mb-0 md:ml-auto md:mr-auto"}>
        <RouterProvider router={router} />
      </main>
    </>
  </React.StrictMode>
);