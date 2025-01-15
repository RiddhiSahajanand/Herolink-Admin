import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import Users from './pages/users/Users';
import ViewUsers from './pages/users/ViewUsers';
import Category from './pages/category/Category';
import Industry from './pages/Industry/Industry';
import Business from './pages/business/Business';
import Consumer from './pages/consumer/Consumer';
import Startupstage from './pages/startupstage/StartupStage';
import BusinessRightNow from './pages/businessRightNow/BusinessRightNow';
import Plan from './pages/plan/Plan';
import Article from './pages/article/Article';
import News from './pages/news/News';
import AddArticle from './pages/article/AddArticle';
import EditArticle from './pages/article/EditArticle';
import AddNews from './pages/news/AddNews';
import EditNews from './pages/news/EditNews';
import Schedulenotification from './pages/schedulenotification/Schedulenotification';
import AddScheduleNotification from './pages/schedulenotification/AddScheduleNotification';
import EditScheduleNotification from './pages/schedulenotification/EditScheduleNotification';
import Feed from './pages/feed/Feed';
import MentorShip from './pages/mentorShip/MentorShip';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/users/view" element={<ViewUsers />} />
                <Route path="/admin/category" element={<Category />} />
                <Route path="/admin/industry" element={<Industry />} />
                <Route path='/admin/business' element={<Business />} />
                <Route path='/admin/consumer-segment' element={<Consumer />} />
                <Route path='/admin/startup-stage' element={<Startupstage />} />
                <Route path='/admin/your-business-right-now' element={<BusinessRightNow />} />
                <Route path='/admin/plan' element={<Plan />} />
                <Route path='/admin/mentor-ship' element={<MentorShip />} />
                <Route path='/admin/article' element={<Article />} />
                <Route path='/admin/add-article' element={<AddArticle />} />
                <Route path='/admin/edit-article' element={<EditArticle />} />
                <Route path='/admin/news' element={<News />} />
                <Route path='/admin/add-news' element={<AddNews />} />
                <Route path='/admin/edit-news' element={<EditNews />} />
                <Route path='/admin/notification' element={<Schedulenotification />} />
                <Route path='/admin/add-notification' element={<AddScheduleNotification />} />
                <Route path='/admin/edit-notification' element={<EditScheduleNotification />} />
                <Route path='/admin/feed' element={<Feed />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes; 