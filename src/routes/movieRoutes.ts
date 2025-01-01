import express from "express";
import {getMovies,searchMovies,addMovie,updateMovie,deleteMovie} from "../controllers/movieController";
import { checkAdminRole } from "../middlewares/authMiddleware";

const router = express.Router();

//routes of movie page or service

router.get("/movies", getMovies);
router.get("/search", searchMovies);
router.post("/movies", addMovie);
router.put("/movies/:id",checkAdminRole, updateMovie);
router.delete("/movies/:id",checkAdminRole,deleteMovie);

export default router;
