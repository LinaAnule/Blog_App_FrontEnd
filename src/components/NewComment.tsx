import React, {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {User} from "../interfaces/User";
import '../styles/NewComment.css';
import BannerError from "./BannerError";
import {useTranslation} from "react-i18next";

const NewComment = () => {
    const {id: blogId} = useParams<string>();
    const [commentContent, setCommentContent] = useState<string>();
    const [auth, setAuth] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);
    const {t, i18n} = useTranslation();

    useMemo(() => {
        if (localStorage.getItem("user")) {
            const user: User = JSON.parse(localStorage.getItem("user")!);
            setUserId(user.id);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (commentContent) {
                const response = await axios.post(`http://localhost:8080/blogs/${blogId}/new-comment`, {
                    userId,
                    commentContent
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then(() => {
                    setCommentContent("");
                    window.location.reload();
                });
            } else {
                setAuth(true);
                setTimeout(() => setAuth(false), 3000);
            }
        } catch (error: any) {
            console.error('The comment was NOT added:', error);
            setError(error.response?.data?.message);
        }
    };

    return (
        <div>
            {error && <BannerError props={error}/>}

            {auth &&
                <BannerError props={t('Comment1')}/>
            }
            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1"
                           className="form-label"><b>{t('Add new comment')}</b></label>

                    <textarea value={commentContent} onChange={(e) => {
                        setCommentContent(e.target.value)
                    }}
                              className="form-control opacity-50" id="exampleFormControlTextarea1" rows={3}>

                    </textarea>

                    <button type="submit" className="btn btn-dark">{t('add')}</button>

                </div>

            </form>

        </div>
    );
}
export default NewComment;