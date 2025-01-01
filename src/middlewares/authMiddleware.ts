import { Request, Response, NextFunction } from "express";


// Assuming the role is passed in a custom header
// if token based authentication we can include role in the payload also
// if it is session bases authentication we have store role in the session also
const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  const userRole = req.headers["x-role"]; 

  if (userRole !== "admin") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return; // Explicitly return to ensure no further code is executed
  }

  next(); // Call the next middleware or route handler
};

export { checkAdminRole };
