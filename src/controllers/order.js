import { responseSuccess } from "../common/helpers/reponse";
import orderService from "../services/order";

const orderController = {
  createOrder: async (req, res, next) => {
    try {
      const result = await orderService.createOrder(req);
      const response = responseSuccess(result, `Tạo order	thành công`);
      res.status(response.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  },
};

export default orderController;
