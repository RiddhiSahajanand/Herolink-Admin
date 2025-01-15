import React, { useEffect, useState } from 'react'
import usericon from "../../../public/images/user (2).png";
import categoryicon from "../../../public/images/category.png";
import industryicon from "../../../public/images/industry.png";
import businessicon from "../../../public/images/business.png";
import consumericon from "../../../public/images/consumer.png";
import startupicon from "../../../public/images/startup.png";
import yourbusinessicon from "../../../public/images/your-business.png";
import palnicon from "../../../public/images/plan.png";
import newsicon from "../../../public/images/news.png";
import articleicon from "../../../public/images/article.png";
import feedicon from "../../../public/images/feedicon.png";
import mentorship from "../../../public/images/mentorship.png";



import axiosInstance, { authHeader } from '../../helper/axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const fetchDashboardData = async () => {
        try {

            const data = await axiosInstance.get(`/admin/dashboard`, authHeader());

            if (data?.data?.status === true) {
                setData(data?.data?.data);
            } else {
                toast.error(data?.message);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);
    return (
        <>
            <div className="row gx-5 mb-5">
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/users')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Users
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.userCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={usericon} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/category')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Category
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.categoryCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={categoryicon} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/industry')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Industry
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.industryCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={industryicon} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/business')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Business Model
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.businessCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={businessicon} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/consumer-segment')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Consumer Segment
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.consumerSegmentCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={consumericon} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/startup-stage')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Startup Stage
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.startupStageCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={startupicon} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/your-business-right-now')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Your Business Right Now
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.yourBusinessAtRightNowCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={yourbusinessicon} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/plan')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Plan
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.planCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={palnicon} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/mentor-ship')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Mentorship
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.mentorshipCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={mentorship} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/feed')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Feed
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.feedCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={feedicon} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/article')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total Article
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.articleCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={articleicon} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-md-6 col-12 mt-5 dashboard-card" onClick={() => navigate('/admin/news')}>
                    <div className="shadow border-0">
                        <div className="card-body-dashboard">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 fw-semibold  text-md d-block mb-2" >
                                        Total News
                                    </span>
                                    <span className="mb-0 card-title">
                                        {data?.newsCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape text-white text-lg rounded-circle dashboard-icon">
                                        <img src={newsicon} alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard;