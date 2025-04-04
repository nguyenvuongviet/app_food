import express from "express";
import { handleError } from "./src/common/helpers/error";
import logApi from "./src/common/morgan/init";
import rootRouter from "./src/routers/root";

const app = express();

app.use(express.json());
app.use(logApi());
// app.use(cors({ origin: ["http://localhost:3000"] }));

app.use(rootRouter);
app.use(handleError);

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
