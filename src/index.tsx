import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BlogsList from "./pages/BlogsList";
import NavBar from "./components/NavBar";
import NewBlog from "./pages/NewBlog";
import BlogDetails from "./pages/BlogDetails";
import CommentList from "./components/CommentList";
import './utils/i18n';
import './styles/App.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <NavBar/>
        <Routes>
            <Route element={<PrivateRoutes/>}>
                <Route element={<NewBlog/>} path="/new-blog"/>
            </Route>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Register/>} path="/register"/>
            <Route index element={<BlogsList/>} path="/blogs"/>
            <Route element={<BlogDetails/>} path={`/blogs/:id`}/>
            <Route key="get" element={<CommentList/>}  path={`/blogs/:id/comments`}/>
            <Route key="edit" element={<CommentList/>}  path={`/blogs/:id/comments/:id`}/>
        </Routes>
    </BrowserRouter>
);

