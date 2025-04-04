import { BadRequestException } from "../common/helpers/exception";
import prisma from "../common/prisma/init";

const orderService = {
  createOrder: async (req) => {
    const { userId, foodId, amount, code, arrSubId } = req.body;
    const parsedUserId = Number(userId);
    const parsedFoodId = Number(foodId);

    if (!userId || !foodId || !amount) {
      throw new BadRequestException("Thiếu userId, foodId hoặc số lượng món");
    }
    const [user, food] = await Promise.all([
      prisma.user.findUnique({ where: { id: parsedUserId } }),
      prisma.food.findUnique({ where: { id: parsedFoodId } }),
    ]);
    if (!user) {
      throw new BadRequestException("Không tìm thấy người dùng");
    }
    if (!food) {
      throw new BadRequestException("Không tìm thấy món ăn");
    }

    const newOrder = await prisma.order.create({
      data: {
        user_id: parsedUserId,
        food_id: parsedFoodId,
        amount: Number(amount),
        code: code || null,
        arr_sub_id: arrSubId || null,
        createAt: new Date(),
        updateAt: new Date(),
      },
    });

    return newOrder;
  },
};

export default orderService;
