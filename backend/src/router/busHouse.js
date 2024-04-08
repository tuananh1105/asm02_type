import { Router } from "express";
import { add, getAll, getById, remove, update } from "../controllers/busHouse";

const router = Router();
router.get('/busHouse', getAll);
router.get('/busHouse/:id', getById);
router.delete('/busHouse/:id', remove);
router.post('/busHouse/add', add);
router.put('/busHouse/:id', update);

export default router;