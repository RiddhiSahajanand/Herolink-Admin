import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import axiosInstance, { authHeader } from '../../../helper/axios';
import toast from 'react-hot-toast';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const initialState = {
    title: "",
    description: "",
    uploadedBy: "",
    status: "active"
}

const AddFeed = ({ show, handleClose, fetchFeedData }) => {

    const token = localStorage.getItem("adminToken");

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            title: formData?.title,
            description: formData?.description,
            uploadedBy: formData?.uploadedBy,
            status: formData?.status
        }

        try {

            const data = await axiosInstance.post(`/admin/feed/add`, payload, authHeader());
            if (data?.data?.status === true) {
                toast.success("Successfully Feed Added!");
                setFormData(initialState);
                setEditorData('')
                handleClose();
                fetchFeedData();
            } else {
                toast.error(data?.data?.message);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Modal centered show={show} onHide={handleClose} className="form-modal">
            <div className="modal-header" closeButton>
                <h5 className="modal-title" id="deleteModalLabel">Add Feed</h5>

                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
                <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
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

                        <div className='mb-3'>
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
                        <div className="mb-3">
                            <label htmlFor="uploadedBy" className="form-label">Uploaded By: *</label>
                            <input
                                type="text"
                                name="uploadedBy"
                                className="form-control"
                                id="uploadedBy"
                                placeholder="Enter Uploaded By"
                                value={formData.uploadedBy}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
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

                        <div className="modal-footer">
                            {/* <button type="button" className="delete-btn" onClick={handleClose} >Close</button> */}

                            <button type="submit" className="back-btn submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default AddFeed;