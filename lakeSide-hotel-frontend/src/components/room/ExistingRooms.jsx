import React, { useEffect, useState } from 'react'
import { deleteRoom,getAllRooms } from '../utils/ApiFunctions';
import {Col, Row} from 'react-bootstrap'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import {FaTrashAlt,FaEye,FaEdit,FaPlus } from "react-icons/fa"
import {Link} from "react-router-dom"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const ExistingRooms = () => {

    const [rooms,setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage] = useState(8);
    const [isLoading,setIsLoading] = useState(false);
    const [filteredRooms,setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] =useState("");
    const [successMessage,setSuccessMessage] = useState("");
    const [errorMessage,setErrorMessage] = useState("");

   useEffect(() =>{
    fecthRooms()
   },[])

    const fecthRooms = async ()=>{
       setIsLoading(true);
       try{
        const result =await getAllRooms();
        setRooms(result);
        setFilteredRooms(result); 
        setIsLoading(false)

       } 
       catch(error){
        console.error("Error fetching rooms:", error.response ? error.response.data : error.message);
        setErrorMessage(error.message);

       }
    }

    useEffect(() =>{
        if(selectedRoomType === ""){
            setFilteredRooms(rooms);
        }else{
            const filtered =rooms.filter((room)=> room.roomType === selectedRoomType)
            setFilteredRooms(filtered);
        }
        setCurrentPage(1)
    },[rooms,selectedRoomType])

    const handlePaginationClick = (pageNumber) =>{
        setCurrentPage(pageNumber);
    }

    const MySwal = withReactContent(Swal);


    const handleDelete = async (roomId) => {
        try {
          const result = await MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          });
      
          if (result.isConfirmed) {
            try {
              const deleteResult = await deleteRoom(roomId);
              if (deleteResult === "") {
                setSuccessMessage(`The room ${roomId} was deleted successfully`);
                fecthRooms();
              } else {
                console.error(`error deleting room: ${deleteResult.message}`);
                setErrorMessage(deleteResult.message);
              }
      
              await MySwal.fire('Deleted!', 'Your file has been deleted.', 'success');
            } catch (error) {
              setErrorMessage(error.message);
            }
          }
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setTimeout(() => {
            setSuccessMessage('');
            setErrorMessage('');
          }, 2000);
        }
      };

    const calculateTotalPages = (filteredRooms,roomsPerPage,rooms)=>{
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length:rooms.length;
             return Math.ceil(totalRooms/roomsPerPage)
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom -roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);


    


  return (
    <>
    <div className='container col-md-8 col-lg-6'>
    {successMessage&&(<p className='alert alert-success fade show mt-5'>
            {successMessage}
            </p>)}
            {errorMessage&&(<p className='alert alert-danger fade show mt-5'>
            {errorMessage}
            </p>)}
    </div>
   {isLoading ? (
    <p>Loading Existing rooms</p>
   ):(
    <>
    <section className='mt-5 mb-5 container'>
        <div className='d-flex justify-content-between mb-3 mt-5'>

        
            <h2>Existing rooms</h2>

           
        </div>
        <Row>
        <Col md={6} className='mb-3 mb-md-0'>
        <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
        </Col>
        <Col md={6} className='d-flex justify-content-end'>
        <Link to={'/add-rooms'}><FaPlus /> AddRoom</Link>
           
        </Col>
        </Row>
        
        <table className='table table-bordered table-hover'>
            <thead>
                <tr className='tex-center'>
                    <th> Id</th>
                    <th> Room Type</th>
                    <th> Room Price</th>
                    <th> Action</th>
                </tr>
            </thead>
            <tbody>
                {currentRooms.map((room) =>(

                    <tr key={room.id} className='text-center'>
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                    <td className='gap-2'>
                        <Link to={`/edit-room/${room.id}`}>
                        <span className='btn btn-info btn-sm'>
                            <FaEye/>
                        </span>
                        <span className='btn btn-warning btn-sm'>
                            <FaEdit/>
                        </span>
                        </Link>
                        <button 
                        className='btn btn-danger btn-sm'
                        onClick={()=> {
                            handleDelete(room.id);  
                        }}
                        >
                        <FaTrashAlt />
                      </button>
                    </td>
                </tr>
                ))}
                 
            </tbody>
        </table>
        <RoomPaginator 
          currentPage={currentPage}
          totalPages = {calculateTotalPages(filteredRooms,roomsPerPage,rooms)}
          onPageChange={handlePaginationClick}/>
    </section>
    </>
   )}
      
    </>
    
  )
}

export default ExistingRooms
