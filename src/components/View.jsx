import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Videocard from './Videocard';
import { getAllVideos } from '../services/allAPI';

function View({uploadVideoStatus}) {
  const [allVideo, setAllVideo] = useState([])
  const [deleteVideoStatus, setDeleteVideoStatus]= useState(false)

  const getAllVideoFromDB = async () => {
    const response = await getAllVideos();
    const { data } = response;
    console.log(response);
    setAllVideo(data);
  }
  useEffect(() => {
    getAllVideoFromDB();
  }, [uploadVideoStatus,deleteVideoStatus])
  return (
    <>
      <Row>{
        allVideo.length > 0 ?
          allVideo.map((video) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Videocard displayVideo = {video} setDeleteVideoStatus={setDeleteVideoStatus}/>
            </Col>
          ))
          :
          <p>Nothing to Display</p>
      }

      </Row>
    </>
  )
}

export default View