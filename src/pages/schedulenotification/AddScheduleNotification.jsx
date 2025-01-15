import React, { useState } from 'react'
import axiosInstance, { authImageHeader } from '../../helper/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { message } from 'antd';

const initialState = {
    title: "",
    message: "",
    description: "",
    type: "Singleday",
    startDate: "",
    endDate: "",
    time: '',
    status: "active"
}

const AddScheduleNotification = () => {

    const token = localStorage.getItem("adminToken");

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [editorData, setEditorData] = useState('');

    const handleInputChange = (e) => {
        const { name, value, files, type } = e.target;

        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleChangeEditor = (event, editor) => {
        const data = editor.getData();

        setEditorData(data);
        setFormData((prev) => ({
            ...prev,
            description: data
        }));
    };
    const currentDate = new Date().toISOString().split("T")[0];

    const formatDateToDisplay = (date) => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    const formatTo24Hour = (time) => {
        const [hours, minutes] = time.split(":");
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    };
    // Format date from dd/mm/yyyy to yyyy-mm-dd for input value
    const formatDateToISO = (date) => {
        if (!date) return "";
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const endDate = formData?.type === "Singleday" ? formatDateToDisplay(currentDate) : formData?.endDate;

        const payload = {
            title: formData?.title,
            message: formData?.message,
            description: formData?.description,
            type: formData?.type,
            startDate: formData?.startDate,
            endDate: endDate,
            time: formData?.time,
            status: formData?.status
        }

        try {
            const data = await axiosInstance.post(`/admin/schedule-notification/add`, payload, authImageHeader());
            if (data?.data?.status === true) {
                toast.success("Successfully Schedule Notification Created!");
                setFormData(initialState);
                setEditorData('')
                navigate('/admin/notification');
            } else {
                toast.error(data?.data?.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleBack = () => {
        navigate("/admin/notification");
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
                <section class="view-section  mt-5">
                    <div class="content-new">
                        <div class="row">
                            <div class="d-flex align-items-center justify-content-between gap-3">
                                <h2 class="mb-0">Add Notification</h2>
                            </div>

                            <form class="row g-3" onSubmit={handleSubmit}>
                                {/* <div class="row g-3 step-box"> */}
                                <div class="col-md-12 mb-2">
                                    <label htmlFor="title" className="form-label">Title: *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        id="title"
                                        placeholder="Enter Title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div class="col-md-12 mb-2">
                                    <label htmlFor="message" className="form-label">Message: *</label>
                                    <input
                                        type="text"
                                        name="message"
                                        className="form-control"
                                        id="message"
                                        placeholder="Enter Message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div class="col-md-12 mb-2">
                                    <label htmlFor="name" className="form-label">Description: *</label>
                                    <CKEditor
                                        name="description"
                                        id="description"
                                        editor={ClassicEditor}
                                        data={editorData}
                                        className="form-control"
                                        required
                                        onChange={handleChangeEditor}
                                        style={{
                                            padding: '15px'
                                        }}
                                    />
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label className="form-label">Type: *</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                id="typesingle"
                                                value="Singleday"
                                                checked={formData.type === "Singleday"}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label" htmlFor="assignmentTrue">Singleday</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="type"
                                                id="typeevery"
                                                value="Everyday"
                                                checked={formData.type === "Everyday"}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label" htmlFor="assignmentFalse">Everyday</label>
                                        </div>
                                    </div>
                                </div>
                                {formData?.type === "Singleday" ?
                                    <div class="col-md-6 mb-2">
                                        <label htmlFor="startDate" className="form-label">Start Date: *</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            className="form-control"
                                            id="startDate"
                                            placeholder="Select StartDate"
                                            value={formatDateToISO(formData.startDate)}
                                            onChange={(e) => {
                                                const isoDate = e.target.value;
                                                const formattedDate = formatDateToDisplay(isoDate);
                                                setFormData({ ...formData, startDate: formattedDate });
                                            }}
                                            min={currentDate}
                                            required
                                        />
                                    </div>
                                    :
                                    <>
                                        <div class="col-md-6 mb-2">
                                            <label htmlFor="startDate" className="form-label">Start Date: *</label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                className="form-control"
                                                id="startDate"
                                                placeholder="Enter Start Date"
                                                value={formatDateToISO(formData.startDate)} // Set value in ISO format
                                                onChange={(e) => {
                                                    const isoDate = e.target.value; // yyyy-mm-dd
                                                    const formattedDate = formatDateToDisplay(isoDate);
                                                    setFormData({ ...formData, startDate: formattedDate });
                                                }}
                                                min={currentDate}
                                                required
                                            />
                                        </div>
                                        <div class="col-md-6 mb-2">
                                            <label htmlFor="endDate" className="form-label">End Date: *</label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                className="form-control"
                                                id="endDate"
                                                placeholder="Enter End Date"
                                                value={formatDateToISO(formData.endDate)} // Set value in ISO format
                                                onChange={(e) => {
                                                    const isoDate = e.target.value;
                                                    const formattedDate = formatDateToDisplay(isoDate);
                                                    setFormData({ ...formData, endDate: formattedDate });
                                                }}
                                                required
                                                min={formatDateToISO(formData.startDate)}
                                            />
                                        </div></>
                                }
                                <div>
                                    <div class="col-md-6 mb-2">
                                        <label htmlFor="time" className="form-label">Time: *</label>
                                        <input
                                            type="time"
                                            name="time"
                                            className="form-control"
                                            id="time"
                                            placeholder="Enter Time"
                                            value={formData.time}
                                            onChange={(e) => {
                                                const inputTime = e.target.value; // Get the value entered
                                                const formattedTime = formatTo24Hour(inputTime);
                                                handleInputChange(e); // Update formData
                                            }} required
                                        />
                                    </div>
                                </div>
                                <div class="col-md-12 mb-2">
                                    <label className="form-label">Status: *</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="status"
                                                id="assignmentTrue"
                                                value="active"
                                                checked={formData.status === "active"}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label" htmlFor="assignmentTrue">Active</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="status"
                                                id="assignmentFalse"
                                                value="inactive"
                                                checked={formData.status === "inactive"}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-check-label" htmlFor="assignmentFalse">InActive</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="back-btn submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default AddScheduleNotification