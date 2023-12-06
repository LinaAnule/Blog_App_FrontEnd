import axios from "axios";
import React, {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;
import {Blog} from "../interfaces/Blog";
import {Link, useNavigate} from "react-router-dom";
import BlogDetails from "./BlogDetails";
import {useTranslation} from "react-i18next";
import '../styles/BlogsList.css';
import BannerError from "../components/BannerError";


const BlogsList = () => {

    const [blogs, setBlogs] = useState<[]>([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState<boolean>();
    const {t, i18n} = useTranslation();

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = async () => {
        try {
            setLoading(true);
            let response = await axios.get("http://localhost:8080/blogs");
            setBlogs(response.data);
        } catch (error: any) {
            console.log("Blog fetch error", error);
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="main-body">

            {loading && <div className={"d-flex justify-content-center"}>
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">{t('Loading...')}</span>
                </div>
            </div>}

            {(error) && <BannerError props={error}/>}

            <div className="row row-cols-4 row-cols-md-6 g-4 opacity-75 justify-content-center">

                {blogs?.map((blog: Blog, index: number) => {
                    return <div key={index} className="col-4">

                        <Link to={`/blogs/${blog.id}`} className="card h-100">

                            <div className="card-body">
                                <h3 className="card-title">{blog.title}</h3>
                                <p className="card-text">{blog.content.length >= 300 ? blog.content.slice(0, 300) + "..." : blog.content}</p>
                            </div>

                        </Link>

                    </div>
                })}

            </div>

        </div>
    );

}
export default BlogsList;