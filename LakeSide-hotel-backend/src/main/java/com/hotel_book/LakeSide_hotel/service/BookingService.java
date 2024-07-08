package com.hotel_book.LakeSide_hotel.service;

import com.hotel_book.LakeSide_hotel.exception.InvalidBookingRequestException;
import com.hotel_book.LakeSide_hotel.model.BookedRoom;
import com.hotel_book.LakeSide_hotel.model.Room;
import com.hotel_book.LakeSide_hotel.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {

    private final BookingRepository bookingRepository;
    private final IRoomService roomService;

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<BookedRoom> getAllBookingByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId); // Fixed: Call on instance
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {

        if(bookingRequest.getCheckOutDate().isBefore((bookingRequest.getCheckInDate()))){
            throw new InvalidBookingRequestException("Check-in date came before check-out date");
        }
        Room room = roomService.getRoomByRoomId(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest,existingBookings);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }
        else {
            throw new InvalidBookingRequestException("Sorry ,this room is not available for the selected dates;");

        }
        return bookingRequest.getBookingConfirmationCode();
    }


    @Override
    public BookedRoom findByConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode);
    }



    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);

    }


    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
       return existingBookings.stream()
               .noneMatch(existingBooking ->
                       bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                       ||bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                       ||(bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                       && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                       || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                       && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                       || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                       && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                       || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                       && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                       || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                       && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))


               );
    }


}