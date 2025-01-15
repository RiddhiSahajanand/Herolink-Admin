import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { authImageHeader } from '../../helper/axios';

const initialState = {
    id: "",
    title: "",
    description: "",
    image: '',
    uploadedBy: "",
    status: "active"
};

const EditArticle = () => {

    const editData = JSON.parse(localStorage.getItem("edit-article"));

    const navigate = useNavigate();

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
                uploadedBy: editData?.uploadedBy,
                image: editData?.image
            });
            setImagePreview(editData?.image);
        }
    }, []);

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
                uploadedBy: formData?.uploadedBy,
                image: formData?.image
            }
            const data = await axiosInstance.put(`/admin/article/edit/${formData?.id}`, payload, authImageHeader());

            if (data?.data?.status === true) {
                toast.success("Article edited successfully!");
                setFormData(initialState);
                setEditorData('');

                navigate('/admin/article');
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
        navigate("/admin/article")
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
                                <h2 class="mb-0">Edit Article</h2>
                            </div>

                            <form class="row g-3" onSubmit={handleSubmit}>
                                {/* <div class="row g-3"> */}
                                {/* <p className='step-title'>Register Details</p> */}
                                <div class="col-md-12 mb-2">
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

                                <div class="col-md-12 col-sm-6 mb-2">
                                    <label htmlFor="image" className="form-label">Image: *</label>

                                    {imagePreview && (
                                        <div className="mt-3 mb-0">
                                            <img
                                                src={imagePreview}
                                                alt="Slide Preview img-fluid"
                                                style={{
                                                    // width: '100%', 
                                                    // height: '280px' ,
                                                    width: '350px',
                                                    height: '200px',
                                                    marginBottom: '10px'
                                                }}
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
                                    <span className='recomanded-text'>Recommended size: 1000 X 700px</span>

                                </div>
                                {/* </div> */}

                                <div class="col-md-12 mb-2">
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
                                <div class="col-md-12 mb-2">
                                    <label htmlFor="uploadedBy" className="form-label">Uploaded By: *</label>
                                    <div>
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
                                </div>
                                <div class="col-md-12 mb-2">
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

export default EditArticle