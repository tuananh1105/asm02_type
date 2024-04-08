import Trip from '../model/trip'

export const getAll = async (req, res) => {
    try {
        const trips = await Trip.find().populate('busHouse');
        // Trả về kết quả cho client
        return res.json({ success: true, trips });
    } catch (error) {
        // Nếu có lỗi xảy ra, trả về lỗi cho client
        return res.status(500).json({ success: false, message: error.message });
    }
};
export const getById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        return res.status(200).json({ trip });
    } catch (error) {
        console.log(error);
    }
}
export const deleteTrip = async (req, res) => {
    try {
        const { tripId } = req.params;
        // Kiểm tra xem có khách đặt chỗ cho chuyến đi không
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ success: false, message: 'Chuyến đi không tồn tại' });
        }
        if (trip.seats === 0) { // Nếu không có khách đặt chỗ
            // Xóa chuyến đi
            await Trip.findByIdAndDelete(tripId);
            // Trả về kết quả cho client
            return res.json({ success: true, message: 'Xóa chuyến đi thành công' });
        } else { // Nếu có khách đặt chỗ
            return res.status(400).json({ success: false, message: 'Không thể xóa chuyến đi đã có khách đặt chỗ' });
        }
    } catch (error) {
        // Nếu có lỗi xảy ra, trả về lỗi cho client
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const add = async (req, res) => {
    try {
        const { error } = Trip.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map(error => error.message)
            return res.status(400).json({ messages });
        }
        // Lấy giá trị ObjectId của BusHouse từ dữ liệu gửi từ phía client
        const { busHouseId, ...tripData } = req.body;
        // Thêm trường busHouse vào dữ liệu trip trước khi tạo bản ghi mới
        tripData.busHouse = busHouseId;
        const trip = await Trip.create(tripData);
        return res.status(200).json({ trip });
    } catch (error) {
        console.log(error);
    }
}

export const update = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ trip });
    } catch (error) {
        console.log(error);
    }
}

export const search = async (req, res) => {
    try {
        const { fromStation, toStation, startTime } = req.query;
        // Kiểm tra xem các tham số cần thiết đã được cung cấp hay chưa
        if (!fromStation || !toStation || !startTime) {
            return res.status(400).json({ message: 'Vui lòng cung cấp đủ thông tin từ trạm, đến trạm và thời gian bắt đầu.' });
        }
        // Tạo đối tượng Date từ startTime
        const startDate = new Date(startTime);
        // Đặt thời gian bắt đầu từ 00:00:00 của ngày được chỉ định
        startDate.setHours(0, 0, 0, 0);
        // Đặt thời gian kết thúc là 23:59:59 của ngày được chỉ định
        const endDate = new Date(startTime);
        endDate.setHours(23, 59, 59, 999);
        // Tìm kiếm các chuyến đi phù hợp với các điều kiện tìm kiếm
        const trips = await Trip.find({
            fromStation: { $regex: new RegExp(fromStation, 'i') },
            toStation: { $regex: new RegExp(toStation, 'i') },
            startTime: { $gte: startDate, $lte: endDate } // Tìm chuyến đi từ thời điểm bắt đầu đến cuối ngày
        }).populate('busHouse');
        // Kiểm tra nếu không có chuyến đi nào được tìm thấy
        if (trips.length === 0) {
            return res.status(404).json({ message: 'Không có chuyến xe nào trong ngày được chỉ định.' });
        }
        return res.status(200).json({ trips });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm chuyến đi.' });
    }
};

export const getTripHistory = async (req, res) => {
    try {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        const completedTrips = await Trip.find({ startTime: { $lt: currentDate } })
            .populate('busHouse');
        // Trả về kết quả cho client
        return res.json({ success: true, completedTrips });
    } catch (error) {
        // Nếu có lỗi xảy ra, trả về lỗi cho client
        return res.status(500).json({ success: false, message: error.message });
    }
};


