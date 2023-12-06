import React, {useEffect, useState} from "react";
import {Comment} from "../interfaces/Comment";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import '../styles/CommentList.css';
import {User} from "../interfaces/User";
import Moment from 'moment';
import BannerError from "./BannerError";
import {useTranslation} from "react-i18next";


const CommentList = () => {

    const {id: blogId} = useParams();
    const [error, setError] = useState();
    const [loading, setLoading] = useState<boolean>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const isLoggedIn = !!localStorage.getItem("accessToken");
    const [currentUser, setCurrentUser] = useState<User>();
    const [commentContent, setCommentContent] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);
    const [edit, setEdit] = useState<boolean>(false);
    const [commentId, setCommentId] = useState<number>(0);
    const navigate = useNavigate();
    const [deleteState, setDeleteState] = useState<boolean>(false);
    Moment.locale("en");
    const {t, i18n} = useTranslation();

    useEffect(() => {
        getComments().then(() => {
        });
        if (isLoggedIn) {
            let user: User;
            user = JSON.parse(localStorage.getItem("user")!);
            setCurrentUser(user);
            setUserId(user.id);
            (user?.roles.forEach((role) => {
                if (role.roleType === "ADMIN") {
                    setIsAdmin(true);
                }
            }));
        }
    }, []);

    useEffect(() => {
        getComments();
        if (deleteState) {
            handleDelete();
        }
    }, [edit, deleteState]);

    const getComments = async () => {
        try {
            setLoading(true);
            let response = await axios.get(`http://localhost:8080/blogs/${blogId}/comments`);
            setComments(response.data);
        } catch (error: any) {
            console.log("Blog fetch error", error)
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };
    const handleEdit = async (event: any) => {
        event.preventDefault();
        try {
            let response = await axios.post(`http://localhost:8080/blogs/${blogId}/comments/${commentId}`, {
                userId,
                commentContent
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(() => {
                setEdit(false);
                setCommentId(0);
                setCommentContent("");
            });
        } catch (error: any) {
            console.error('The comment was NOT edited:', error);
            setError(error.response?.data?.message)
        } finally {
            navigate(``);
        }
    }

    const handleDelete = async () => {
        try {
            let response = await axios.delete(`http://localhost:8080/blogs/${blogId}/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(() => {
                setDeleteState(false);
                setCommentId(0);
            });
        } catch (error: any) {
            setError(error.response?.data?.message)
        }
    }

    return (
        <div className={"container d-flex flex-column gap-3 mt-2"}>

            {loading && <div className={"d-flex justify-content-center"}>
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">{t('Loading...')}</span>
                </div>
            </div>
            }

            {error && <BannerError props={error}/>}

            <h3 className="comment-header">{t('Comments')}</h3>

            {(comments.length === 0) && <p>{t('Empty')}</p>}

            {comments.map((comment: Comment, index: number) => {
                return <div key={index}>

                    <div className={"comment-section form-control opacity-75"}>

                        <div className="buttons">

                            {(currentUser?.id === comment.userId) && <button onClick={() => {
                                setEdit(true);
                                setCommentId(comment.commentId);
                                setCommentContent(comment.commentContent);
                            }} type="button"
                                                                             className="btn btn-outline-secondary">{t('Edit')}</button>
                            }

                            {((currentUser?.id === comment.userId) || isAdmin) && <button onClick={(event) => {
                                setDeleteState(true);
                                setCommentId(comment.commentId);
                            }} type="button"
                                                                                          className="btn btn-secondary">{t('Delete')}</button>
                            }

                        </div>

                        <div className="info"><span
                            className={"username"}><small><i>{t('Comment by')} {comment.username}</i></small></span><small
                            className={"date"}>
                            {t('Date')} {Moment(comment.commentDate, 'YYYY,MM,DD').format('MM/DD/YYYY')}</small>
                        </div>

                        <p className={"comment-text"}>{comment.commentContent}</p>

                    </div>

                    {edit && (commentId === comment.commentId) && <div>
                        <form onSubmit={handleEdit}>

                            <div className="mb-3">

                                <label htmlFor="exampleFormControlTextarea1"
                                       className="form-label"><b> {t('Edit the comment')}</b></label>

                                <textarea value={commentContent} onChange={(e) => {
                                    setCommentContent(e.target.value);
                                }}
                                          className="form-control" id="exampleFormControlTextarea1"
                                          rows={7}></textarea>

                                <button type="submit" className="btn btn-dark edit-comment">{t('Edit')}</button>

                            </div>

                        </form>

                    </div>

                    }
                </div>
            })
            }
        </div>
    );
}
export default CommentList;