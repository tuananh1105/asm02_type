import mongoose from "mongoose";

const { Schema } = mongoose;

const busHouseSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
    },
    address: { // Thay đổi từ 'adress' thành 'address'
        type: String,
    },
    phone: {
        type: String,
    },
}, { timestamps: true, versionKey: false });


export default mongoose.model('BusHouse', busHouseSchema);

