import Root from './Root';

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
import Questions from '../pages/teacher/journal/questions/Questions';
import AddQuestion from '../pages/teacher/journal/addQuestion/AddQuestion';
import ViewQuestion from '../pages/teacher/journal/viewQuestion/ViewQuestion';
import ViewJournal from '../pages/teacher/journal/viewJournal/ViewJournal';

//роуты студента
import Student from '../pages/student/Student';
import StudentPersonalAccount from '../pages/student/studentPersonalAccount/PersonalAccount';
import MyPredmets from '../pages/student/predmets/MyPredmets';
import StudentQuestions from '../pages/student/studentQuestions/StudentQuestions';
import AddAnswer from '../pages/student/addAnswer/AddAnswer';
import ViewAnswer from '../pages/student/viewAnswer/ViewAnswer';
import MyScores from '../pages/student/MyScores/MyScores';
import MyClass from '../pages/student/myClass/MyClass';
import Teachers from '../pages/student/teachers/Teachers';

//роут страницы "не найдено"
import NotFound from '../pages/NotFound';

export const list = [
    {
        path: '/',
        component: <Root />,
        childs: [
            {
                path: 'authorization',
                component: <Authorization />,
                isAuth: false,
            },
            {
                path: 'registration',
                component: <Registration />,
                isAuth: false,
            },
            {
                path: 'registration/role',
                component: <Role />,
                isAuth: false,
            },
            {
                path: 'registration/info',
                component: <UserInfo />,
                isAuth: false,
            },
            {
                admin: true,
                path: 'admin',
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
                student: true,
                path: 'student',
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
                        path: 'predmets/:id/questions',
                        component: <StudentQuestions />,
                        isAuth: true,
                    },
                    {
                        path: 'predmets/:id/questions/addAnswer/:question',
                        component: <AddAnswer />,
                        isAuth: true,
                    },
                    {
                        path: 'predmets/:id/questions/viewAnswer/:question',
                        component: <ViewAnswer />,
                        isAuth: true,
                    },
                    {
                        path: 'scores',
                        component: <MyScores />,
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
                teacher: true,
                path: 'teacher',
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
                            },
                            {
                                path: ':class/viewJournal/:lesson',
                                component: <ViewJournal />,
                                isAuth: true
                            },
                            {
                                path: ':class/questions/:lesson',
                                component: <Questions />,
                                isAuth: true
                            },
                            {
                                path: ':class/questions/:lesson/viewQuestion/:question',
                                component: <ViewQuestion />,
                                isAuth: true
                            },
                            {
                                path: ':class/questions/:lesson/addQuestion',
                                component: <AddQuestion />,
                                isAuth: true
                            }
                        ]
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
    // {
    //     path: '/authorization',
    //     component: <Authorization />,
    //     isAuth: false,
    // },
    // {
    //     path: '/registration',
    //     component: <Registration />,
    //     isAuth: false,
    // },
    // {
    //     path: '/registration/role',
    //     component: <Role />,
    //     isAuth: false,
    // },
    // {
    //     path: '/registration/info',
    //     component: <UserInfo />,
    //     isAuth: false,
    // },
    // {
    //     admin: true,
    //     path: '/admin',
    //     component: <Admin />,
    //     isAuth: true,
    //     childs: [
    //         {
    //             path: 'statements',
    //             component: <AdminStatement />,
    //             isAuth: true,
    //         },
    //         {
    //             path: 'predmets',
    //             component: <Predmets />,
    //             isAuth: true,
    //             childs: [
    //                 {
    //                     path: 'choiceClass',
    //                     component: <ChoiceClass />,
    //                     isAuth: true,
    //                 },
    //                 {
    //                     path: 'editPredmets/:class',
    //                     component: <EditPredmets />,
    //                     isAuth: true,
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     path: '/student',
    //     component: <Student />,
    //     isAuth: true,
    //     childs: [
    //         {
    //             path: 'personalAccount',
    //             component: <StudentPersonalAccount />,
    //             isAuth: true,
    //         },
    //         {
    //             path: 'predmets',
    //             component: <MyPredmets />,
    //             isAuth: true,
    //         },
    //         {
    //             path: 'predmets/:id/questions',
    //             component: <StudentQuestions />,
    //             isAuth: true,
    //         },
    //         {
    //             path: 'predmets/:id/questions/addAnswer/:question',
    //             component: <AddAnswer />,
    //             isAuth: true,
    //         },
    //         {
    //             path: 'predmets/:id/questions/viewAnswer/:question',
    //             component: <ViewAnswer />,
    //             isAuth: true,
    //         },
    //         {
    //             path: 'scores',
    //             component: <MyScores />,
    //             isAuth: true,
    //         },
    //         {
    //             path: 'class',
    //             component: <MyClass />,
    //             isAuth: true,
    //         },
    //         {
    //             path: 'teachers',
    //             component: <Teachers />,
    //             isAuth: true,
    //         }
    //     ]
    // },
    // {
    //     path: '/teacher',
    //     component: <Teacher />,
    //     isAuth: true,
    //     childs: [
    //         {
    //             path: 'personalAccount',
    //             component: <TeacherPersonalAccont />,
    //             isAuth: true
    //         },
    //         {
    //             path: 'journal',
    //             component: <Journal />,
    //             isAuth: true,
    //             childs: [
    //                 {
    //                     path: 'classes',
    //                     component: <SchoolClasses />,
    //                     isAuth: true
    //                 },
    //                 {
    //                     path: 'predmets/:class',
    //                     component: <TeacherPredmets />,
    //                     isAuth: true
    //                 },
    //                 {
    //                     path: ':class/viewJournal/:lesson',
    //                     component: <ViewJournal />,
    //                     isAuth: true
    //                 },
    //                 {
    //                     path: ':class/questions/:lesson',
    //                     component: <Questions />,
    //                     isAuth: true
    //                 },
    //                 {
    //                     path: ':class/questions/:lesson/viewQuestion/:question',
    //                     component: <ViewQuestion />,
    //                     isAuth: true
    //                 },
    //                 {
    //                     path: ':class/questions/:lesson/addQuestion',
    //                     component: <AddQuestion />,
    //                     isAuth: true
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     path: '/notFound',
    //     component: <NotFound />,
    //     notFound: true
    // }
]