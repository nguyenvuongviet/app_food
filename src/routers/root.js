import express from "express";
import likeRouter from "./like";
import orderRouter from "./order";
import reviewRouter from "./review";

const rootRouter = express.Router();

rootRouter.use(`/api/like`, likeRouter);
rootRouter.use(`/api/review`, reviewRouter);
rootRouter.use(`/api/order`, orderRouter);

export default rootRouter;
