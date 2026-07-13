import type { Request, Response } from "express";
import express from "express";
import pool from "../connection.js";
let login = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
login.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      `select * from payanam_owner where email = $1`,
      [email],
    );
    if (result.rows.length === 0) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
    const owner = result.rows[0];

    const match = await bcrypt.compare(password, owner.password);

    if (!match) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not set"); // crash rather than run insecurely
    }

    const token = jwt.sign({ id: owner.id, email: owner.email }, secret, {
      expiresIn: "7d",
    });
    res.status(200).send({ message: "Logged In Successfully", token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

export default login;
