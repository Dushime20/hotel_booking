package com.hotel_book.LakeSide_hotel.repository;

import com.hotel_book.LakeSide_hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room ,Long> {


    @Query("SELECT DISTINCT r.roomType From Room r")
    List<String> findDistinctRoomTypes();
}
