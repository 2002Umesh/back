require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const connectDb = require("./utils/db");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const paymentRoute = require("./router/payment-router");
const errorMiddleware = require("./middlewares/error-middleware.js");
const PORT = process.env.PORT || 5000;

//middleware
//handling cors policy and hosting
const corsOptions = {
  origin: "https://cloneplusdisney.netlify.app",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  Credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/auth", authRoute);
// app.use("/api/form", contactRoute);

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/payment", paymentRoute);

app.use(errorMiddleware);

// app.get("/", (req, res) => {
//   res.status(200).send("welcome user to my server");
// });
// app.get("/about", (req, res) => {
//   res.status(200).send("welcome user to my about");
// });
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
  });
});
