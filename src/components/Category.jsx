import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addCategory, deleteCategory, getAllCategory, getVideoDetails, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Videocard from './Videocard';
import {Row, Col} from 'react-bootstrap'

function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [allCategory, setAllCategory] = useState([])

  const [isDelete, setisDelete] = useState([])

  const [category, setCategory] = useState({
    id: "",
    categoryName: "",
    allVideos: []
  })

  const getCaterogyFormDB = async () => {
    const response = await getAllCategory();
    const { data } = response;
    setAllCategory(data)
  }
  useEffect(() => {
    getCaterogyFormDB();
  }, [isDelete])
  const uploadCategory = async () => {
    const { id, categoryName } = category;
    if (!id || !categoryName) {
      toast.warning("Please fill the form completely")
    }
    else {
      const response = await addCategory(category);
      console.log(response);
      if (response.status == 201) {
        toast.success(`${response.data.categoryName} is successfully uploaded`);
        handleClose();
        getCaterogyFormDB();
      }
      else {
        toast.error("Something went wrong")
      }
    }
  }

  const deleteCategoryItem = async (id) => {
    const response = await deleteCategory(id);
    setisDelete(response)
  }
  const dragOver = (e) => {
    // to prevent page refresh, by default onDragOver will do page refresh
    e.preventDefault();
    console.log("drag over====")
  }
  const videoDrop = async (e, id) => {
    console.log(`video card need to be placed in card with id ${id}`)
    const videoid = e.dataTransfer.getData('VideoId');
    console.log(`video with id ${videoid} need to placed in category with id ${id}`)
    const response = await getVideoDetails(videoid);
    const { data } = response;
    console.log("video details");
    console.log(data);
    const selectedCategory = allCategory?.find((item) => item.id == id);
    console.log("selected category", selectedCategory)
    selectedCategory.allVideos.push(data);
    console.log("===selected category with dragged video details==");
    console.log(selectedCategory);
    await updateCategory(id, selectedCategory);
    getCaterogyFormDB();
  }
  return (
    <>
      <div>
        <button className='btn btn-warning' onClick={handleShow}> Add New Category</button>
      </div>
      {
        allCategory.length > 0 ?
          allCategory.map((item) => (
            <div className='d-grid' style={{ width: "275px" }} 
             
            >
              <div className='mt-3 border border-secondary rounded p-3'droppable onDragOver={(e) => dragOver(e)}  onDrop={(e) => videoDrop(e, item.id)}>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6>{item.categoryName}</h6>
                  <button className='btn btn-danger'><i class="fa-solid fa-trash" onClick={() => deleteCategoryItem(item.id)}></i></button>
                </div>
                <Row>
                <Col sm={12}>
                  {
                    item.allVideos?.length > 0 ?
                    item.allVideos.map(video=>(<Videocard displayVideo={video}/>))
                    :
                    <p>No item </p>
                  }


                </Col>
              </Row>
              </div>
            </div>
          ))
          :
          <p>Nothing to display</p>
      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-pencil text-warning me-3"></i>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the following details</p>
          <Form className='border border-secondary p-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter category Id" onChange={(e) => setCategory({ ...category, id: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter category name" onChange={(e) => setCategory({ ...category, categoryName: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={uploadCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Category