import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "No headers provided" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(401).send({ message: "No Secret is set" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }
    const decode = jwt.verify(token, secret);
    (req as any).owner = decode;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid token" });
  }
};

export default verifyJWT;
