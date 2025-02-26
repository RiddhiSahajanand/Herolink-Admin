
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axiosInstance, { authHeader, authImageHeader } from '../../../helper/axios';
import toast from 'react-hot-toast';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const initialState = {
    title: "",
    description: "",
    image: '',
    status: "active"
}

const AddArticle = ({ show, handleClose, fetchArticleData }) => {
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
            image: formData?.image,
            status: formData?.status
        }

        try {

            const data = await axiosInstance.post(`/admin/article/add`, payload, authImageHeader());
            if (data?.data?.status === true) {
                toast.success("Successfully Article Added!");
                setFormData(initialState);
                setEditorData('');
                handleClose();
                fetchArticleData();
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
        <>
            <Offcanvas show={show} onHide={handleClose} placement="end" className="add-offcanvas">
                <div className="offcanvas-header">
                    <h4 id="offcanvasAddorderLabel">Add Article</h4>
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
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image: *</label>
                            <input
                                type="file"
                                name="image"
                                className="form-control"
                                id="image"
                                accept="image/*"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
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
                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </Offcanvas>
        </>
    );
};

export default AddArticle;

