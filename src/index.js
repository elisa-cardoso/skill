import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import AuthorPost from './pages/AuthorPosts';
import Logout from './pages/Logout';
import CreateSkill from './pages/CreateSkill';
import ProtectRoute from './route/ProtectRoute';

import { Toaster } from 'react-hot-toast'; // Importa Toaster

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/login" /> },
      { path: "home", element: <ProtectRoute element={Home} />  },
      { path: "posts/:id", element: <ProtectRoute element={PostDetail} />  },
      { path: "edit/:id", element: <ProtectRoute element={EditPost} />  },
      { path: "skill/new", element: <ProtectRoute element={CreatePost} />  },
      { path: "user-skill/new", element: <ProtectRoute element={CreateSkill} />  },
      { path: "user-skill", element: <ProtectRoute element={AuthorPost} /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "logout", element: <ProtectRoute element={Logout} />  }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Toaster /> {/* Adiciona Toaster */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
