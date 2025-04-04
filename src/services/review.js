import { BadRequestException } from "../common/helpers/exception";
import prisma from "../common/prisma/init";

const reviewService = {
  createReview: async (req) => {
    const { userId, resId, amount } = req.body;
    const parsedUserId = Number(userId);
    const parsedResId = Number(resId);

    if (!userId || !resId || typeof amount === "undefined") {
      throw new BadRequestException("Thiếu userId, resId hoặc đánh giá");
    }

    const [user, restaurant] = await Promise.all([
      prisma.user.findUnique({ where: { id: parsedUserId } }),
      prisma.restaurant.findUnique({ where: { id: parsedResId } }),
    ]);

    if (!user) {
      throw new BadRequestException("Không tìm thấy người dùng");
    }
    if (!restaurant) {
      throw new BadRequestException("Không tìm thấy nhà hàng");
    }

    return await prisma.rate_res.create({
      data: {
        user_id: parsedUserId,
        res_id: parsedResId,
        amount: Number(amount),
        date_rate: new Date(),
        createAt: new Date(),
        updateAt: new Date(),
      },
    });
  },

  getReviewsByRestaurant: async (req) => {
    const { id: resId } = req.params;
    const parsedResId = Number(resId);

    if (!resId) {
      throw new BadRequestException("Thiếu resId");
    }
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parsedResId },
    });
    if (!restaurant) {
      throw new BadRequestException("Không tìm thấy nhà hàng");
    }
    const reviews = await prisma.rate_res.findMany({
      where: {
        res_id: parsedResId,
        isDeleted: false,
      },
      include: {
        user: true,
      },
    });
    if (!reviews.length) {
      throw new BadRequestException("Không có đánh giá nào cho nhà hàng này");
    }

    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + review.amount, 0);
    const averageRating = totalRating / totalReviews;

    const ratingCount = reviews.reduce((acc, review) => {
      acc[review.amount] = (acc[review.amount] || 0) + 1;
      return acc;
    }, {});
    const ratingDistribution = Object.entries(ratingCount).map(
      ([rating, count]) => ({
        rating: Number(rating),
        count,
      })
    );

    return {
      averageRating: averageRating.toFixed(1),
      totalReviews,
      ratingDistribution,
    };
  },

  getReviewsByUser: async (req) => {
    const { id: userId } = req.params;
    const parsedUserId = Number(userId);

    if (!userId) {
      throw new BadRequestException("Thiếu userId");
    }
    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
    });
    if (!user) {
      throw new BadRequestException("Không tìm thấy người dùng");
    }

    return await prisma.rate_res.findMany({
      where: {
        user_id: parsedUserId,
        isDeleted: false,
      },
      include: {
        restaurant: true,
      },
    });
  },
};

export default reviewService;
