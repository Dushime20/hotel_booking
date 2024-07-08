package com.hotel_book.LakeSide_hotel.service;

import com.hotel_book.LakeSide_hotel.model.BookedRoom;

import java.util.List;

public interface IBookingService {
    List<BookedRoom> getAllBookingByRoomId(Long roomId);

    List<BookedRoom> getAllBookings();

    BookedRoom findByConfirmationCode(String confirmationCode);
    

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    void cancelBooking(Long bookingId);
}
