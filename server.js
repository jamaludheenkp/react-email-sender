const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors")

const app = express();
app.use(cors())

app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server running"));

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "scottishcoder99@gmail.com",
    pass: "jlkovryyotvpgrhg",
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
  const message = req.body.message;
  const mail = {
    from: name,
    to: "scottishcoder99@gmail.com",
    subject: "Contact Form Submission",
    html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>MessageP: ${message}</p>
        `,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
