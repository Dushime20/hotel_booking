import axios from "axios"

export const api = axios.create({
    baseURL:"http://localhost:8080"
});

/* this function add new room to the database */
export async function addRoom(photo, roomType, roomPrice){
 
    const formData = new FormData();
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

    try {
        const response = await api.post("/rooms/add/new-room", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error in addRoom:", error);
        throw error;
    }
}

/* this function get all room type from data base */
export async function getRoomType(){
    try{
           const response = await api.get("/rooms/room/types")
           return response.data 
    }
    catch(error){
        throw new Error("Error fetching roomtypes")

    }
}

/* function get all rooms from database */

export async function getAllRooms(){
    try{

        const result = await api.get("/rooms/all-rooms")
        return result.data
    }
    catch(error){
        console.error("Error fetching rooms:", error.response ? error.response.data : error.message);
        throw new Error ("Error feching rooms")
    }

}

/* delete room from database */

export async function deleteRoom(roomId){
  try{
    const result = await api.delete(`/rooms/delete/room/${roomId}`);
    return result.data;
  }
  catch(error){
    throw new Error (`error deleting room ${error.message}`);
  }
}


/*this function update room by ID*/

export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    if (roomData.photo) {
        formData.append("photo", roomData.photo);
    }

    try {
        const response = await api.put(`/rooms/update/${roomId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.error("Error in updateRoom:", error);
        throw error;
    }
}


/* this function gets a room  by Id */

export async function getRoomById(roomId){
    try{
      const result = await api.get(`/rooms/room/${roomId}`)
      return result.data;
    }catch(error){
        throw new Error(`error fetching room ${error.message}`);
    }
}



/* this function save new booking  to tha database*/
export async function bookRoom(roomId,booking){
    try{
        const response = await api.post(`/bookings/room/${roomId}/booking`,booking);
        return response.data;
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error (error.response.data);
        }
        else{
            throw new Error(`Error booking room:${error.message} `);
        }
    }
}


/*this function get all booking from database */

export async function getAllBookings(){
    try{
        const result = await api.get("/bookings/all-bookings");
        return result.data;
    }
    catch(error){
        throw new Error(`Error fetching bookings :${error.message}`)
    }
}



/* function that find booking by confirmation code */
export async function getBookingByConfirmationCode(confirmationCode){

    try{
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return result.data
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }
        else{
        throw new Error(`Error find booking :${error.message}`);
       }
    }
}

/* this function cancel booking */
export async function cancelBooking(bookingId){
    try{
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
        return result.data;
    }
    catch(error){
        throw new Error(`Error cancel the booking: ${error.message}`);
    }
}
