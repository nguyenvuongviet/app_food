import { responseSuccess } from "../common/helpers/reponse";
import reviewService from "../services/review";

const reviewController = {
  createReview: async (req, res, next) => {
    try {
      const result = await reviewService.createReview(req);
      const response = responseSuccess(result, `Tạo review thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  getReviewsByRestaurant: async (req, res, next) => {
    try {
      const result = await reviewService.getReviewsByRestaurant(req);
      const response = responseSuccess(
        result,
        `Lấy danh sách review theo nhà hàng	thành công`
      );
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
  getReviewsByUser: async (req, res, next) => {
    try {
      const result = await reviewService.getReviewsByUser(req);
      const response = responseSuccess(
        result,
        `Lấy danh sách review theo người dùng thành công`
      );
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};
export default reviewController;
