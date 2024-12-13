
import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axiosInstance, { authHeader } from '../../../helper/axios';
import toast from 'react-hot-toast';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const initialState = {
    id: "",
    name: "",
    description: "",
    status: "active"
};

const EditConsumer = ({ show, handleClose, editData, fetchConsumerData }) => {

    const [formData, setFormData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editorData, setEditorData] = useState('');

    useEffect(() => {
        if (editData) {
            setFormData({
                id: editData?.id,
                name: editData?.name,
                description: editData?.description,
                status: editData?.status
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
                id: formData?.id,
                name: formData?.name,
                description: formData?.description,
                status: formData?.status
            }
            const data = await axiosInstance.put(`/admin/consumer-segment/edit/${formData?.id}`, payload, authHeader());


            if (data?.data?.status === true) {
                toast.success("Consumer Segment edited successfully!");
                setFormData(initialState);
                handleClose();
                fetchConsumerData();
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
        <Offcanvas show={show} onHide={handleClose} placement='end' className="add-offcanvas">
            <div className="offcanvas-header">
                <h4>Edit Consumer Segment</h4>
                <button type="button" className="btn-close text-reset" onClick={handleClose} />
            </div>
            <div className="offcanvas-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name: *</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            placeholder="Enter Name"
                            value={formData.name}
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
                        <label className="form-label">Status: *</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status"
                                    id="statusActive"
                                    value="active"
                                    checked={formData.status === "active"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="statusActive">Active</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="status"
                                    id="statusInactive"
                                    value="inactive"
                                    checked={formData.status === "inactive"}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="statusInactive">Inactive</label>
                            </div>
                        </div>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </Offcanvas>
    );
};

export default EditConsumer;