import express from 'express';
import { addFood, listFood,removeFood } from '../controllers/foodControllers.js';
import multer from 'multer';

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // use backticks for string interpolation
  }
});

const upload = multer({ storage: storage });

// Route to handle food creation with image upload
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)

export default foodRouter;
