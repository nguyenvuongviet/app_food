import express from "express";
import reviewController from "../controllers/review";

const reviewRouter = express.Router();

reviewRouter.post(`/create`, reviewController.createReview);
reviewRouter.get(`/restaurant/:id`, reviewController.getReviewsByRestaurant);
reviewRouter.get(`/user/:id`, reviewController.getReviewsByUser);

export default reviewRouter;
