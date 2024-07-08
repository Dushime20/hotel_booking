import React, { useEffect, useState } from 'react'
import { getRoomType } from '../utils/ApiFunctions'

const RoomTypeSelctor = ({handleRoomInputChange,newRoom}) => {
    const [roomType,setRoomtype] = useState([])
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false) 
    const [newRoomType,setNewRoomType] = useState("")

    useEffect(()=>{
        getRoomType().then((data)=>{
            setRoomtype(data)
        })
    },[])
    const handelNewRoomTypeInputChange = (e)=> {
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType = () =>{
        if(newRoomType !== ""){
          setRoomtype([...roomType,newRoomType])  
          setNewRoomType("")
          setShowNewRoomTypeInput(false)
        } 
    }
  return (
    <>
      {roomType.length>0 &&(
        <div>
           <select 
           required
           className='form-control'
           id='roomType'
           name='roomType'
           value={newRoom.roomType}
           onChange={(e) =>{
            if(e.target.value === "Add new"){
                setShowNewRoomTypeInput(true)
            }else{
                handleRoomInputChange(e)
            }
           }
           }>
            <option value={""}>select a room type</option>
            <option value={"Add new"}>Add New</option>
            {roomType.map((type,index)=>(
                <option key={index} value={type}>
                    {type}
                </option>
            ))}
            </select> 
            {showNewRoomTypeInput && (
                <div className='input-group mt-3'>
                    <input className='form-control'
                       type='text'
                       placeholder='enter a new room type'
                       value={newRoomType}
                       onChange={handelNewRoomTypeInputChange}
                    />
                    <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
                </div>
            )}
        </div>
      )}
    </>
  )
}

export default RoomTypeSelctor
