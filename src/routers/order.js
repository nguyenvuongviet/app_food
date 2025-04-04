import express from "express";
import orderController from "../controllers/order";

const orderRouter = express.Router();

orderRouter.post(`/create`, orderController.createOrder);

export default orderRouter;
