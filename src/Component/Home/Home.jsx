import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Home from "../Contact/Contact";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";
import Pagination from "../Pagination/Pagination";

function AddUser() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Data, setData] = useState([]);
    const [FilterData, setFilterData] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [page, setPage] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [Limit, setLimit] = useState(5);


    //filteration for search input
    function handleFilter(value){
        const result = FilterData.filter((Name) =>
            `${Name.firstName} ${Name.lastName}`
                .toLowerCase()
                .includes(value.toLowerCase())
        );
        setData(result);
    };


    // Upload image
    function changingImage(event){
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
    };

    const initialValues = {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        picture: "",
    };


    // validation of form
    const validationSchema = Yup.object().shape({
        lastName: Yup.string().required("Last Name is required"),
        firstName: Yup.string().required("First Name is required"),
        phoneNumber: Yup.string()
            .matches(/^(?:01)(?:0|1|2|5)\d{8}$/, "Invalid Egyptian phone number")
            .required("Phone number is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
    });


    const MyForm = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    async function onSubmit(values) {
        try {
            const { data } = await axios.post(
                "https://dummyapi.io/data/v1/user/create",
                values,
                {
                    headers: { "app-id": "64fc4a747b1786417e354f31" },
                }
            );
            GetListUsers();
            handleClose();
            if (data) {
                toast.success('Your contact added successfully !');
            }else{
              toast.error('This is an error!');
            }
            return data
        } catch (error) {
            console.log(error);
        }
    }

    async function GetListUsers() {
        setIsLoading(true);
        try {
            const data = await axios.get(
                `https://dummyapi.io/data/v1/user?limit=${Limit}&page=${page}`,
                {
                    headers: { "app-id": "64fc4a747b1786417e354f31" },
                }
            );
            setData(data?.data?.data);
            setFilterData(data?.data?.data);
            setIsLoading(false);
            setTotalUsers(data?.data?.total);
            setLimit(data?.data?.limit);
            return data;
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        GetListUsers();
    }, [page , totalUsers]);


    return (
        <>
            {IsLoading ? (
                <div className=" d-flex justify-content-center align-items-center bg-body-tertiary vh-100">
                    <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                    />
                </div>
            ) : (
                <div className="container ">

                    <Modal
                        show={show}
                        onHide={handleClose}
                        className="d-flex align-items-center"
                    >
                        <Modal.Body>
                            <div className="container">
                                <form>
                                    <div className=" row bg-white p-2 rounded-4">
                                        <div className="col-md-12 text-center">
                                            {selectedImage?<div>
                                                    <img
                                                        src={selectedImage}
                                                        alt=""
                                                        className="image-width rounded-circle border-0"
                                                    />
                                                </div>:''}
                                                
                                            <label htmlFor="picture" className="upload">Upload Image</label>
                                            <input
                                                value={MyForm.values.picture}
                                                type="file"
                                                accept="image/jpeg , image/png , image/jpg"
                                                id="picture"
                                                name="picture"
                                                className="d-none"
                                                onChange={changingImage}
                                            />
                                        </div>

                                        <div className="col-md-6 my-2">
                                            <input
                                                onBlur={MyForm.handleBlur}
                                                value={MyForm.values.lastName}
                                                onChange={MyForm.handleChange}
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className="form-control rounded-pill px-3 my-2"
                                                placeholder="Please , Enter Your LastName"
                                            />

                                            {MyForm.errors.lastName && MyForm.touched.lastName ? (
                                                <div className="alert alert-danger">
                                                    {MyForm.errors.lastName}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col-md-6 my-2">
                                            <input
                                                onBlur={MyForm.handleBlur}
                                                value={MyForm.values.firstName}
                                                onChange={MyForm.handleChange}
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className="form-control rounded-pill px-3 my-2"
                                                placeholder="Please , Enter Your FirstName"
                                            />

                                            {MyForm.errors.firstName && MyForm.touched.firstName ? (
                                                <div className="alert alert-danger">
                                                    {MyForm.errors.firstName}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="col-md-6 my-2">
                                            <input
                                                onBlur={MyForm.handleBlur}
                                                value={MyForm.values.phoneNumber}
                                                onChange={MyForm.handleChange}
                                                type="text"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                className="form-control rounded-pill px-3 my-2"
                                                placeholder="Please , Enter Your Phone Number"
                                            />
                                            {MyForm.errors.phoneNumber &&
                                                MyForm.touched.phoneNumber ? (
                                                    <div className="alert alert-danger">
                                                        {MyForm.errors.phoneNumber}
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                        </div>
                                        <div className="col-md-6 my-2">
                                            <input
                                                onBlur={MyForm.handleBlur}
                                                value={MyForm.values.email}
                                                onChange={MyForm.handleChange}
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control rounded-pill px-3 my-2"
                                                placeholder="Please , Enter Your Email"
                                            />

                                            {MyForm.errors.email && MyForm.touched.email ? (
                                                <div className="alert alert-danger">
                                                    {MyForm.errors.email}
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button disabled={!(MyForm.dirty && MyForm.isValid)} variant="primary" onClick={MyForm.handleSubmit}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="container my-5 rounded-1 border border-1 border-white py-3">
                        <div className="w-75 m-auto">
                            <input
                                type="search"
                                className="form-control rounded-pill my-5 px-3 py-2"
                                placeholder="Search By Name.."
                                onChange={(e) => {
                                    handleFilter(e.target.value);
                                }}
                            />
                        </div>
                        <div className="div d-flex justify-content-end">
                            <Button
                                variant="primary rounded-pill"
                                onClick={handleShow}>
                                + Add New Contact
                            </Button>
                        </div>
                        {Data?.map((row) => {
                            return (
                                <Home key={row.id} row={row} GetListUsers={GetListUsers}  />
                            );
                        })}
                        <Pagination page={page} setPage={setPage} totalUsers={totalUsers} Limit={Limit}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default AddUser;