// import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import axiosInstance, { authHeader } from "../../helper/axios";
// import toast from "react-hot-toast";
// import { Form } from "react-bootstrap";
// import DeleteModal from "../../components/modal/delete/DeleteModal";
// // import AddIndustry from "../../components/offcanvas/Industry/AddIndustry";
// // import EditIndustry from "../../components/offcanvas/Industry/EditIndustry";
// import AddIndustry from "../../components/modal/industry/AddIndustry";
// import EditIndustry from "../../components/modal/industry/EditIndustry";

// const Industry = () => {
//     const [data, setData] = useState([]);
//     const [filterText, setFilterText] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const [editData, setEditData] = useState({});
//     const [detailData, setDetailData] = useState({});

//     const [addShow, setAddShow] = useState(false);
//     const [editShow, setEditShow] = useState(false);
//     const [deleteShow, setDeleteShow] = useState(false);
//     const [detailShow, setDetailShow] = useState(false);
//     const [deleteId, setDeleteId] = useState(null);

//     const [currentPage, setCurrentPage] = useState(1);
//     const [perPage, setPerPage] = useState(10);

//     const deleteText = "industry";

//     const handleClose = () => {
//         setAddShow(false);
//         setEditShow(false);
//         setDeleteShow(false);
//         setDetailShow(false);
//     }


//     const fetchIndustryData = async () => {
//         setIsLoading(true);
//         try {

//             const data = await axiosInstance.get(`/admin/industry/list`, authHeader());

//             if (data?.data?.status === true) {
//                 setData(data?.data?.data);
//                 setIsLoading(false);
//             } else {
//                 toast.error(data?.message);
//             }
//         } catch (err) {
//             setError(err.message);
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchIndustryData();
//     }, []);

//     const handleDelete = async () => {
//         try {

//             const data = await axiosInstance.delete(`/admin/industry/delete/${deleteId}`, authHeader());
//             if (data?.status === 200) {
//                 toast.success(data?.data?.message);
//                 fetchIndustryData();
//                 handleClose();
//             } else {
//                 toast.error(data?.data?.message);
//             }
//         } catch (err) {
//             setError(err.message);
//             setIsLoading(false);
//         }
//     };



//     const columns = [
//         {
//             name: 'ID',
//             selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
//             // width: '400px',
//             // width: '80px',
//             width: '200px'
//         },
//         {
//             name: 'Industry',
//             selector: row => row.name,
//             width: '200px'
//         },
//         {
//             name: 'Status',
//             selector: row => <div className={`m-auto ${row.status === "active" ? "active" : "in-active"}`}>
//                 {row.status}
//             </div>,
//             width: '200px'
//         },
//         {
//             name: 'Action',
//             selector: row => (
//                 <div className="d-flex align-items-center">
//                     <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
//                         <img src="/images/pencil-white.png" alt="" onClick={() => {
//                             setEditShow(true);
//                             setEditData(row);
//                         }} style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
//                         <img src="/images/delete-white.png" alt="" onClick={() => {
//                             setDeleteShow(true);
//                             setDeleteId(row.id);
//                         }} style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
//                     </div>
//                 </div>
//             ),
//             width: '200px'
//         }
//     ];
//     const customStyles = {
//         table: {
//             style: {
//                 backgroundColor: "#fff0",
//                 color: '#FFF'
//             },
//         },
//         rows: {
//             style: {
//                 backgroundColor: "#fff0 ",
//                 color: '#FFF',

//             },
//         },
//         headRow: {
//             style: {
//                 backgroundColor: "#fff0",
//                 color: '#FFF',
//                 fontSize: '14px',
//                 borderBottom: '1px solid #FFF',

//             },
//         },
//         pagination: {
//             style: {
//                 backgroundColor: "#fff0",
//                 color: '#FFF'
//             },
//         }
//     };


//     const filteredData = data?.filter((item) => {
//         const searchStr = `${item.name} ${item?.role}`.toLowerCase();
//         return searchStr.includes(filterText.toLowerCase());
//     });

//     const startIndex = (currentPage - 1) * perPage;
//     const currentPageData = filteredData.slice(startIndex, startIndex + perPage);

//     const handlePageChange = page => {
//         setCurrentPage(page);
//     };

//     const handleRowsPerPageChange = (newPerPage) => {
//         setPerPage(newPerPage);
//         setCurrentPage(1);
//     };
//     if (error) return <h1>{error}</h1>;

//     return (
//         <>
//             <section className="categorylist-section mt-5">
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <div className="card">
//                             <div className="card-header">
//                                 <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
//                                     <h4 className="mb-0 page-title">Industry List</h4>
//                                     <button className="add-btn" type="button" onClick={() => setAddShow(true)}>
//                                         + Add New Industry
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="card-body table-responsive">
//                                 <div className="row mt-2 justify-content-between">
//                                     <div className="col-md-auto ms-auto ">
//                                         <div className="dt-search d-flex align-items-center gap-1">
//                                             <label htmlFor="dt-search-0" className="search-label">Search:</label>
//                                             <input
//                                                 type="search"
//                                                 className="form-control form-control-sm"
//                                                 id="dt-search-0"
//                                                 value={filterText}
//                                                 onChange={(e) => setFilterText(e.target.value)}
//                                             />
//                                         </div>
//                                     </div>
//                                     <DataTable
//                                         columns={columns}
//                                         data={currentPageData}
//                                         // progressPending={isLoading}
//                                         progressComponent={<h1>Loading...</h1>}
//                                         pagination
//                                         paginationServer
//                                         paginationTotalRows={filteredData.length}
//                                         paginationPerPage={perPage}
//                                         onChangeRowsPerPage={handleRowsPerPageChange}
//                                         onChangePage={handlePageChange}
//                                         // striped
//                                         // theme={2 === 1 ? "dark" : "default"}
//                                         theme="dark"
//                                         customStyles={customStyles}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {/* ======= Data Add Offcanvas ======== */}
//             <AddIndustry show={addShow} fetchIndustryData={fetchIndustryData} handleClose={handleClose} />
//             <EditIndustry show={editShow} fetchIndustryData={fetchIndustryData} handleClose={handleClose} editData={editData} />
//             <DeleteModal show={deleteShow} handleClose={handleClose} handleDelete={handleDelete} text={deleteText} />
//         </>
//     )
// }
// export default Industry;



import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosInstance, { authHeader } from "../../helper/axios";
import toast from "react-hot-toast";
import { Form } from "react-bootstrap";
import DeleteModal from "../../components/modal/delete/DeleteModal";
// import AddIndustry from "../../components/offcanvas/Industry/AddIndustry";
// import EditIndustry from "../../components/offcanvas/Industry/EditIndustry";
import AddIndustry from "../../components/modal/industry/AddIndustry";
import EditIndustry from "../../components/modal/industry/EditIndustry";

const Industry = () => {
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [editData, setEditData] = useState({});
    const [detailData, setDetailData] = useState({});

    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [detailShow, setDetailShow] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const deleteText = "industry";

    const handleClose = () => {
        setAddShow(false);
        setEditShow(false);
        setDeleteShow(false);
        setDetailShow(false);
    }


    const fetchIndustryData = async () => {
        setIsLoading(true);
        try {

            const data = await axiosInstance.get(`/admin/industry/list`, authHeader());

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
        fetchIndustryData();
    }, []);

    const handleDelete = async () => {
        try {

            const data = await axiosInstance.delete(`/admin/industry/delete/${deleteId}`, authHeader());
            if (data?.status === 200) {
                toast.success(data?.data?.message);
                fetchIndustryData();
                handleClose();
            } else {
                toast.error(data?.data?.message);
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };



    const columns = [
        {
            name: 'ID',
            selector: (_, index) => (currentPage - 1) * perPage + (index + 1),
            width: '70px',
            left: true,
            // cell: (_, index) => (
            //     <div style={{ width: "199px" }}>
            //         {(currentPage - 1) * perPage + (index + 1)}
            //     </div>
            // ),
            // width: '199px',

        },
        {
            name: 'Industry',
            selector: row => row.name,
            width: '300px',
            left: true,
        },
        {
            name: 'Status',
            selector: row => <div className={`m-auto ${row.status === "active" ? "active" : "in-active"}`}>
                {row.status}
            </div>,
            width: '150px'
            // center: true, 
        },
        // {
        //     name: '',
        //     selector: row => <div></div>,
        // },
        // {
        //     name: '',
        //     selector: row => <div></div>,
        // },
        // {
        //     name: '',
        //     selector: row => <div></div>,
        // },
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
                            setDeleteId(row.id);
                        }} style={{ cursor: 'pointer', height: '20px', width: '20px' }} />
                    </div>
                </div>
            ),
            // width: '100px',
            // center: true,
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
        const searchStr = `${item.name} ${item?.role}`.toLowerCase();
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
                                    <h4 className="mb-0 page-title">Industry List</h4>
                                    <button className="add-btn" type="button" onClick={() => setAddShow(true)}>
                                        + Add New Industry
                                    </button>
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
                                        // striped
                                        // theme={2 === 1 ? "dark" : "default"}
                                        theme="dark"
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
            <AddIndustry show={addShow} fetchIndustryData={fetchIndustryData} handleClose={handleClose} />
            <EditIndustry show={editShow} fetchIndustryData={fetchIndustryData} handleClose={handleClose} editData={editData} />
            <DeleteModal show={deleteShow} handleClose={handleClose} handleDelete={handleDelete} text={deleteText} />
        </>
    )
}
export default Industry;


