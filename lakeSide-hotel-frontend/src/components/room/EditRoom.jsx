import React, { useEffect, useState } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RoomTypeSelctor from '../common/RoomTypeSelector'


const EditRoom = () => {
    const [room,setRoom] = useState({
        photo: null,
        roomType: "",
        roomPrice: ""
    });

    const [successMessage,setSuccessMessage] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const {roomId} = useParams();

    const handleImageChange = (e) =>{
        const selectedImage = e.target.files[0];
        setRoom({...room,photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    }

    const handleInputChange = (event) =>{
        const {name,value} = event.target
        setRoom({...room,[name]:value});
    }

    useEffect(() =>{
    const fetchRoom = async () =>{
        try{
            const roomData = await getRoomById(roomId);
            setRoom(roomData);
            setImagePreview(`data:image/jpeg;base64,${roomData.photo}`)   
        }catch(error){
            console.error(error);
        }
    }
    fetchRoom()
    },[roomId])

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            
            const response =await updateRoom(roomId, room)
            if(response.status === 200){
                setSuccessMessage("Room updated successfully!");

                const updatedRoomData =await getRoomById(roomId);
                setRoom(updatedRoomData);
                setImagePreview(`data:image/jpeg;base64,${updatedRoomData.photo}`);
                setErrorMessage("");
            }else{
                setErrorMessage("Error Udatimg room");
            }

        }catch(error){
                console.error(error);
                setErrorMessage(error.message);
        }
        setTimeout(()=> {
            setSuccessMessage("")
            setErrorMessage("")
           },2000);
    }

  return (
    <>
      
    <section className='container  mt-5 mb-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <h2 className='mt-5 mb-2'> Edit a room</h2>

          {successMessage&&(<div className='alert alert-success fade show mb-2'>
            {successMessage}
            </div>)}
            {errorMessage&&(<div className='alert alert-danger fade show'>
            {errorMessage}
            </div>)}
           

          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='roomType' className='form-label left-align' >Room Type</label>
                <div>
                  <RoomTypeSelctor 
                  handleInputChange={handleInputChange} 
                  newRoom ={room}/>
                </div>
            </div>

            <div className='mb-3'>
                <label htmlFor='roomPrice' className='form-label left-align'>
                  Room Price
                  </label>
                <input 
                
                id='roomPrice'
                className='form-control'
                required
                name='roomPrice'
                value={room.roomPrice}
                onChange={handleInputChange}  
                />
               
            </div>
            <div className='mb-3'>
                <label htmlFor='photo' className='form-label left-align'>
                  Room Photo
                  </label>
                  <input 
                  type="file"
                  id='photo'
                  name='photo'
                  className='form-control'
                 
                  onChange={handleImageChange}/>
                 {imagePreview&&(
                  <img 
                  src={imagePreview} 
                    alt='Preview room photo'
                    style={{maxWidth:"400px", maxHeight: "400px"}}
                    className='mb-3 mt-2'/>)}
              
            </div>
            <div className='d-grid gap-2 d-md-flex mt-2 left-align'>
                <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">back</Link>
              <button className='btn btn-outline-primary' type='submit' >Edit Room</button>
            </div>
          </form>
        </div>

      </div>
    </section>
      
    </>
      
    
  )
}

export default EditRoom
