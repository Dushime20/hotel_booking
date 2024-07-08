import React, { useState } from 'react'
import { addRoom } from '../utils/ApiFunctions'
import RoomTypeSelctor from '../common/RoomTypeSelector'
import { Link } from 'react-router-dom';

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: ""
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage,setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  const handleRoomInputChange = (e)=>{
    
    
    const { name, value } = e.target;

    if (name === "roomPrice") {
      const parsedValue = parseInt(value);
      setNewRoom({ ...newRoom, [name]: isNaN(parsedValue) ? "" : parsedValue });
    } else {
      setNewRoom({ ...newRoom, [name]: value });
    }
  };

  const handleImageChange= (e) =>{
    const selectedImage = e.target.files[0];
    setNewRoom({...newRoom, photo: selectedImage});
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
   e.preventDefault()
   try{
   
    const success = await addRoom(newRoom.photo, newRoom.roomType,newRoom.roomPrice);
    if (success !== undefined) {
      setSuccessMessage("A new room was added to the database");
      setNewRoom({ photo: null, roomType: "", roomPrice: "" });
      setImagePreview("");
      setErrorMessage("");
    }
    else{
      setErrorMessage("Error adding room")
    }
   }
   catch (error){
    
    setErrorMessage(error.message);

   }
   setTimeout(()=> {
    setSuccessMessage("")
    setErrorMessage("")
   },2000)
  };

  
  return (

    <>
    <section className='container  mt-5 mb-5 shadow'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <h2 className='mt-5 mb-2'> Add A New room</h2>

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
                  handleRoomInputChange={handleRoomInputChange} 
                  newRoom ={newRoom}/>
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
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}  
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
                    className='mb-3 mt-2 ml-0'/>)}
              
            </div>
            <div className='d-grid gap-2 d-md-flex mt-2 left-align mb-5'>
              <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">back</Link>
              <button className='btn btn-outline-primary' type='submit' >Save Room</button>
            </div>
          </form>
        </div>

      </div>
    </section>
      
    </>
  )
}

export default AddRoom
