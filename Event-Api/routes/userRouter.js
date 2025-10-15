import express from "express"
import { createUser } from "../controllers/usercontroller";
import validateInput from "../middlewares/validInput";

const router = express.Router();
 



router.post('/', validateInput(['name', 'email']), createUser);
 
export default router
