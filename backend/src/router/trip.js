import { Router } from "express";
import { add, deleteTrip, getAll, getById, getTripHistory, search, update } from "../controllers/trip";

const router = Router();
router.get('/trips', getAll);
router.get('/trip/:id', getById);
router.post('/trip/add', add);
router.put('/trip/:id', update);
router.delete('/trip/:tripId', deleteTrip);
router.get('/trips/search', search);
router.get('/history', getTripHistory);

export default router;