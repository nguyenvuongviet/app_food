import { responseSuccess } from "../common/helpers/reponse";
import likeService from "../services/like";

const likeController = {
  like: async (req, res, next) => {
    try {
      const result = await likeService.like(req);
      const response = responseSuccess(result, `Like thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },

  unlike: async (req, res, next) => {
    try {
      const result = await likeService.unlike(req);
      const response = responseSuccess(result, `Huỷ like thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  
  getLikesByRestaurant: async (req, res, next) => {
    try {
      const result = await likeService.getLikesByRestaurant(req);
      const response = responseSuccess(
        result,
        `Lấy danh sách like theo nhà hàng thành công`
      );
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  getLikesByUser: async (req, res, next) => {
    try {
      const result = await likeService.getLikesByUser(req);
      const response = responseSuccess(
        result,
        `Lấy danh sách like theo user thành công`
      );
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default likeController;
