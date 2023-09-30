import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

/* middleware for handling CORS policy */
app.use(cors());
/* app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
); */

/* middleware for parsing request body */
app.use(express.json());

/* express application setup */
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Hello, Welcome!!");
});

app.use("/books", booksRoute);

/* mongodb database connect */
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
