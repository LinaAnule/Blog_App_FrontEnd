import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import BannerError from "../components/BannerError";
import {useTranslation} from "react-i18next";

const Register = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authInit, setAuthInit] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            if (name && lastName && email && username && password && confirmPassword && (password === confirmPassword) && dateOfBirth) {
                const response = await axios.post('http://localhost:8080/register', {
                    username,
                    password,
                    email,
                    lastName,
                    name,
                    dateOfBirth
                });
                localStorage.setItem('accessToken', response.data.jwtToken);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/blogs');
                window.location.reload();
            } else {
                setAuthInit(true);
                setTimeout(() => setAuthInit(false), 3000);
            }
        } catch (error: any) {
            console.error('Registration failed:', error);
            setError(error.response?.data?.message);
        }
    };

    return (
        <div className="container d-flex flex-column gap-3 mt-2 text-light" style={{width: "28rem"}}>
            <h2>{t('Sign Up')}</h2>
            <form onSubmit={handleSubmit}>

                {error &&
                    <BannerError props={error}/>
                }

                <div className="form-group mb-3">
                    <label htmlFor="name">{t('Name')}</label>
                    <input value={name}
                           onChange={(e) => setName(e.target.value)}
                           type="text" className="form-control" id="name" aria-describedby="nameHelp"
                           placeholder={t('Name')}/>

                    {(authInit && !name) &&
                        <BannerError props={t("Please enter a valid name")}/>
                    }

                </div>

                <div className="form-group mb-3">

                    <label htmlFor="lastName">{t('Last Name')}</label>
                    <input value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                           type="text" className="form-control" id="lastName" aria-describedby="lastNameHelp"
                           placeholder={t('Last Name')}/>

                    {(authInit && !lastName) &&
                        <BannerError props={t("Please enter a valid last name")}/>
                    }

                </div>

                <div className="form-group mb-3">

                    <label htmlFor="email">{t('Email')} </label>
                    <input value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           type="text" className="form-control" id="email" aria-describedby="emailHelp"
                           placeholder="lalala@mail.com"/>

                    {(authInit && !email) &&
                        <BannerError props={t("Please enter a valid email")}/>
                    }

                </div>

                <div className="form-group mb-3">

                    <label htmlFor="dateOfBirth">{t('Date Of Birth')} </label>
                    <input value={dateOfBirth}
                           onChange={(e) => setDateOfBirth(e.target.value)}
                           type="date" className="form-control" id="dateOfBirth" aria-describedby="dateOfBirthHelp"
                           placeholder={t('valid date')}/>

                    {(authInit && !dateOfBirth) &&
                        <BannerError props={t("valid date")}/>
                    }

                </div>

                <div className="form-group mb-3">

                    <label htmlFor="username">{t('Username')} </label>
                    <input value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           type="text" className="form-control" id="username" aria-describedby="usernameHelp"
                           placeholder={t("Username")}/>

                    {(authInit && !username) &&
                        <BannerError props={t("Please enter a valid username")}/>
                    }

                </div>

                <div className="form-group mb-3">

                    <label htmlFor="password">{t('Password')} </label>
                    <input value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           type="password" className="form-control" id="password" aria-describedby="passwordHelp"
                           placeholder={t('Password')}/>

                    {(authInit && !password) &&
                        <BannerError props={t("Please enter a valid password")}/>
                    }

                </div>

                <div className="form-group mb-3">

                    <label htmlFor="confirmPassword">{t('Confirm Password')} </label>
                    <input value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           type="password" className="form-control" id="confirmPassword"
                           aria-describedby="confirmPasswordHelp"
                           placeholder={t('Password')}/>

                    {(authInit && (!confirmPassword || confirmPassword !== password)) &&
                        <BannerError props={t("Passwords should match")}/>
                    }

                </div>

                <button
                    type="submit"
                    className="btn btn-dark align-self-center">
                    {t('Sign Up')}
                </button>

                <div className="mt-3">
                    <Link className="text-light" to={"/login"}>{t('Already have an account? Login')}</Link>
                </div>

            </form>

        </div>
    );
}

export default Register;