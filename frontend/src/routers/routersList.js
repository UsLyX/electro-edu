//роуты логина
import Authorization from '../pages/login/authorization/Authorization'
import Registration from "../pages/login/registration/firstPage/Registration";
import Role from '../pages/login/registration/role/Role'
import UserInfo from "../pages/login/registration/userInfo/UserInfo";

//роуты админа
import Admin from '../pages/admin/Admin';
import AdminStatement from '../pages/admin/statement/AdminStatement';
import Predmets from '../pages/admin/predmets/Predmets';
import ChoiceClass from '../pages/admin/predmets/choiceClass/ChoiceClass';
import EditPredmets from '../pages/admin/predmets/editPredmets/EditPredmets';

//роуты учителя
import Teacher from '../pages/teacher/Teacher';
import TeacherPersonalAccont from '../pages/teacher/teacherPersonalAccount/TeacherPersonalAccont';
import Journal from '../pages/teacher/journal/Journal';
import SchoolClasses from '../pages/teacher/journal/schoolClasses/SchoolClasses';
import TeacherPredmets from '../pages/teacher/journal/predmets/Predmets';

//роуты студента
import Student from '../pages/student/Student';
import StudentPersonalAccount from '../pages/student/studentPersonalAccount/PersonalAccount';
import MyPredmets from '../pages/student/predmets/MyPredmets';
import MyClass from '../pages/student/myClass/MyClass';
import Teachers from '../pages/student/teachers/Teachers';

//роут страницы "не найдено"
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
            },
            {
                path: 'predmets',
                component: <Predmets />,
                isAuth: true,
                childs: [
                    {
                        path: 'choiceClass',
                        component: <ChoiceClass />,
                        isAuth: true,
                    },
                    {
                        path: 'editPredmets/:class',
                        component: <EditPredmets />,
                        isAuth: true,
                    }
                ]
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
                component: <StudentPersonalAccount />,
                isAuth: true,
            },
            {
                path: 'predmets',
                component: <MyPredmets />,
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
        childs: [
            {
                path: 'personalAccount',
                component: <TeacherPersonalAccont />,
                isAuth: true
            },
            {
                path: 'journal',
                component: <Journal />,
                isAuth: true,
                childs: [
                    {
                        path: 'classes',
                        component: <SchoolClasses />,
                        isAuth: true
                    },
                    {
                        path: 'predmets/:class',
                        component: <TeacherPredmets />,
                        isAuth: true
                    }
                ]
            }
        ]
    },
    {
        path: '/notFound',
        component: <NotFound />,
        notFound: true
    }
]