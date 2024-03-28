import axios from 'axios'
import React, {  useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from'yup'
import toast from 'react-hot-toast';


function Contact({row , GetListUsers }) {


 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 const [selectedImage, setSelectedImage] = useState('');

 const changingImage = (e) => {
   setSelectedImage(URL.createObjectURL(e.target.files[0]));
 };
 


    const initialValues={firstName: "",
    lastName: "",
    phoneNumber:"",
    email: "",
    picture:""}

    const validationSchema = Yup.object().shape({
        lastName: Yup.string().required('Last Name is required'),
        firstName: Yup.string().required('First Name is required'),
        phoneNumber: Yup
            .string()
            .matches(/^(?:01)(?:0|1|2|5)\d{8}$/, 'Invalid Egyptian phone number')
            .required('Phone number is required'),
    })

 const MyForm = useFormik({
        initialValues,
        onSubmit:Update,
        validationSchema
    })


    async function Update(values) {
      try {
          const { data } = await axios.put(
              `https://dummyapi.io/data/v1/user/${row.id}`,
              values,
              {
                  headers: { 'app-id': '64fc4a747b1786417e354f31' }
              }
          );
          GetListUsers()
          handleClose(); 
        if(data){
          toast.success('Your contact updated successfully!');
        }
          else{
            toast.error('This is an error!');
          }
          return data
      } catch (error) {
          console.log(error);
      }
  }

  async function DeleteRow() {
    try {
        const { data } = await axios.delete(
            `https://dummyapi.io/data/v1/user/${row.id}`,
            {
                headers: { 'app-id': '64fc4a747b1786417e354f31' }
            }
        );
        GetListUsers()
        handleClose(); 
if(data){
    toast.error('Your contact is deleted now !');
}else{
    toast.error('This is an error!');
}
return data
    } catch (error) {
        console.log(error);
    }
}
   
    return (
        <>
        <Modal show={show} onHide={handleClose} className='d-flex align-items-center'>
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
                    <label htmlFor="picture"  className="upload">Upload Image</label>
                    <input
                     onBlur={MyForm.handleBlur}
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
                    {MyForm.errors.phoneNumber && MyForm.touched.phoneNumber ? (
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
                      disabled={true}
                      type="email"
                      id="email"
                      name="email"
                      className="form-control rounded-pill px-3 my-2"
                      placeholder="Please , Enter Your Email"
                    />

                    
            
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
              Update Note
            </Button>
          </Modal.Footer>
        </Modal>
      <div className="row  text-white align-items-center centeralize ">
        <div className=" offset-1 col-sm-3 col-md-2 ">
          {row.picture?<img src={row?.picture} alt=""  className='image-width my-3 p-1 rounded-circle ' />
: <img alt='' src='https://th.bing.com/th/id/OIP.GeEEvvh1bNc8fdvZsq4gQwHaHa?rs=1&pid=ImgDetMain' className='image-width my-3 p-1 rounded-circle '/>}
        </div>
        <div className="col-sm-4 col-md-6  my-3 p-3">
            <p className='fw-bold text-capitalize'>{row?.firstName} {row?.lastName}</p>
            <span className='numberColor'>01020331213</span>
        </div>
        <div className="col-sm-2 d-flex justify-content-between my-3 p-3">
        <button onClick={handleShow} className='btn bg-white mx-2 height' ><i className="fa-regular fa-pen-to-square text-primary "  ></i></button>
        <button  onClick={DeleteRow}  className='btn bg-white mx-2 height' ><i className="fa-solid fa-trash text-danger"></i></button>
        </div>
        <hr className='w-75 m-auto heightHr'/>
       </div>
        </>
    )
}

export default Contact




