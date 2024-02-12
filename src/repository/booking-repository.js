const {StatusCodes}=require('http-status-codes');

const {Booking}=require('../models/index');
const { ValidationError, AppError } = require('../utils/errors');

class BookingRepository{

 async createBooking(){
    try {
        const booking =await Booking.create(data);
        return booking;
    } catch (error) {
        if(error.name==='SequelizeValidationError'){
            throw new ValidationError(error);
        }
        throw new AppError('RepositoryError','Cannot Create Booking','There Was Some Issue Creating a Booking',StatusCodes.INTERNAL_SERVER_ERROR);
    }
 }






}



module.exports=BookingRepository;