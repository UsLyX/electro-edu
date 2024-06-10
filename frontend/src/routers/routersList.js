import Authorization from '../pages/login/authorization/Authorization'
import Registration from "../pages/login/registration/firstPage/Registration";
import Role from '../pages/login/registration/role/Role'
import UserInfo from "../pages/login/registration/userInfo/UserInfo";
import Admin from '../pages/admin/Admin';
import AdminStatement from '../pages/admin/statement/AdminStatement';
import Teacher from '../pages/teacher/Teacher';
import Student from '../pages/student/Student';
import PersonalAccount from '../pages/student/PersonalAccount/PersonalAccount';
import MyClass from '../pages/student/myClass/MyClass';
import Teachers from '../pages/student/teachers/Teachers';
import NotFound from '../pages/NotFound';

export const list = [
    {
        path: '/authorization',
        component: <Authorization />,
        isAuth: false,
    },
    {
        path: '/registration',
        component: <Registration />,
        isAuth: false,
    },
    {
        path: '/registration/role',
        component: <Role />,
        isAuth: false,
    },
    {
        path: '/registration/info',
        component: <UserInfo />,
        isAuth: false,
    },
    {
        path: '/admin',
        component: <Admin />,
        isAuth: true,
        childs: [
            {
                path: 'statements',
                component: <AdminStatement />,
                isAuth: true,
            }
        ]
    },
    {
        path: '/student',
        component: <Student />,
        isAuth: true,
        childs: [
            {
                path: 'personalAccount',
                component: <PersonalAccount />,
                isAuth: true,
            },
            {
                path: 'class',
                component: <MyClass />,
                isAuth: true,
            },
            {
                path: 'teachers',
                component: <Teachers />,
                isAuth: true,
            }
        ]
    },
    {
        path: '/teacher',
        component: <Teacher />,
        isAuth: true,
    },
    {
        path: '/notFound',
        component: <NotFound />,
        notFound: true
    }
]