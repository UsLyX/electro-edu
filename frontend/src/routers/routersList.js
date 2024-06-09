import Registration from "../pages/login/registration/firstPage/Registration";
import Role from '../pages/login/registration/role/Role'
import UserInfo from "../pages/login/registration/userInfo/UserInfo";

export const list = [
    {
        path: '/registration',
        component: Registration,
        isAuth: false,
    },
    {
        path: '/registration/role',
        component: Role,
        isAuth: false,
    },
    {
        path: '/registration/info',
        component: UserInfo,
        isAuth: false,
    }
]