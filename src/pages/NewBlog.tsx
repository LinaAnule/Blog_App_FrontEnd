import React, {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Banner from "../components/Banner";
import {User} from "../interfaces/User";
import BannerError from "../components/BannerError";
import {useTranslation} from "react-i18next";

const NewBlog = () => {

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState();
    const [id, setId] = useState<number>(0);
    const [auth, setAuth] = useState<boolean>(false);
    const [isPerformed, setIsPerformed] = useState<boolean>(false);
    const {t, i18n} = useTranslation();

    useMemo(() => {
        if (localStorage.getItem("user")) {
            const user: User = JSON.parse(localStorage.getItem("user")!);
            setId(user.id);
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (title && content) {
                const response = await axios.post('http://localhost:8080/blogs', {title, content, id}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setIsPerformed(true);
                setTimeout(() => setIsPerformed(false), 3000);
                setContent("");
                setTitle("");
            } else {
                setAuth(true);
                setTimeout(() => setAuth(false), 3000);
            }
        } catch (error: any) {
            console.error('Upload failed:', error);
            setError(error.response?.data?.message)
        }
    };

    return (
        <div className="container d-flex flex-column gap-3 mt-2 text-light">

            {auth && <BannerError props={t("Cannot Be Empty")}/>}

            {error && <BannerError props={error}/>}

            {(isPerformed) && <Banner props={t("Post Added")}/>}

            <form onSubmit={handleSubmit}>

                <div className="mb-3 ">
                    <label htmlFor="formGroupExampleInput" className="form-label"><b>{t('Title')}</b></label>
                    <input value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           type="text" className="form-control opacity-50" id="formGroupExampleInput"
                           placeholder="New..."/>
                </div>

                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label"><b>{t('Text')}</b></label>
                    <textarea value={content}
                              onChange={(e) => setContent(e.target.value)}
                              className="form-control opacity-50" id="exampleFormControlTextarea1"
                              placeholder="Noriu " rows={5}></textarea>
                </div>

                <button type="submit" className="btn btn-dark">{t('Post')}</button>

            </form>

        </div>
    );

}
export default NewBlog;