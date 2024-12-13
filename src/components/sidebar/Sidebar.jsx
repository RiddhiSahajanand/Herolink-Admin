
// import React, { useState } from 'react'
// import { Link, useLocation } from 'react-router-dom';
// import dropdownicon from "../../../public/images/sidebar-on.png";
// import usericon from "../../../public/images/user (2).png";
// import categoryicon from "../../../public/images/category.png";
// import industryicon from "../../../public/images/industry.png";
// import businessicon from "../../../public/images/business.png";
// import consumericon from "../../../public/images/consumer.png";
// import startupicon from "../../../public/images/startup.png";
// import yourbusinessicon from "../../../public/images/your-business.png";
// import palnicon from "../../../public/images/plan.png";
// import newsicon from "../../../public/images/news.png";
// import articleicon from "../../../public/images/article.png";

// import Logout from '../modal/Logout/LogoutModal';


// const Sidebar = ({ mobileToggle }) => {

//     const adminRole = localStorage.getItem("adminType");
//     const location = useLocation();

//     const isActive = (path) => location.pathname === path;

//     const [logOutModalShow, setLogOutModalShow] = useState(false);
//     const [sidebarToggle, setSidebarToggle] = useState(false);
//     const [reportList, setReportList] = useState(false);
//     const [isShowDropdown, setIsShowDropdown] = useState(false);

//     const handleLogOutShow = () => setLogOutModalShow(true);
//     const handleClose = () => setLogOutModalShow(false);
//     const [isLogoutLoader, setIsLogoutLoader] = useState(false);
//     console.log('====================================');
//     console.log("sidebarToggle", sidebarToggle);
//     console.log('====================================');

//     const handleLogOut = async () => {
//         setIsLogoutLoader(true);

//         try {
//             const res = await Axios.get("/admin/logout", authHeader());

//             if (res?.data?.status) {
//                 toast.success("Sucessfully Logout!!");
//                 localStorage.removeItem("Admin-Token-Herolinks");
//                 handleClose();
//                 navigate("/");
//             }
//             else {
//                 toast.error(res.data.message);
//             }
//         } catch (err) {
//             if (err.response?.status === 401) {
//                 toast.error(err.response.data?.message);
//             }
//         } finally {
//             setIsLogoutLoader(false);
//         }
//     }


//     const handleReportList = () => {
//         setReportList(!reportList);
//     }
//     //handleShowDropdown
//     const handleShowDropdown = () => {
//         setIsShowDropdown(!isShowDropdown);
//     }


//     return (
//         <aside id="sidebar" className={`sidebar break-point-sm has-bg-image ${sidebarToggle ? "collapsed" : ""} ${mobileToggle ? "toggled" : ""}`}>
//             <Link id="btn-collapse" className="sidebar-collapser" onClick={() => setSidebarToggle(!sidebarToggle)}>
//                 <i className="ri-arrow-left-s-line" />
//             </Link>
//             <div className="sidebar-layout">
//                 <div className="sidebar-header">
//                     <Link to="/admin/dashboard" className="pro-sidebar-logo">
//                         <p className='main-title'>Herolinks</p>
//                     </Link>
//                 </div>
//                 <nav className="menu open-current-submenu">
//                     <ul>
//                         <li className={`menu-item ${isActive("/admin/dashboard") ? "active-menu-item" : ""}`}>
//                             <Link to="/admin/dashboard">
//                                 <span className="menu-icon">
//                                     <i className="ri-home-5-fill" />
//                                 </span>
//                                 <span className="menu-title">Dashboard</span>
//                             </Link>
//                         </li>
//                         <li className={`menu-item ${isActive("/admin/users") ? "active-menu-item" : ""}`}>
//                             <Link to="/admin/users">
//                                 <span className="menu-icon">
//                                     <img src={usericon} className='' />
//                                 </span>
//                                 <span className="menu-title">Users</span>
//                             </Link>
//                         </li>
//                         <li className={`menu-item ${isActive("/admin/article") ? "active-menu-item" : ""}`}>
//                             <Link to="/admin/article">
//                                 <span className="menu-icon">
//                                     <img src={articleicon} className='' />
//                                 </span>
//                                 <span className="menu-title">Article</span>
//                             </Link>
//                         </li>
//                         <li className={`menu-item ${isActive("/admin/news") ? "active-menu-item" : ""}`}>
//                             <Link to="/admin/news">
//                                 <span className="menu-icon">
//                                     <img src={newsicon} className='' />
//                                 </span>
//                                 <span className="menu-title">News</span>
//                             </Link>
//                         </li>
//                         <li className={`menu-item ${isActive("/admin/lesson") ? "active-menu-item" : ""}`}>
//                             <Link to="/admin/dashboard" onClick={handleShowDropdown} style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                 <span className='menu-title'>Master Tables</span>
//                                 <img src={dropdownicon} className={`${isShowDropdown ? 'hide-icon' : 'drop-icon'}`} />
//                             </Link>
//                         </li>
//                         {isShowDropdown === true &&
//                             <>
//                                 <li className={`menu-item ${isActive("/admin/category") ? "active-menu-item" : ""}`}>
//                                     <Link to="/admin/category">
//                                         <span className="menu-icon">
//                                             <img src={categoryicon} className='' />
//                                         </span>
//                                         <span className="menu-title">Category</span>
//                                     </Link>
//                                 </li>
//                                 <li className={`menu-item ${isActive("/admin/industry") ? "active-menu-item" : ""}`}>
//                                     <Link to="/admin/industry">
//                                         <span className="menu-icon">
//                                             {/* <i className="ri-book-2-fill" /> */}
//                                             <img src={industryicon} className='' />
//                                         </span>
//                                         <span className="menu-title">Industry</span>
//                                     </Link>
//                                 </li>
//                                 <li className={`menu-item ${isActive("/admin/business") ? "active-menu-item" : ""}`}>
//                                     <Link to="/admin/business">
//                                         <span className="menu-icon">
//                                             <img src={businessicon} className='' />
//                                         </span>
//                                         <span className="menu-title">Business Model</span>
//                                     </Link>
//                                 </li>
//                                 <li className={`menu-item ${isActive("/admin/consumer-segment") ? "active-menu-item" : ""}`}>
//                                     <Link to="/admin/consumer-segment">
//                                         <span className="menu-icon">
//                                             <img src={consumericon} className='' />
//                                         </span>
//                                         <span className="menu-title">Consumer Segment </span>
//                                     </Link>
//                                 </li>
//                                 <li className={`menu-item ${isActive("/admin/startup-stage") ? "active-menu-item" : ""}`}>
//                                     <Link to="/admin/startup-stage">
//                                         <span className="menu-icon">
//                                             <img src={startupicon} className='' />
//                                         </span>
//                                         <span className="menu-title">Startup Stage</span>
//                                     </Link>
//                                 </li>
//                                 <li className={`menu-item ${isActive("/admin/your-business-right-now") ? "active-menu-item" : ""}`}>
//                                     <Link to="/admin/your-business-right-now">
//                                         <span className="menu-icon">
//                                             <img src={yourbusinessicon} className='' />
//                                         </span>
//                                         <span className="menu-title">Your Business Right Now</span>
//                                     </Link>
//                                 </li>
//                                 <li className={`menu-item ${isActive("/admin/plan") ? "active-menu-item" : ""}`}>
//                                     <Link to="/admin/plan">
//                                         <span className="menu-icon">
//                                             <img src={palnicon} className='' />
//                                         </span>
//                                         <span className="menu-title">Plan</span>
//                                     </Link>
//                                 </li>
//                             </>
//                         }

//                         <li className="menu-item" onClick={() => {
//                             handleLogOutShow();
//                         }}>
//                             <Link to="/">
//                                 <span className="menu-icon">
//                                     <i className="ri-logout-box-r-line" />
//                                 </span>
//                                 <span className="menu-title">Logout</span>
//                             </Link>
//                         </li>
//                     </ul>
//                 </nav>
//             </div>
//             <Logout show={logOutModalShow} handleClose={handleClose} handleLogOut={handleLogOut} loading={isLogoutLoader} />

//         </aside>
//     )
// }

// export default Sidebar

import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import dropdownicon from "../../../public/images/sidebar-on.png";
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

import Logout from '../modal/Logout/LogoutModal';
import axiosInstance, { authHeader } from '../../helper/axios';
import toast from 'react-hot-toast';


const Sidebar = ({ mobileToggle, setMobileToggle }) => {
    const navigate = useNavigate();
    console.log('====================================');
    console.log("mobileToggle", mobileToggle);
    console.log('====================================');
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const [logOutModalShow, setLogOutModalShow] = useState(false);
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [reportList, setReportList] = useState(false);
    const [isShowDropdown, setIsShowDropdown] = useState(false);

    const handleLogOutShow = () => setLogOutModalShow(true);
    const handleClose = () => setLogOutModalShow(false);
    const [isLogoutLoader, setIsLogoutLoader] = useState(false);
    console.log('====================================');
    console.log("mobileToggleValue", mobileToggle, sidebarToggle);
    console.log('====================================');

    const handleLogOut = async () => {
        setIsLogoutLoader(true);

        try {
            const res = await axiosInstance.get("/admin/logout", authHeader());
            console.log('====================================');
            console.log("res", res);
            console.log('====================================');
            if (res?.data?.status === true) {
                toast.success("Sucessfully Logout!!");
                localStorage.removeItem("Admin-Token-Herolinks");
                handleClose();
                navigate("/");
            }
            else {
                toast.error(res.data.message);
            }
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error(err.response.data?.message);
            }
        } finally {
            setIsLogoutLoader(false);
        }
    }


    const handleReportList = () => {
        setReportList(!reportList);
    }
    //handleShowDropdown
    const handleShowDropdown = () => {
        setIsShowDropdown(!isShowDropdown);
    }

    const handleCloseSidebar = () => {
        setMobileToggle(!mobileToggle)

    }
    return (
        <aside id="sidebar" className={`sidebar break-point-sm has-bg-image ${sidebarToggle ? "collapsed" : ""} ${mobileToggle ? "toggled" : ""}`}>
            <Link id="btn-collapse" className="sidebar-collapser" onClick={() => setSidebarToggle(!sidebarToggle)}>
                <i className="ri-arrow-left-s-line" />
            </Link>
            <div className="sidebar-layout">
                <div className="sidebar-header">
                    <Link to="/admin/dashboard" className="pro-sidebar-logo">
                        {sidebarToggle === true ? <p className='main-title'>H</p> : <p className='main-title'>Herolinks</p>}
                    </Link>
                </div>
                <nav className="menu open-current-submenu">
                    <ul>
                        <li className={`menu-item ${isActive("/admin/dashboard") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar} >
                            <Link to="/admin/dashboard" >
                                <span className="menu-icon">
                                    <i className="ri-home-5-fill" />
                                </span>
                                <span className="menu-title">Dashboard</span>
                            </Link>
                        </li>
                        <li className={`menu-item ${isActive("/admin/users") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar}>
                            <Link to="/admin/users">
                                <span className="menu-icon">
                                    <img src={usericon} className='' />
                                </span>
                                <span className="menu-title">Users</span>
                            </Link>
                        </li>
                        <li className={`menu-item ${isActive("/admin/article") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar}>
                            <Link to="/admin/article">
                                <span className="menu-icon">
                                    <img src={articleicon} className='' />
                                </span>
                                <span className="menu-title">Article</span>
                            </Link>
                        </li>
                        <li className={`menu-item ${isActive("/admin/news") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar}>
                            <Link to="/admin/news">
                                <span className="menu-icon">
                                    <img src={newsicon} className='' />
                                </span>
                                <span className="menu-title">News</span>
                            </Link>
                        </li>
                        <li className={`menu-item ${isActive("/admin/lesson") ? "active-menu-item" : ""}`}>
                            <Link to="/admin/dashboard" onClick={handleShowDropdown} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {sidebarToggle === true ?
                                    <img src={dropdownicon} className={`${isShowDropdown ? 'hide-icon ms-2' : 'drop-icon ms-2'}`}
                                        data-bs-toggle="tooltip" data-bs-placement="top"
                                        data-bs-custom-class="custom-tooltip"
                                        data-bs-title="This top tooltip is themed via CSS variables." /> :
                                    <>
                                        <span className='menu-title'>Master Tables</span>
                                        <img src={dropdownicon} className={`${isShowDropdown ? 'hide-icon' : 'drop-icon'}`} />
                                    </>
                                }
                            </Link>
                        </li>
                        {isShowDropdown === true &&
                            <>
                                <li className={`menu-item ${isActive("/admin/category") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar}>
                                    <Link to="/admin/category">
                                        <span className="menu-icon">
                                            <img src={categoryicon} className='' />
                                        </span>
                                        <span className="menu-title">Category</span>
                                    </Link>
                                </li>
                                <li className={`menu-item ${isActive("/admin/industry") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar}>
                                    <Link to="/admin/industry">
                                        <span className="menu-icon">
                                            {/* <i className="ri-book-2-fill" /> */}
                                            <img src={industryicon} className='' />
                                        </span>
                                        <span className="menu-title">Industry</span>
                                    </Link>
                                </li>
                                <li className={`menu-item ${isActive("/admin/business") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar}>
                                    <Link to="/admin/business">
                                        <span className="menu-icon">
                                            <img src={businessicon} className='' />
                                        </span>
                                        <span className="menu-title">Business Model</span>
                                    </Link>
                                </li>
                                <li className={`menu-item ${isActive("/admin/consumer-segment") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar}>
                                    <Link to="/admin/consumer-segment">
                                        <span className="menu-icon">
                                            <img src={consumericon} className='' />
                                        </span>
                                        <span className="menu-title">Consumer Segment </span>
                                    </Link>
                                </li>
                                <li className={`menu-item ${isActive("/admin/startup-stage") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar}>
                                    <Link to="/admin/startup-stage">
                                        <span className="menu-icon">
                                            <img src={startupicon} className='' />
                                        </span>
                                        <span className="menu-title">Startup Stage</span>
                                    </Link>
                                </li>
                                <li className={`menu-item ${isActive("/admin/your-business-right-now") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar}>
                                    <Link to="/admin/your-business-right-now">
                                        <span className="menu-icon">
                                            <img src={yourbusinessicon} className='' />
                                        </span>
                                        <span className="menu-title">Your Business Right Now</span>
                                    </Link>
                                </li>
                                <li className={`menu-item ${isActive("/admin/plan") ? "active-menu-item" : ""}`} onClick={handleCloseSidebar}>
                                    <Link to="/admin/plan">
                                        <span className="menu-icon">
                                            <img src={palnicon} className='' />
                                        </span>
                                        <span className="menu-title">Plan</span>
                                    </Link>
                                </li>
                            </>
                        }

                        <li className="menu-item" onClick={() => {
                            handleLogOutShow();
                        }}>
                            <Link>
                                <span className="menu-icon">
                                    <i className="ri-logout-box-r-line" />
                                </span>
                                <span className="menu-title">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Logout show={logOutModalShow} handleClose={handleClose} handleLogOut={handleLogOut} loading={isLogoutLoader} />

        </aside >
    )
}

export default Sidebar