
import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import toast from 'react-hot-toast';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axiosInstance, { authHeader, authImageHeader } from '../../../helper/axios';

const initialState = {
    id: "",
    title: "",
    description: "",
    image: '',
    status: "active"
};

const EditNews = ({ show, handleClose, editData, fetchNewsData }) => {

    const [formData, setFormData] = useState(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editorData, setEditorData] = useState('');
    const [imagePreview, setImagePreview] = useState(null); // For image preview
    useEffect(() => {
        if (editData) {
            setFormData({
                id: editData?.id,
                title: editData?.title,
                description: editData?.description,
                status: editData?.status,
                image: editData?.image
            });
            setImagePreview(editData?.image);
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
        const { name, value, files, type } = e.target;
        if (files && files.length > 0) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "radio" ? value : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                id: formData?.id,
                title: formData?.title,
                description: formData?.description,
                status: formData?.status,
                image: formData?.image
            }
            const data = await axiosInstance.put(`/admin/news/edit/${formData?.id}`, payload, authImageHeader());


            if (data?.data?.status === true) {
                toast.success("News edited successfully!");
                setFormData(initialState);
                setEditorData('');
                handleClose();
                fetchNewsData();
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
                <h4>Edit News</h4>
                <button type="button" className="btn-close text-reset" onClick={handleClose} />
            </div>
            <div className="offcanvas-body">
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
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image: *</label>
                        {imagePreview && (
                            <div className="mt-3 mb-3">
                                <img
                                    src={imagePreview}
                                    alt="Slide Preview"
                                    style={{ width: '100%', height: '200px' }}
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            id="image"
                            accept="image/*"
                            onChange={handleChange}
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
                                <label className="form-check-label" htmlFor="statusInactive">InActive</label>
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

export default EditNews;
