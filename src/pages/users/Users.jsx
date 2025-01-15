import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosInstance, { authHeader } from "../../helper/axios";
import toast from "react-hot-toast";
import { Form } from "react-bootstrap";
import DeleteModal from "../../components/modal/delete/DeleteModal";
import { Link } from "react-router-dom";
import { Flex, Progress } from 'antd';
import Avatar from 'react-avatar';

const Users = () => {
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [detailData, setDetailData] = useState({});

    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [detailShow, setDetailShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const deleteText = "user";

    const handleClose = () => {
        setAddShow(false);
        setEditShow(false);
        setDeleteShow(false);
        setDetailShow(false);
    }
    const token = localStorage.getItem("adminToken");

    const fetchUsersData = async () => {
        setIsLoading(true);
        try {
            // const params = new URLSearchParams({
            //     search: filterText,
            // });
            const data = await axiosInstance.get(`/admin/users/list`, authHeader());

            if (data?.data?.status === true) {
                setData(data?.data?.data);
                setIsLoading(false);
            } else {
                toast.error(data?.message);
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsersData();
    }, []);

    const handleDelete = async () => {
        try {

            const data = await axiosInstance.delete(`/admin/users/remove/${deleteId}`, authHeader());
            if (data?.status === 200) {
                toast.success(data?.data?.message);
                fetchUsersData();
                handleClose();
            } else {
                toast.error(data?.data?.message);
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            const response = await axiosInstance.get(`/admin/users/status-change/${id}`, authHeader());
            if (response.status === 200) {
                setData(prevData =>
                    prevData.map(item =>
                        item.id === id ? { ...item, status: newStatus } : item
                    )
                );
                toast.success(response?.data?.message);
                fetchUsersData();
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                toast.error('Unauthorized. Please log in again.');
            } else {
                toast.error('Failed to update status');
            }
        }
    };
    const getInitials = (name) => {
        console.log("name", name);
        if (!name) return '';
        return name?.slice(0, 2).toLowerCase();
    };
    const columns = [
        {
            name: 'ID',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '70px',
            left: true,
        },
        {
            name: 'Profile',
            selector: row => (
                <div className="py-2">
                    {row?.profile && !row.profile.includes('octet-stream') && !row.profile.includes('.pdf') ? (
                        <Avatar src={row.profile} round size="40" />
                    ) : row?.yourname ? (
                        <Avatar name={row.yourname.slice(0, 1) + ' ' + row.yourname.slice(1, 2)} round size="40" color="#4A5DF9" />
                    ) : null}
                </div>
            ),
            left: true,
            width: '120px',
        },
        {
            name: 'Username',
            selector: row => row.yourname,
            left: true,
        },
        {
            name: 'Mobile Number',
            selector: row => row.mobileNumber,
            left: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            left: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            left: true,
            width: '100px',
        },
        {
            name: "Profile Complete",
            selector: (row) => {
                const step = JSON.parse(row.step);
                let percentage = 0;
                if (row.role === "Founder") {
                    percentage = (step * 100) / 8;
                } else if (row.role === "Vendor") {
                    percentage = (step * 100) / 4;
                } else if (row.role === "Mentor") {
                    percentage = (step * 100) / 7;
                } else if (row.role === "Investor") {
                    percentage = (step * 100) / 5;
                }
                const formattedPercentage = parseInt(percentage).toFixed(0);
                // Render the progress bar
                return (
                    <Flex vertical gap="small" style={{ width: 100 }}>
                        <Progress
                            percent={Math.min(parseInt(formattedPercentage), 100)}
                            size="small"
                            trailColor="#ffff" // Set the trail color (slightly transparent white)
                            format={(percent) => <span style={{ color: "#fff" }}>{percent}%</span>}
                        />
                    </Flex>
                );
            },
            left: true,
            width: '190px',
        },
        {
            name: 'Created Date',
            selector: row => new Date(row?.createdAt).toISOString().split('T')[0],
            left: true,
            width: '150px',
        },
        {
            name: 'Status',
            selector: row => (
                <Form.Check
                    type="switch"
                    id={`custom-switch-${row.id}`}
                    checked={row.isAccount === "active"} // Assuming "Active" and "InActive" are the possible status values
                    onChange={() => handleStatusChange(row.id, row.status)}
                />
            ),
            left: true,
            width: '100px',
        },

        {
            name: 'Action',
            selector: row => (
                <div className="d-flex align-items-center">
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                        <Link to={`/users/view`} state={row.id}> <img src="/images/eye-white.png" alt="" onClick={() => {
                            setDetailShow(true);
                            setDetailData(row);
                        }} style={{ cursor: 'pointer', height: '16px', width: '16px' }} />
                        </Link>
                        <img src="/images/delete-white.png" alt="" onClick={() => {
                            setDeleteShow(true);
                            setDeleteId(row.id);
                        }} style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
                    </div>
                </div>
            ),
            // width: '100px'


        }
    ];
    const customStyles = {
        table: {
            style: {
                backgroundColor: "#fff0",
                color: '#FFF',
            },
        },
        rows: {
            style: {
                backgroundColor: "#fff0 ",
                color: '#FFF',
                paddingLeft: '20px',
                paddingRight: '20px',
            },
        },
        headRow: {
            style: {
                backgroundColor: "#fff0",
                color: '#FFF',
                fontSize: '14px',
                borderBottom: '1px solid #FFF',
                paddingLeft: '20px',
                paddingRight: '20px',
            },
        },
        headerCell: {
            style: {
                backgroundColor: "#fff0",
                color: '#FFF',
                fontSize: '14px',
                borderBottom: '1px solid #FFF',
                paddingLeft: '20px',
                paddingRight: '20px',

            },
        },
        pagination: {
            style: {
                backgroundColor: "#fff0",
                color: '#FFF'
            },
        }
    };





    const filteredData = data?.filter((item) => {

        const searchStr = `${item.mobileNumber}${item?.yourname}${item?.email} ${item?.role}`.toLowerCase();
        return searchStr.includes(filterText.toLowerCase());
    });

    const startIndex = (currentPage - 1) * perPage;
    const currentPageData = filteredData.slice(startIndex, startIndex + perPage);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };
    if (error) return <h1>{error}</h1>;

    return (
        <>
            <section className="categorylist-section mt-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                    <h4 className="mb-0 page-title">Users List</h4>
                                    {/* <button className="add-btn" type="button" onClick={() => setAddShow(true)}>
                                        + Add New Banner
                                    </button> */}
                                </div>
                            </div>
                            <div className="card-body table-responsive">
                                <div className="row mt-2 justify-content-between">
                                    <div className="col-md-auto ms-auto ">
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
                                        // progressPending={isLoading}
                                        progressComponent={<h1>Loading...</h1>}
                                        pagination
                                        paginationServer
                                        paginationTotalRows={filteredData.length}
                                        paginationPerPage={perPage}
                                        onChangeRowsPerPage={handleRowsPerPageChange}
                                        onChangePage={handlePageChange}
                                        theme="dark"
                                        // striped
                                        // theme={2 === 1 ? "dark" : "default"}
                                        customStyles={customStyles}
                                        noDataComponent={
                                            <div style={{
                                                backgroundColor: "#1b19198f",
                                                color: "#FFF",
                                                padding: "20px",
                                                textAlign: "center",
                                                width: '100%'
                                            }}>
                                                No data found.
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* ======= Data Add Offcanvas ======== */}
            <DeleteModal show={deleteShow} handleClose={handleClose} handleDelete={handleDelete} text={deleteText} />

        </>
    )
}
export default Users;


