import { Request, Response } from "express";
import Movie from "../models/movieModel";
import mongoose from "mongoose";
// function to get all movies
export const getMovies = async (_req: Request, res: Response) => {
  const movies = await Movie.find();
  res.status(200).json(movies);
};

// function to search movies
// it can accept two parameters(undefinded values also accepted)
export const searchMovies = async (req: Request, res: Response) => {
  try {
    // Type-safe extraction of query parameters
    const title: string | undefined = req.query.title as string | undefined;
    const genre: string | undefined = req.query.genre as string | undefined;

    // Build the search query
    const searchQuery: { [key: string]: unknown } = {};
    if (title) searchQuery.title = { $regex: new RegExp(title, "i") }; // Case-insensitive
    if (genre) searchQuery.genre = { $regex: new RegExp(genre, "i") }; // Case-insensitive

    // Fetch movies based on the search query
    const movies = await Movie.find(searchQuery);

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addMovie = async (req: Request, res: Response) => {
  try {
    const { title } = req.body; 
    if (!title) {
      res.status(400).json({ message: 'Title is required.' });
      return;
    }

    // Check if the movie already exists
    const existingMovie = await Movie.findOne({ title });
    if (existingMovie) {
      res.status(400).json({ message: 'Movie already exists.' });
      return;
    }

    //If not  Create and save the new movie
    const movie = new Movie(req.body);
    await movie.save();

    res.status(201).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const { id: movieId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    res.status(400).json({ message: 'Invalid movie ID format' });
    return;
  }
  try {
    const movie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true });
    // cheking movie is there or not( handling worng id case)
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return; 
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error});
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id: movieId } = req.params;
  try {
    // cheking movie is there or not with given id( handling worng id case)
    const movie = await Movie.findByIdAndDelete(movieId);
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return; 
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
