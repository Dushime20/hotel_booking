import React, { useState } from 'react'

/* extract selected room from database */
const RoomFilter = ({data,setFilteredData}) => {

    const[filter,setFilter] = useState("");
    
    const handleSelectChange = (e) =>{
        const selectedRoomType = e.target.value;
        setFilter(selectedRoomType);
        const filteredRoom = data.filter((room) =>
             room.roomType.toLowerCase()
             .includes(selectedRoomType.toLowerCase()));
             setFilteredData(filteredRoom);
            
    }
    const clearFilter =()=>{
        setFilter("");
        setFilteredData(data);
    }
/* extract unique roomType from dtbase  */
    const roomTypes=["",...new Set(data.map((room) => room.roomType))]

  return (
    <div className='input-group mb-3'>
        <span className='input-group-text' id='room-type-filter'>
            Filter rooms by type
            </span>
            <select
            className='form-select'
            value={filter}
            onChange={handleSelectChange}>
                <option value={""}>select a room type to filter... </option>
                {roomTypes.map((type,index) =>(
                    <option key={index} value={String(type)}>
                        {String(type)}
                    </option>
                 ))}
            </select>
            <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear filter</button>
      
    </div>
  )
}

export default RoomFilter
