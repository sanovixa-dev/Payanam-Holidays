import express from "express";
import type { Request, Response } from "express";
import pool from "../connection.js";
import { Resend } from "resend";
import verifyJWT from "../middlewares/verifyJWT.js";
const enquiry = express.Router();
const resend_key = new Resend(process.env.RESEND_API_KEY);
enquiry.post("/enquiries", async (req: Request, res: Response) => {
  const {
    name,
    phone,
    travel_date,
    number_of_people,
    message,
    package: pkg_id,
  } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).send({ message: "Name is required" });
  }
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).send({ message: "Valid phone required" });
  }
  if (!travel_date || !travel_date.trim()) {
    return res.status(400).send({ message: "Travel date is required" });
  }
  if (!number_of_people || !number_of_people.trim()) {
    return res.status(400).send({ message: "Number of people is required" });
  }
  if (!pkg_id || !pkg_id.trim()) {
    return res.status(400).send({ message: "Package Id is required" });
  }
  let enquiryID;
  try {
    const insert = await pool.query(
      `insert into payanam_enquiries(name, phone, travel_dates, number_of_people, message, package_id) values($1, $2, $3, $4, $5, $6) returning id`,
      [name, phone, travel_date, Number(number_of_people), message, pkg_id],
    );
    enquiryID = insert.rows[0].id;
    console.log(enquiryID);
    res.status(201).send({ message: "Form Submitted Successfully" });
  } catch (err) {
    console.error("Error creating", err);
    return res.status(500).send({ message: "Something went wrong" });
  }
  try {
    await resend_key.emails.send({
      from: "onboarding@resend.dev",
      to: "kizhorekumar5@gmail.com",
      subject: "New enquiry - Payanam Holidays",
      html: `<p>Name: ${name}</p>
            <p>Mobile No: ${phone}</p>
            <p>Package: ${pkg_id}</p>
              <p>Travel Date: ${travel_date}</p>
      <p>Number of People: ${number_of_people}</p>
      <p>Message: ${message}</p>
      `,
    });
    await pool.query(
      `update payanam_enquiries set delivery_status = 'sent' , delivered_at = Now() where id = $1`,
      [enquiryID],
    );
  } catch (err) {
    await pool.query(
      `update payanam_enquiries set delivery_status = 'failed' where id = $1`,
      [enquiryID],
    );
    console.error("Cant send mail. Something went wrong");
  }
});

enquiry.get("/enquiries", verifyJWT, async (req: Request, res: Response) => {
  try {
    const enquiries = await pool.query(
      `select * from payanam_enquiries order by created_at desc`,
    );
    return res.status(200).send({ enquiries: enquiries.rows });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
});
export default enquiry;
