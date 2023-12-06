import {Outlet, Navigate} from 'react-router-dom'
import {useEffect, useMemo, useState} from "react";
import {log} from "util";
import {User} from "../interfaces/User";


const PrivateRoutes = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useMemo(() => {
        if (localStorage.getItem("user")) {
            const user: User = JSON.parse(localStorage.getItem("user")!);
            setUser(user);
            const isAdmin = user?.roles.some(role => role.roleType === "ADMIN");
            setIsAdmin(isAdmin);
        }
    }, []);

    return (
        isAdmin ? <Outlet/> : <Navigate to="/login"/>
    );
}
export default PrivateRoutes;