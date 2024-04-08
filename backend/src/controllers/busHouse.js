import BusHouse from "../model/busHouse";

export const getAll = async (req, res) => {
    try {
        const busHouse = await BusHouse.find();
        return res.status(200).json({ busHouse });
    } catch (error) {
        console.log(error);
    }
}

export const getById = async (req, res) => {
    try {
        const busHouse = await BusHouse.findById(req.params.id);
        return res.status(200).json({ busHouse });
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (req, res) => {
    try {
        const busHouse = await BusHouse.findByIdAndDelete(req.params.id);
        return res.status(200).json({ busHouse });
    } catch (error) {
        console.log(error);
    }
}

export const add = async (req, res) => {
    try {
        const { error } = BusHouse.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.details.map(error => error.message)
            return res.status(400).json({ messages });
        }
        const busHouse = await BusHouse.create(req.body);
        return res.status(200).json({ busHouse });
    } catch (error) {
        console.log(error);
    }
}
export const update = async (req, res) => {
    try {
        const busHouse = await BusHouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json({ busHouse });
    } catch (error) {
        console.log(error);
    }
}