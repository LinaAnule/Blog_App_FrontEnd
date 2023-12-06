import {Link, NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {User} from "../interfaces/User";
import {useTranslation} from "react-i18next";

const NavBar = () => {

    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("accessToken");
    const [user, setUser] = useState<User>();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const {t, i18n} = useTranslation();

    useEffect(() => {
        if (isLoggedIn) {
            let user: User;
            user = JSON.parse(localStorage.getItem("user")!);
            setUser(user);
            (user?.roles.forEach((role) => {
                if (role.roleType === "ADMIN") {
                    setIsAdmin(true);
                }
                if (role.roleType === "USER") {
                    setIsUser(true);
                }
            }));
        }
    }, []);

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/blogs");
        window.location.reload();
    }

    const sendToLogin = () => {
        navigate("login");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body "
             data-bs-theme="dark">

            <div className="container-fluid">

                <a className="navbar-brand">{t('dust in the wind')}</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav">
                        {isAdmin &&
                            <li className="nav-item">
                                <NavLink to={"new-blog"} className={({isActive}) =>
                                    isActive ? "active nav-link" : "nav-link"}>{t('addNewBlog')}</NavLink>
                            </li>
                         }

                        <li className="nav-item">
                            <NavLink className="nav-link" to={"blogs"}>{t('Blogs')}</NavLink>
                        </li>

                        {!isLoggedIn &&
                            <button onClick={sendToLogin} type="button" className="btn btn-light"> {t('login')}
                            </button>
                        }

                        {isLoggedIn &&
                            <button onClick={handleLogOut} type="button" className="btn btn-outline-light ">{t('Log Out')} </button>
                        }

                    </ul>

                </div>

                <div className="d-flex gap-3" style={{marginLeft: "auto"}}>

                    <div className="btn" role="button" data-bs-toggle="button"
                         onClick={() => i18n.changeLanguage("en")}>EN
                    </div>

                    <div className="btn" role="button" data-bs-toggle="button"
                         onClick={() => i18n.changeLanguage("lt")}>LT
                    </div>

                </div>

            </div>

        </nav>
    );
}
export default NavBar;