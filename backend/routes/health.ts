import express from "express";
import type { Request, Response } from "express";
const router = express.Router();
router.route("/health").get((req: Request, res: Response) => {
  res.status(200).send({ message: "OK" });
});
export default router;
