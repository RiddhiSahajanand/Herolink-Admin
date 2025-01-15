import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosInstance, { authHeader } from "../../helper/axios";
import toast from "react-hot-toast";
import AddFeed from "../../components/modal/feed/AddFeed";
import EditFeed from "../../components/modal/feed/EditFeed";
import DeleteModal from "../../components/modal/delete/DeleteModal";

const Feed = () => {
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [error, setError] = useState(null);

    const [editData, setEditData] = useState({});
    const [deleteId, setDeleteId] = useState(null);

    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const deleteText = "feed";

    const handleClose = () => {
        setAddShow(false);
        setEditShow(false);
        setDeleteShow(false);
    }

    const fetchFeedData = async () => {
        try {
            const data = await axiosInstance.get(`admin/feed/list`, authHeader());
            if (data?.data?.status === true) {
                setData(data?.data?.data);
            } else {
                toast.error(data?.message);
            }
        } catch (err) {
            setError(err?.message)
        }
    }

    useEffect(() => {
        fetchFeedData()
    }, [])

    const handleDelete = async () => {
        try {
            const data = await axiosInstance.delete(`admin/feed/delete/${deleteId}`, authHeader());
            if (data?.status === 200) {
                toast.success(data?.data?.message);
                fetchFeedData();
                handleClose();
            } else {
                toast.error(data?.data?.message)
            }
        } catch (err) {
            setError(err?.message)
        }
    }

    const columns = [
        {
            name: 'ID',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '70px',
            left: true
        },
        {
            name: 'Feed',
            selector: row => row.title,
            left: true,
            width: '300px'
        },
        {
            name: 'Uploaded By',
            selector: row => row.uploadedBy,
            width: '170px'
        },
        {
            name: 'Created Date',
            selector: row => new Date(row?.createdAt).toISOString().split('T')[0],
            left: true,
            width: '150px'
        },
        {
            name: 'Status',
            selector: row => <div className={`m-auto ${row.status === "active" ? "active" : "in-active"}`}>
                {row.status}
            </div>,
            width: '130px'
        },
        // {
        //     name: '',
        //     selector: row => <div></div>,
        // },
        {
            name: 'Action',
            selector: row => (
                <div className="d-flex align-items-center">
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                        <img src="/images/pencil-white.png" alt="" onClick={() => {
                            setEditShow(true);
                            setEditData(row);
                        }} style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
                        <img src="/images/delete-white.png" alt="" onClick={() => {
                            setDeleteShow(true);
                            setDeleteId(row?.id);
                        }} style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
                    </div>
                </div>
            ),
            // width: '100px'
        },
    ]
    const customStyles = {
        table: {
            style: {
                backgroundColor: "#fff0",
                color: '#FFF'
            },
        },
        rows: {
            style: {
                backgroundColor: '#fff0',
                color: '#FFF',
                paddingLeft: '20px',
                paddingRight: '20px'
            }
        },
        headRow: {
            style: {
                backgroundColor: '#fff0',
                color: '#FFF',
                fontSize: '14px',
                borderBottom: '1px solid #FFF',
                paddingLeft: '20px',
                paddingRight: '20px'
            }
        },
        headerCell: {
            style: {
                backgroundColor: '#fff0',
                color: '#FFF',
                fontSize: '14px',
                borderBottom: '1px solid #FFF',
                paddingLeft: '20px',
                paddingRight: '20px'
            }
        },
        pagination: {
            style: {
                backgroundColor: '#fff0',
                color: '#FFF'
            }
        }
    }

    const filteredData = data?.filter((item) => {
        const searchStr = `${item.title}`.toLowerCase();
        return searchStr.includes(filterText.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filteredData.slice(startIndex, startIndex + perPage);

    const handlePageChange = page => {
        setCurrentPage(page);
    }

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    }

    if (error) return <h1>{error}</h1>;

    return (
        <>
            <section className="categorylist-section mt-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <h4 className="mb-0 page-title">Feed</h4>
                                    <button className="add-btn" type="button" onClick={() => setAddShow(true)}>
                                        + Add New Feed
                                    </button>
                                </div>
                            </div>
                            <div className="card-body atble-responsive">
                                <div className="row mt-2 justify-content-between">
                                    <div className="col-md-auto ms-auto">
                                        <div className="dt-search d-flex align-items-center gap-1">
                                            <label htmlFor="dt-search-0" className="search-label">Search:</label>
                                            <input
                                                type="search"
                                                className="form-control form-control-sm"
                                                id="dt-search-0"
                                                value={filterText}
                                                onChange={(e) => setFilterText(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <DataTable
                                        columns={columns}
                                        data={currentPageData}
                                        progressComponent={<h1>Loading...</h1>}
                                        pagination
                                        paginationServer
                                        paginationTotalRows={filteredData.length}
                                        paginationPerPage={perPage}
                                        onChangeRowsPerPage={handleRowsPerPageChange}
                                        onChangePage={handlePageChange}
                                        theme="dark"
                                        customStyles={customStyles}
                                        noDataComponent={
                                            <div style={{
                                                backgroundColor: '#1b19198f',
                                                color: '#FFF',
                                                padding: '20px',
                                                textAlign: 'center',
                                                width: '100%'
                                            }}>
                                                No Data found
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AddFeed show={addShow} handleClose={handleClose} fetchFeedData={fetchFeedData} />
                <EditFeed show={editShow} handleClose={handleClose} fetchFeedData={fetchFeedData} editData={editData} />
                <DeleteModal show={deleteShow} handleClose={handleClose} handleDelete={handleDelete} text={deleteText} />
            </section>
        </>
    )
}
export default Feed;