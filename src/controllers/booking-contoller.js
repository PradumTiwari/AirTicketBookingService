const {StatusCodes} = require('http-status-codes');

const {BookingService} = require('../services/index');

const {createChannel,publishMessage}=require('../utils/messageQueue.js')

const {REMINDER_BINDING_KEY}=require('../config/serverConfig.js')

const bookingService = new BookingService();

class BookingController{

    constructor(){
        
    }

    async sendMessageToQueue(req,res){
        const channel=await createChannel();
        const payload={
            data:{
                subject:'This Is a Notification from Queue created By Pradum',
                content:"Ayush Bhaii Land Lelo  ",
                recepientEmail:"ayush94256@gmail.com",
                notificationTime:"2024-04-03T01:00:00"
            },
            service:'CREATE_TICKET'
        }
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
       
        return res.status(200).json({
            message:'Successfully published the  message to queue',
        })
   
    }


    async create(req,res){
        try {
            const response=await bookingService.createBooking(req.body);
            console.log("FROM BOOKING CONTROLLER", response);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}

module.exports=BookingController;