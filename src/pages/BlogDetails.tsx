import {json, Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import CommentList from "../components/CommentList";
import NewComment from "../components/NewComment";
import {User} from "../interfaces/User";
import Moment from "moment/moment";
import '../styles/BlogDetails.css';
import {Blog} from "../interfaces/Blog";
import BannerError from "../components/BannerError";
import {useTranslation} from "react-i18next";

const BlogDetails = () => {
    const {id: blogId} = useParams();
    const [blog, setBlog] = useState<Blog>();
    const [error, setError] = useState();
    const [loading, setLoading] = useState<boolean>();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [userId, setUserId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [edit, setEdit] = useState<boolean>(false);
    const navigate = useNavigate();
    Moment.locale("en");
    const {t, i18n} = useTranslation();

    useEffect(() => {
        getBlog(blogId!);
        if (localStorage.getItem("user")) {
            const signedInUser: User = JSON.parse(localStorage.getItem("user")!);
            setUserId(signedInUser.id);
            (signedInUser?.roles.forEach((role) => {
                if (role.roleType === "ADMIN") {
                    setIsAdmin(true);
                }
                if (role.roleType === "USER") {
                    setIsUser(true);
                }
            }));
        }
    }, [blogId]);

    const getBlog = async (blogId: string) => {
        try {
            setLoading(true);
            let response = await axios.get(`http://localhost:8080/blogs/${blogId}`).then((res) => {
                setBlog(res.data);
            });
        } catch (error: any) {
            console.log("Blog fetch error", error);
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }
    const handleEdiBlog = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true);
            let response = await axios.put(`http://localhost:8080/blogs/${blogId}`, {
                userId,
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then((res) => {
                setEdit(false);
                window.location.reload();
            });
        } catch (error: any) {
            console.log("Blog fetch error", error);
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    const handleBLogDelete = async () => {
        try {
            let response = await axios.delete(`http://localhost:8080/blogs/${blogId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(() => {
            });
        } catch (error: any) {
            console.error('The blog was NOT deleted:', error);
            setError(error.response?.data?.message)
        } finally {
            navigate(`/blogs`);
        }
    }

    return (
        <div className="container d-flex flex-column gap-3 mt-2 text-light ">

            {error && <BannerError props={error}/>}

            {loading && <div className={"d-flex justify-content-center"}>
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">{t('Loading...')}</span>
                </div>
            </div>}

            <div className="container text-light text-container">
                <div style={{margin: "15px"}}>
                    {(userId === blog?.userId) && <button onClick={handleBLogDelete} type="button"
                                                          className="btn delete-button btn-light">{t('Delete')}</button>}


                    {(userId === blog?.userId) && <button onClick={() => {
                        setEdit(true);
                        setContent(blog?.content!);
                        setTitle(blog?.title!)
                    }} type="button"
                                                          className="btn edit-button btn-outline-light">{t('Edit')}</button>}
                </div>
                <h1>
                    {blog?.title}
                </h1>

                <div className="info">
                    <small>{t('Posted By')} <i>{blog?.username}</i></small>
                    <small>{t('Posted on')} <i>{Moment(blog?.blogDate, 'YYYY,MM,DD').format('MM/DD/YYYY')}</i></small>
                </div>

                <p className="blog-content">{blog?.content}</p></div>

            {edit && <div>

                <form onSubmit={handleEdiBlog}>

                    <div className="mb-3">

                        <label htmlFor="exampleFormControlTextarea1" className="form-label"><b>{t('Edit Your Blog')}</b></label>

                        <input value={title}
                               onChange={(event) => {
                                   setTitle(event.target.value)
                               }}
                               type="text" className="form-control"/>

                        <textarea value={content} onChange={(e) => {
                            setContent(e.target.value);
                        }}
                                  className="form-control" id="exampleFormControlTextarea1"
                                  rows={10}></textarea>

                        <button type="submit" className="btn btn-dark">{t('Edit')}</button>

                    </div>

                </form>

            </div>}

            <CommentList/>

            {(isAdmin || isUser) && <NewComment/>}
            {!(isAdmin || isUser) && <Link className="link-light" to={"/login"}>{t('Login to leave comments')}</Link>}

        </div>
    );

}
export default BlogDetails;