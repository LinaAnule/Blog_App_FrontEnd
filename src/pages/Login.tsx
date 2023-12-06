import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import '../styles/Login.css';
import BannerError from "../components/BannerError";
import {useTranslation} from "react-i18next";

const Login = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [auth, setAuth] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (username && password) {
                const response = await axios.post('http://localhost:8080/login', {username, password});
                localStorage.setItem('accessToken', response.data.jwtToken);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/blogs');
                window.location.reload();
            } else {
                setAuth(true);
                setTimeout(() => setAuth(false), 3000)
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            setError(error.response?.data?.message);
        }
    };

    return (
        <div className="container d-flex flex-column gap-3 mt-2 text-light container-login">

            {error && <BannerError props={error}/>}

            <h2>{t('login')}</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group mb-3">
                    <label htmlFor="username">{t('Username')} </label>
                    <input value={username}
                           onChange={(event) => {
                               setUsername(event.target.value)
                           }}
                           type="text" className="form-control" id="username" aria-describedby="usernameHelp"
                           placeholder="Username"/>

                    {(auth && !username) &&
                        <p className="alert alert-danger py-1 mt-2">{t('Please enter a valid username')}</p>
                    }

                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">{t('Password')} </label>
                    <input value={password}
                           onChange={(event) => {
                               setPassword(event.target.value)
                           }}
                           type="password" className="form-control" id="password" aria-describedby="passwordHelp"
                           placeholder="Password"/>

                    {(auth && !password) &&
                        <p className="alert alert-danger py-1 mt-2">{t('Please enter a valid password')}</p>
                    }
                </div>

                <button
                    type="submit"
                    className="btn btn-dark ">
                    {t('login')}
                </button>

                <div className="mt-3 ">
                    <Link className="link-light" to={"/register"}>{t('Don\'t have account? Sign Up')}</Link>
                </div>

            </form>

        </div>
    );
}
export default Login;

