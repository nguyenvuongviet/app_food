import express from "express";
import likeController from "../controllers/like";

const likeRouter = express.Router();

likeRouter.post(`/`, likeController.like);
likeRouter.post(`/unlike`, likeController.unlike);
likeRouter.get(`/restaurant/:id`, likeController.getLikesByRestaurant);
likeRouter.get(`/user/:id`, likeController.getLikesByUser);

export default likeRouter;
