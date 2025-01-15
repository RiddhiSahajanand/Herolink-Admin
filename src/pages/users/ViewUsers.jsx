
// import React, { useEffect, useState } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import axiosInstance, { authHeader } from '../../helper/axios';
// import backicon from "../../../public/images/back.png"
// import downloadicon from "../../../public/images/download.png"

// const ViewUsers = () => {
//     const { state } = useLocation();
//     const navigate = useNavigate();
//     const [data, setData] = useState({});
//     const [loader, setLoader] = useState(false);

//     const handleGetUserDetail = async (searchItem) => {
//         setLoader(true)
//         try {

//             const res = await axiosInstance.get(`/admin/users/view/${state}`, authHeader());

//             if (res.data?.status) {
//                 setData(res?.data?.data);
//             }
//             else {
//                 console.log("err");
//             }
//         } catch (err) {
//             console.log("err", err);
//         } finally {
//             setLoader(false);
//         }
//     }


//     useEffect(() => {
//         handleGetUserDetail()
//     }, [state])

//     const handleBack = () => {
//         navigate("/admin/users")
//     }
//     return (
//         <>
//             <>
//                 <div>
//                     <div class="col-md-12 mt-5 ms-3">
//                         <div style={{ marginTop: 15 }}>
//                             <div className='back-btn' onClick={handleBack} s>
//                                 <p >
//                                     Back
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <section class="view-section  mt-5">
//                         <div class="content-new">
//                             <div class="row">
//                                 <div class="d-flex align-items-center justify-content-between gap-3">
//                                     <h2 class="mb-0">View User</h2>
//                                 </div>
//                                 {data?.role === "Founder" &&
//                                     <form class="row g-3">
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Register Details</p>
//                                             <div class="col-md-6 mb-2">
//                                                 <label for="phoneNumber" class="form-label">Mobile Number :</label>
//                                                 <input
//                                                     type="text"
//                                                     name='phoneNumber'
//                                                     id='mobileNumber'
//                                                     className="form-control"
//                                                     placeholder="Phone Number"
//                                                     value={data.mobileNumber || ""}
//                                                     readOnly
//                                                 />
//                                             </div>
//                                             <div class="col-md-6 col-sm-6 mb-2">
//                                                 <label for="city" class="form-label">Role :</label>
//                                                 <input type="text"
//                                                     name="city"
//                                                     id="role"
//                                                     class="form-control"
//                                                     value={data?.role || ""}
//                                                     disabled
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Startup name</p>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="yourname" class="form-label">Name :</label>
//                                                 <input type="text"
//                                                     name="yourname"
//                                                     id="yourname"
//                                                     class="form-control"
//                                                     value={data?.yourname}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="startUpName" class="form-label">Startup Name :</label>
//                                                 <input type="text"
//                                                     name="startUpName"
//                                                     id="startUpName"
//                                                     class="form-control"
//                                                     value={data?.startUpName}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="website" class="form-label">Website :</label>
//                                                 <input type="text"
//                                                     name="website"
//                                                     id="website"
//                                                     class="form-control"
//                                                     value={data?.website}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Startup Details</p>

//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="city" class="form-label">About Your Startup :</label>
//                                                 <input type="text"
//                                                     name="aboutYourStartup"
//                                                     id="aboutYourStartup"
//                                                     class="form-control"
//                                                     value={data?.roaboutYourStartuple}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="problemStatement" class="form-label">Problem Statement :</label>
//                                                 <input type="text"
//                                                     name="problemStatement"
//                                                     id="problemStatement"
//                                                     class="form-control"
//                                                     value={data?.problemStatement}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Industry</p>

//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="industry" class="form-label">Industry :</label>
//                                                 <input type="text"
//                                                     name="industry"
//                                                     id="industry"
//                                                     class="form-control"
//                                                     value={data?.industry}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="businessModel" class="form-label">Business :</label>
//                                                 <input type="text"
//                                                     name="businessModel"
//                                                     id="businessModel"
//                                                     class="form-control"
//                                                     value={data?.businessModel}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Stage</p>

//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="whatStageIsYourBusinessAtRightNow" class="form-label">your business at right now :</label>
//                                                 <input type="text"
//                                                     name="whatStageIsYourBusinessAtRightNow"
//                                                     id="whatStageIsYourBusinessAtRightNow"
//                                                     class="form-control"
//                                                     value={data?.whatStageIsYourBusinessAtRightNow}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="yourConsumerSegment" class="form-label">consumer segment :</label>
//                                                 <input type="text"
//                                                     name="yourConsumerSegment"
//                                                     id="yourConsumerSegment"
//                                                     class="form-control"
//                                                     value={data?.yourConsumerSegment}
//                                                     readOnly />
//                                             </div>
//                                         </div>

//                                         <div className="row g-3 step-box">
//                                             <p className='step-title'>Pitch</p>
//                                             <div className="col-md-4 col-sm-6 mb-2">
//                                                 <label htmlFor="pitchDeck" className="form-label">Pitch deck:</label>
//                                                 <div class="input-group">
//                                                     <input
//                                                         type="text"
//                                                         name="pitchDeck"
//                                                         id="pitchDeck"
//                                                         className="form-control"
//                                                         value={data?.pitchDeck || ''}
//                                                         readOnly
//                                                     />
//                                                     <a href={data?.pitchDeck || ""} class="download-view" target="_blank" >
//                                                         <img src={downloadicon} alt="" />
//                                                     </a>
//                                                 </div>
//                                             </div>

//                                             <div className="col-md-4 col-sm-6 mb-2">
//                                                 <label htmlFor="pitchVideo" className="form-label">Pitch video:</label>
//                                                 <div className="d-flex flex-column">
//                                                     {/* Video Player */}
//                                                     {data?.pitchVideo && (
//                                                         <video
//                                                             controls
//                                                             style={{ width: '100%', maxHeight: '240px' }}
//                                                         >
//                                                             <source src={data.pitchVideo} type="video/mp4" />
//                                                             Your browser does not support the video tag.
//                                                         </video>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 }
//                                 {data?.role === "Investor" &&
//                                     <form class="row g-3">
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Register Detail</p>

//                                             <div class="col-md-4 mb-2">
//                                                 <label for="phoneNumber" class="form-label">Mobile Number :</label>
//                                                 <input
//                                                     type="text"
//                                                     name='phoneNumber'
//                                                     className="form-control"
//                                                     placeholder="Phone Number"
//                                                     value={data.mobileNumber || ""}
//                                                     readOnly
//                                                 />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="city" class="form-label">Role :</label>
//                                                 <input type="text"
//                                                     name="city"
//                                                     id="role"
//                                                     class="form-control"
//                                                     value={data?.role}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Investment journey</p>

//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="numberOfStartupsInvestedIn" class="form-label">startups investemnt :</label>
//                                                 <input type="text"
//                                                     name="numberOfStartupsInvestedIn"
//                                                     id="numberOfStartupsInvestedIn"
//                                                     class="form-control"
//                                                     value={data?.numberOfStartupsInvestedIn}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="investedAmount" class="form-label">Invested amount :</label>
//                                                 <input type="text"
//                                                     name="investedAmount"
//                                                     id="investedAmount"
//                                                     class="form-control"
//                                                     value={data?.investedAmount}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="ticketSize" class="form-label">Ticket Size :</label>
//                                                 <input type="text"
//                                                     name="ticketSize"
//                                                     id="ticketSize"
//                                                     class="form-control"
//                                                     value={data?.ticketSize}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Industry </p>

//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="industry" class="form-label">Industry :</label>
//                                                 <input type="text"
//                                                     name="industry"
//                                                     id="industry"
//                                                     class="form-control"
//                                                     value={data?.industry}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="businessModel" class="form-label">Business model :</label>
//                                                 <input type="text"
//                                                     name="businessModel"
//                                                     id="businessModel"
//                                                     class="form-control"
//                                                     value={data?.businessModel}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="stage" class="form-label">Stage :</label>
//                                                 <input type="text"
//                                                     name="stage"
//                                                     id="stage"
//                                                     class="form-control"
//                                                     value={data?.stage}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                     </form>
//                                 }
//                                 {data?.role === "Mentor" &&
//                                     <form class="row g-3">
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Registration Detail </p>

//                                             <div class="col-md-4 mb-2">
//                                                 <label for="phoneNumber" class="form-label">Mobile Number :</label>
//                                                 <input
//                                                     type="text"
//                                                     name='phoneNumber'
//                                                     className="form-control"
//                                                     placeholder="Phone Number"
//                                                     value={data.mobileNumber || ""}
//                                                     readOnly
//                                                 />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="city" class="form-label">Role :</label>
//                                                 <input type="text"
//                                                     name="city"
//                                                     id="role"
//                                                     class="form-control"
//                                                     value={data?.role}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Mentorship journey </p>

//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="numberOfStartupsMentored" class="form-label">Startups mentor :</label>
//                                                 <input type="text"
//                                                     name="numberOfStartupsMentored"
//                                                     id="numberOfStartupsMentored"
//                                                     class="form-control"
//                                                     value={data?.numberOfStartupsMentored}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="category" class="form-label">Category :</label>
//                                                 <input type="text"
//                                                     name="category"
//                                                     id="category"
//                                                     class="form-control"
//                                                     value={data?.category}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="timeCommitment" class="form-label">Time commitment :</label>
//                                                 <input type="text"
//                                                     name="timeCommitment"
//                                                     id="timeCommitment"
//                                                     class="form-control"
//                                                     value={data?.timeCommitment}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Industry </p>

//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="plans" class="form-label">Plans :</label>
//                                                 <input type="text"
//                                                     name="plans"
//                                                     id="plans"
//                                                     class="form-control"
//                                                     value={data?.plans}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="industry" class="form-label">Industry :</label>
//                                                 <input type="text"
//                                                     name="industry"
//                                                     id="industry"
//                                                     class="form-control"
//                                                     value={data?.industry}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="businessModel" class="form-label">Business model :</label>
//                                                 <input type="text"
//                                                     name="businessModel"
//                                                     id="businessModel"
//                                                     class="form-control"
//                                                     value={data?.businessModel}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Stage </p>

//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="startupStage" class="form-label">Startup stage :</label>
//                                                 <input type="text"
//                                                     name="startupStage"
//                                                     id="startupStage"
//                                                     class="form-control"
//                                                     value={data?.startupStage}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="consumerSegment" class="form-label">Consumer segment :</label>
//                                                 <input type="text"
//                                                     name="consumerSegment"
//                                                     id="consumerSegment"
//                                                     class="form-control"
//                                                     value={data?.consumerSegment}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                     </form>
//                                 }
//                                 {data?.role === "Vendor" &&
//                                     <form class="row g-3">
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Registration Detail </p>

//                                             <div class="col-md-4 mb-2">
//                                                 <label for="phoneNumber" class="form-label">Mobile Number :</label>
//                                                 <input
//                                                     type="text"
//                                                     name='phoneNumber'
//                                                     className="form-control"
//                                                     placeholder="Phone Number"
//                                                     value={data.mobileNumber || ""}
//                                                     readOnly
//                                                 />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="city" class="form-label">Role :</label>
//                                                 <input type="text"
//                                                     name="city"
//                                                     id="role"
//                                                     class="form-control"
//                                                     value={data?.role}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Vendorship journey </p>

//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="totalNumberOfProject" class="form-label">projects number :</label>
//                                                 <input type="text"
//                                                     name="totalNumberOfProject"
//                                                     id="totalNumberOfProject"
//                                                     class="form-control"
//                                                     value={data?.totalNumberOfProject}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="segment" class="form-label">Segment :</label>
//                                                 <input type="text"
//                                                     name="segment"
//                                                     id="segment"
//                                                     class="form-control"
//                                                     value={data?.segment}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                         <div class="row g-3 step-box">
//                                             <p className='step-title'>Email </p>

//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="email" class="form-label">Email :</label>
//                                                 <input type="text"
//                                                     name="email"
//                                                     id="email"
//                                                     class="form-control"
//                                                     value={data?.email}
//                                                     readOnly />
//                                             </div>
//                                             <div class="col-md-4 col-sm-6 mb-2">
//                                                 <label for="isEmailVerify" class="form-label">Is Email Verified :</label>
//                                                 <input type="text"
//                                                     name="isEmailVerify"
//                                                     id="isEmailVerify"
//                                                     class="form-control"
//                                                     value={data?.isEmailVerify}
//                                                     readOnly />
//                                             </div>
//                                         </div>
//                                     </form>
//                                 }
//                             </div>
//                         </div>
//                     </section >
//                 </div>
//             </>
//         </>
//     )
// }

// export default ViewUsers;

// Step vise Disaply Change 

import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance, { authHeader } from '../../helper/axios';
import downloadicon from "../../../public/images/download.png"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Avatar from 'react-avatar';

const ViewUsers = () => {
    const { state } = useLocation();

    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [loader, setLoader] = useState(false);

    const handleGetUserDetail = async (searchItem) => {
        setLoader(true)
        try {

            const res = await axiosInstance.get(`/admin/users/view/${state}`, authHeader());

            if (res.data?.status) {
                setData(res?.data?.data);
            }
            else {
                console.log("err");
            }
        } catch (err) {
            console.log("err", err);
        } finally {
            setLoader(false);
        }
    }


    useEffect(() => {
        handleGetUserDetail()
    }, [state])

    const handleBack = () => {
        navigate("/admin/users")
    }

    return (
        <>
            <div>
                <div class="col-md-12 mt-5 ms-3">
                    <div style={{ marginTop: 15 }}>
                        <div className='back-btn' onClick={handleBack} >
                            <p>
                                Back
                            </p>
                        </div>
                    </div>
                </div>
                <section class="view-section mt-5">
                    <div class="content-new">
                        <div class="row">
                            <div class="d-flex align-items-center justify-content-between gap-3">
                                <h2 class="mb-0">View User</h2>
                                <div class="mb-0">
                                    {data?.profile && !data.profile.includes('octet-stream') && !data.profile.includes('.pdf') ? (
                                        <Avatar src={data.profile} round size="40" />
                                    ) : data?.yourname ? (
                                        <Avatar name={data.yourname.slice(0, 1) + ' ' + data.yourname.slice(1, 2)} round size="50" color="#4A5DF9" />
                                    ) : null}
                                </div>

                            </div>
                            {data?.role === "Founder" &&
                                <form class="row g-3">
                                    <div class="row g-3 step-box">
                                        <p className='step-title'>Register Details</p>
                                        <div class="col-md-6 mb-2">
                                            <label for="phoneNumber" class="form-label">Mobile Number:</label>
                                            <input
                                                type="text"
                                                name='phoneNumber'
                                                id='mobileNumber'
                                                className="form-control"
                                                placeholder="Phone Number"
                                                value={data.mobileNumber || ""}
                                                readOnly
                                            />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="city" class="form-label">Role:</label>
                                            <input type="text"
                                                name="city"
                                                id="role"
                                                class="form-control"
                                                value={data?.role || ""}
                                                disabled
                                                readOnly />
                                        </div>
                                    </div>
                                    <div class="row g-3 step-box">
                                        <p className='step-title'>Profile Details</p>

                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="name" class="form-label">Name:</label>
                                            <input type="text"
                                                name="name"
                                                id="name"
                                                class="form-control"
                                                value={data?.yourname}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="email" class="form-label">Email:</label>
                                            <input type="text"
                                                name="email"
                                                id="email"
                                                class="form-control"
                                                value={data?.email}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="startUpName" class="form-label">Startup Name:</label>
                                            <input type="text"
                                                name="startUpName"
                                                id="startUpName"
                                                class="form-control"
                                                value={data?.startUpName}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="website" class="form-label">Website:</label>
                                            <input type="text"
                                                name="website"
                                                id="website"
                                                class="form-control"
                                                value={data?.website}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="city" class="form-label">About Your Startup:</label>
                                            <textarea type="text"
                                                name="aboutYourStartup"
                                                id="aboutYourStartup"
                                                class="form-control"
                                                value={data?.aboutYourStartup}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="problemStatement" class="form-label">Problem Statement:</label>
                                            <textarea type="text"
                                                name="problemStatement"
                                                id="problemStatement"
                                                class="form-control"
                                                value={data?.problemStatement}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="industry" class="form-label">Industry:</label>
                                            <input type="text"
                                                name="industry"
                                                id="industry"
                                                class="form-control"
                                                value={data?.industry}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="businessModel" class="form-label">Business:</label>
                                            <input type="text"
                                                name="businessModel"
                                                id="businessModel"
                                                class="form-control"
                                                value={data?.businessModel}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="whatStageIsYourBusinessAtRightNow" class="form-label">Your Business at Right Now:</label>
                                            {/* <input type="text"
                                                    name="whatStageIsYourBusinessAtRightNow"
                                                    id="whatStageIsYourBusinessAtRightNow"
                                                    class="form-control"
                                                    // value={data?.whatStageIsYourBusinessAtRightNow}
                                                    value={`${data?.businessAtRightNowObj?.name} - ${data?.businessAtRightNowObj?.description} (Status: ${data?.businessAtRightNowObj?.status || "N/A"})`}
                                                    readOnly /> */}
                                            {/* {
                                                    data?.whatStageIsYourBusinessAtRightNow && (
                                                        <div className='listing'>
                                                            <div className='form-label'>{data?.businessAtRightNowObj?.name}</div>
                                                            <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.businessAtRightNowObj?.description }} />
                                                        </div>
                                                    )
                                                } */}
                                            {
                                                data?.businessAtRightNowObj === null ?
                                                    <div className='listing-blanck'>
                                                        <div className='form-label'>{data?.businessAtRightNowObj?.name}</div>
                                                        <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.businessAtRightNowObj?.description }} />
                                                    </div>
                                                    :
                                                    <div className='listing '>
                                                        <div className='form-label'>{data?.businessAtRightNowObj?.name}</div>
                                                        <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.businessAtRightNowObj?.description }} />
                                                    </div>
                                            }

                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="yourConsumerSegment" class="form-label">Consumer Segment:</label>
                                            {/* <input type="text"
                                                    name="yourConsumerSegment"
                                                    id="yourConsumerSegment"
                                                    class="form-control"
                                                    value={data?.yourConsumerSegment}
                                                    readOnly /> */}

                                            {
                                                data?.yourConsumerSegmentObj === null ?
                                                    <div className='listing-blanck'>
                                                        <div className='form-label'>{data?.yourConsumerSegmentObj?.name}</div>
                                                        {/* <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.yourConsumerSegmentObj?.description }} /> */}
                                                    </div> :
                                                    <div className='listing'>
                                                        <div className='form-label'>{data?.yourConsumerSegmentObj?.name}</div>
                                                        {/* <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.yourConsumerSegmentObj?.description }} /> */}
                                                    </div>
                                            }

                                        </div>
                                        <div className="col-md-6 col-sm-6 mb-2">
                                            <label htmlFor="pitchDeck" className="form-label">Pitch Deck:</label>
                                            <div class="input-group">
                                                <input
                                                    type="text"
                                                    name="pitchDeck"
                                                    id="pitchDeck"
                                                    className="form-control"
                                                    value={data?.pitchDeck || ''}
                                                    readOnly
                                                />
                                                <a href={data?.pitchDeck || ""} class="download-view" target="_blank" >
                                                    <img src={downloadicon} alt="" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="col-md-6 col-sm-6 mb-2">
                                            <label htmlFor="pitchVideo" className="form-label">Pitch Video:</label>
                                            <div className="d-flex flex-column">
                                                <div class="input-group">
                                                    <input
                                                        type="text"
                                                        name="pitchDeck"
                                                        id="pitchDeck"
                                                        className="form-control"
                                                        value={data?.pitchVideo || ''}
                                                        readOnly
                                                    />
                                                    <a href={data?.pitchVideo || ""} class="download-view" target="_blank" >
                                                        <img src={downloadicon} alt="" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="linkedin" class="form-label">Linkedin:</label>
                                            <input type="text"
                                                name="linkedin"
                                                id="linkedin"
                                                class="form-control"
                                                value={data?.linkedin}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="twitter" class="form-label">Twitter:</label>
                                            <input type="text"
                                                name="twitter"
                                                id="twitter"
                                                class="form-control"
                                                value={data?.twitter}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="instagram" class="form-label">Instagram:</label>
                                            <input type="text"
                                                name="instagram"
                                                id="instagram"
                                                class="form-control"
                                                value={data?.instagram}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="facebook" class="form-label">Facebook:</label>
                                            <input type="text"
                                                name="facebook"
                                                id="facebook"
                                                class="form-control"
                                                value={data?.facebook}
                                                readOnly />
                                        </div>

                                    </div>
                                </form>
                            }
                            {data?.role === "Investor" &&
                                <form class="row g-3">
                                    <div class="row g-3 step-box">
                                        <p className='step-title'>Register Details</p>

                                        <div class="col-md-6 mb-2">
                                            <label for="phoneNumber" class="form-label">Mobile Number:</label>
                                            <input
                                                type="text"
                                                name='phoneNumber'
                                                className="form-control"
                                                placeholder="Phone Number"
                                                value={data.mobileNumber || ""}
                                                readOnly
                                            />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="city" class="form-label">Role:</label>
                                            <input type="text"
                                                name="city"
                                                id="role"
                                                class="form-control"
                                                value={data?.role}
                                                readOnly />
                                        </div>
                                        <div className='col-md-6 col-sm-6 mb-2'>
                                            <label htmlFor="city" className='form-label'>New Role</label>

                                        </div>
                                    </div>
                                    <div class="row g-3 step-box">
                                        <p className='step-title'>Profile Details</p>

                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="name" class="form-label">Name:</label>
                                            <input type="text"
                                                name="name"
                                                id="name"
                                                class="form-control"
                                                value={data?.yourname}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="email" class="form-label">Email:</label>
                                            <input type="text"
                                                name="email"
                                                id="email"
                                                class="form-control"
                                                value={data?.email}
                                                readOnly />
                                        </div>
                                        <div class="col-md-4 col-sm-6 mb-2">
                                            <label for="numberOfStartupsInvestedIn" class="form-label">Startups Investment:</label>
                                            <input type="text"
                                                name="numberOfStartupsInvestedIn"
                                                id="numberOfStartupsInvestedIn"
                                                class="form-control"
                                                value={data?.numberOfStartupsInvestedIn}
                                                readOnly />
                                        </div>
                                        <div class="col-md-4 col-sm-6 mb-2">
                                            <label for="investedAmount" class="form-label">Invested Amount:</label>
                                            <input type="text"
                                                name="investedAmount"
                                                id="investedAmount"
                                                class="form-control"
                                                value={data?.investedAmount}
                                                readOnly />
                                        </div>
                                        <div class="col-md-4 col-sm-6 mb-2">
                                            <label for="ticketSize" class="form-label">Ticket Size:</label>
                                            <input type="text"
                                                name="ticketSize"
                                                id="ticketSize"
                                                class="form-control"
                                                value={data?.ticketSize}
                                                readOnly />
                                        </div>
                                        <div class="col-md-4 col-sm-6 mb-2">
                                            <label for="industry" class="form-label">Industry:</label>
                                            <input type="text"
                                                name="industry"
                                                id="industry"
                                                class="form-control"
                                                value={data?.industry}
                                                readOnly />
                                        </div>
                                        <div class="col-md-4 col-sm-6 mb-2">
                                            <label for="businessModel" class="form-label">Business Model:</label>
                                            <input type="text"
                                                name="businessModel"
                                                id="businessModel"
                                                class="form-control"
                                                value={data?.businessModel}
                                                readOnly />
                                        </div>
                                        <div class="col-md-4 col-sm-6 mb-2">
                                            <label for="stage" class="form-label">Stage:</label>
                                            {/* <input type="text"
                                                    name="stage"
                                                    id="stage"
                                                    class="form-control"
                                                    value={data?.stage}
                                                    readOnly /> */}
                                            {
                                                // <div className='listing'>
                                                //     <div className='form-label'>{data?.stageObj?.name}</div>
                                                // </div>
                                                <input type="text"
                                                    name="stage"
                                                    id="stage"
                                                    class="form-control"
                                                    value={data?.stageObj?.name}
                                                    readOnly />
                                            }

                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="linkedin" class="form-label">Linkedin:</label>
                                            <input type="text"
                                                name="linkedin"
                                                id="linkedin"
                                                class="form-control"
                                                value={data?.linkedin}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="twitter" class="form-label">Twitter:</label>
                                            <input type="text"
                                                name="twitter"
                                                id="twitter"
                                                class="form-control"
                                                value={data?.twitter}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="instagram" class="form-label">Instagram:</label>
                                            <input type="text"
                                                name="instagram"
                                                id="instagram"
                                                class="form-control"
                                                value={data?.instagram}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="facebook" class="form-label">Facebook:</label>
                                            <input type="text"
                                                name="facebook"
                                                id="facebook"
                                                class="form-control"
                                                value={data?.facebook}
                                                readOnly />
                                        </div>
                                    </div>

                                </form>
                            }
                            {data?.role === "Mentor" &&
                                <form class="row g-3">
                                    <div class="row g-3 step-box">
                                        <p className='step-title'>Registration Details </p>

                                        <div class="col-md-6 mb-2">
                                            <label for="phoneNumber" class="form-label">Mobile Number:</label>
                                            <input
                                                type="text"
                                                name='phoneNumber'
                                                className="form-control"
                                                placeholder="Phone Number"
                                                value={data.mobileNumber || ""}
                                                readOnly
                                            />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="city" class="form-label">Role:</label>
                                            <input type="text"
                                                name="city"
                                                id="role"
                                                class="form-control"
                                                value={data?.role}
                                                readOnly />
                                        </div>
                                    </div>
                                    <div class="row g-3 step-box">
                                        <p className='step-title'>Profile Details </p>

                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="name" class="form-label">Name:</label>
                                            <input type="text"
                                                name="name"
                                                id="name"
                                                class="form-control"
                                                value={data?.yourname}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="email" class="form-label">Email:</label>
                                            <input type="text"
                                                name="email"
                                                id="email"
                                                class="form-control"
                                                value={data?.email}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="numberOfStartupsMentored" class="form-label">Startups Mentor:</label>
                                            <input type="text"
                                                name="numberOfStartupsMentored"
                                                id="numberOfStartupsMentored"
                                                class="form-control"
                                                value={data?.numberOfStartupsMentored}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="category" class="form-label">Category:</label>
                                            <input type="text"
                                                name="category"
                                                id="category"
                                                class="form-control"
                                                value={data?.category}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="timeCommitment" class="form-label">Time Commitment:</label>
                                            <input type="text"
                                                name="timeCommitment"
                                                id="timeCommitment"
                                                class="form-control"
                                                value={data?.timeCommitment}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="plans" class="form-label">Plans:</label>
                                            {/* <input type="text"
                                                    name="plans"
                                                    id="plans"
                                                    class="form-control"
                                                    value={data?.plans}
                                                    readOnly /> */}
                                            {data?.plansObj === null ?
                                                <div className='listing-blanck'>
                                                    <div className='form-label'>{data?.plansObj?.name}</div>
                                                    <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.plansObj?.description }} />
                                                </div> :
                                                <div className='listing'>
                                                    <div className='form-label'>{data?.plansObj?.name}</div>
                                                    <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.plansObj?.description }} />
                                                </div>
                                            }
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="mentorshipObj" class="form-label">Mentor Name:</label>
                                            <input type="text"
                                                name="mentorshipObj"
                                                id="mentorshipObj"
                                                class="form-control"
                                                value={data?.mentorshipObj?.name || ""}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="industry" class="form-label">Industry:</label>
                                            <input type="text"
                                                name="industry"
                                                id="industry"
                                                class="form-control"
                                                value={data?.industry}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="businessModel" class="form-label">Business Model:</label>
                                            <input type="text"
                                                name="businessModel"
                                                id="businessModel"
                                                class="form-control"
                                                value={data?.businessModel}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="startupStage" class="form-label">Startup Stage:</label>
                                            {/* <input type="text"
                                                    name="startupStage"
                                                    id="startupStage"
                                                    class="form-control"
                                                    value={data?.startupStage}
                                                    readOnly /> */}

                                            {
                                                data?.startupStageObj === null ?
                                                    <div className='listing-blanck'>
                                                        <div className='form-label'>{data?.startupStageObj?.name}</div>
                                                        <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.startupStageObj?.description }} />
                                                    </div> :
                                                    <div className='listing'>
                                                        <div className='form-label'>{data?.startupStageObj?.name}</div>
                                                        <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.startupStageObj?.description }} />
                                                    </div>
                                            }
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="consumerSegment" class="form-label">Consumer Segment:</label>
                                            {/* <input type="text"
                                                    name="consumerSegment"
                                                    id="consumerSegment"
                                                    class="form-control"
                                                    value={data?.yourConsumerSegment}
                                                    readOnly /> */}
                                            {
                                                data?.consumerSegmentObj === null ?
                                                    <div className='listing-blanck'>
                                                        <div className='form-label'>{data?.consumerSegmentObj?.name}</div>
                                                        <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.consumerSegmentObj?.description }} />
                                                    </div> :
                                                    <div className='listing'>
                                                        <div className='form-label'>{data?.consumerSegmentObj?.name}</div>
                                                        <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.consumerSegmentObj?.description }} />
                                                    </div>
                                            }
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="linkedin" class="form-label">Linkedin:</label>
                                            <input type="text"
                                                name="linkedin"
                                                id="linkedin"
                                                class="form-control"
                                                value={data?.linkedin}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="twitter" class="form-label">Twitter:</label>
                                            <input type="text"
                                                name="twitter"
                                                id="twitter"
                                                class="form-control"
                                                value={data?.twitter}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="instagram" class="form-label">Instagram:</label>
                                            <input type="text"
                                                name="instagram"
                                                id="instagram"
                                                class="form-control"
                                                value={data?.instagram}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="facebook" class="form-label">Facebook:</label>
                                            <input type="text"
                                                name="facebook"
                                                id="facebook"
                                                class="form-control"
                                                value={data?.facebook}
                                                readOnly />
                                        </div>
                                    </div>
                                </form>
                            }
                            {data?.role === "Vendor" &&
                                <form class="row g-3">
                                    <div class="row g-3 step-box">
                                        <p className='step-title'>Registration Details </p>

                                        <div class="col-md-6 mb-2">
                                            <label for="phoneNumber" class="form-label">Mobile Number:</label>
                                            <input
                                                type="text"
                                                name='phoneNumber'
                                                className="form-control"
                                                placeholder="Phone Number"
                                                value={data.mobileNumber || ""}
                                                readOnly
                                            />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="city" class="form-label">Role:</label>
                                            <input type="text"
                                                name="city"
                                                id="role"
                                                class="form-control"
                                                value={data?.role}
                                                readOnly />
                                        </div>
                                    </div>
                                    <div class="row g-3 step-box">
                                        <p className='step-title'>Profile Details </p>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="name" class="form-label">Name:</label>
                                            <input type="text"
                                                name="name"
                                                id="name"
                                                class="form-control"
                                                value={data?.yourname}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="email" class="form-label">Email:</label>
                                            <input type="text"
                                                name="email"
                                                id="email"
                                                class="form-control"
                                                value={data?.email}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="totalNumberOfProject" class="form-label">Projects Number:</label>
                                            <input type="text"
                                                name="totalNumberOfProject"
                                                id="totalNumberOfProject"
                                                class="form-control"
                                                value={data?.totalNumberOfProject}
                                                readOnly />
                                        </div>
                                        <div class="col-md-6 col-sm-6 mb-2">
                                            <label for="segment" class="form-label">Segment:</label>
                                            {/* <input type="text"
                                                    name="segment"
                                                    id="segment"
                                                    class="form-control"
                                                    value={data?.segment}
                                                    readOnly /> */}

                                            {
                                                data?.segmentObj === null ?
                                                    <div className='listing-blanck'>
                                                        <div className='form-label'>{data?.segmentObj?.name}</div>
                                                        {/* <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.segmentObj?.description }} /> */}
                                                    </div> :
                                                    <div className='listing'>
                                                        <div className='form-label'>{data?.segmentObj?.name}</div>
                                                        {/* <div className='form-label' dangerouslySetInnerHTML={{ __html: data?.segmentObj?.description }} /> */}
                                                    </div>
                                            }
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="linkedin" class="form-label">Linkedin:</label>
                                            <input type="text"
                                                name="linkedin"
                                                id="linkedin"
                                                class="form-control"
                                                value={data?.linkedin}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="twitter" class="form-label">Twitter:</label>
                                            <input type="text"
                                                name="twitter"
                                                id="twitter"
                                                class="form-control"
                                                value={data?.twitter}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="instagram" class="form-label">Instagram:</label>
                                            <input type="text"
                                                name="instagram"
                                                id="instagram"
                                                class="form-control"
                                                value={data?.instagram}
                                                readOnly />
                                        </div>
                                        <div class="col-md-3 col-sm-6 mb-2">
                                            <label for="facebook" class="form-label">Facebook:</label>
                                            <input type="text"
                                                name="facebook"
                                                id="facebook"
                                                class="form-control"
                                                value={data?.facebook}
                                                readOnly />
                                        </div>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default ViewUsers;