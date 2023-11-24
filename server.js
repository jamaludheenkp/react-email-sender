const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors")

const app = express();
app.use(cors())

app.use(express.json());
app.use("/", router);
app.listen(8080, () => console.log("Server is running on port "));

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jamal@adsomia.com",
    pass: "tbqlmtqnyxrgsvsz",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const number = req.body.number;
  const subject = req.body.subject;
  const message = req.body.message;
  const mail = {
    from: name,
    to: "jamal@adsomia.com",
    subject: "Contact Form Submission",
    html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Number: ${number}</p>
            <p>Subject: ${subject}</p>
            <p>Message: ${message}</p>
        `,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Form submitted successfully" });
    }
  });
});
