import mongoose from "mongoose";

const { Schema } = mongoose;


// Schema cho bảng Trip
const tripSchema = new Schema({
    toStation: {
        type: String,
        minlength: 3,
    },
    fromStation: {
        type: String,
        minlength: 3,
    },
    startTime: {
        type: Date,
        minlength: 3,
    },
    price: {
        type: Number,
    },
    seats: {
        type: Number,
    },
    busHouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusHouse' // Kết nối với model 'BusHouse'
    }
}, { timestamps: true, versionKey: false });


export default mongoose.model('Trip', tripSchema);

