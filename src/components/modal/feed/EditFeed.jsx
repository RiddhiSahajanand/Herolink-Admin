import React, { useEffect, useState } from 'react';
import axiosInstance, { authHeader } from '../../../helper/axios';
import toast from 'react-hot-toast';
import Modal from "react-bootstrap/Modal";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const initialState = {
    id: "",
    title: "",
    description: "",
    status: "active",
    uploadedBy: ""
};

const EditFeed = ({ show, handleClose, editData, fetchFeedData }) => {

    const [formData, setFormData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editorData, setEditorData] = useState('');

    useEffect(() => {
        if (editData) {
            setFormData({
                id: editData?.id,
                title: editData?.title,
                description: editData?.description,
                status: editData?.status,
                uploadedBy: editData?.uploadedBy
            });
        }
    }, [editData]);

    const handleChangeEditor = (event, editor) => {
        const data = editor.getData();

        setEditorData(data);
        setFormData((prev) => ({
            ...prev,
            description: data
        }));
    };

    // handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                title: formData?.title,
                description: formData?.description,
                status: formData?.status,
                uploadedBy: formData?.uploadedBy
            }
            const data = await axiosInstance.put(`/admin/feed/edit/${formData?.id}`, payload, authHeader());


            if (data?.data?.status === true) {
                toast.success("Feed edited successfully!");
                setFormData(initialState);
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
                <h5 className="modal-title" id="deleteModalLabel">Edit Feed</h5>

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
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="name" className="form-label">Description: *</label>
                            <CKEditor
                                name="description"
                                id="description"
                                editor={ClassicEditor}
                                data={formData?.description}
                                value={formData?.description}
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
                                onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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

export default EditFeed;