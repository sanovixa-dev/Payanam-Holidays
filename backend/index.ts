import express from "express";
import cors from "cors";
import router from "./routes/health.ts";
import enquiry from "./routes/enquiries.ts";
import login from "./routes/login.ts";
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use("/api", enquiry);
app.use("/api", login);

app.listen(Number(port), "0.0.0.0", () => {
  console.log("====================================");
  console.log(`Server is running on PORT: ${port}`);
  console.log("====================================");
});
