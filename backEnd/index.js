import express from "express";
import cors from "cors";
import router from "./routes/start.js";

const app = express();
const port = 3000;


app.use(cors());

app.use(express.json());

app.use("/", router);

const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

initializeApp();