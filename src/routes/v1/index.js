const express = require('express');

const {BookingController}  = require('../../controllers/index');
// const {createChannel}=require('../../utils/messageQueue.js');
// const channel=await createChannel();
const bookingController=new BookingController();
const router = express.Router();

router.get('/info',(req,res)=>{
    return res.json({message:"Hitting The Booking Service Home Route"})
})
router.post('/bookings', bookingController.create);
router.post('/publish',bookingController.sendMessageToQueue)
module.exports = router;