import { BadRequestException } from "../common/helpers/exception";
import prisma from "../common/prisma/init";

const likeService = {
  like: async (req) => {
    const { userId, resId } = req.body;
    const parsedUserId = Number(userId);
    const parsedResId = Number(resId);

    if (!userId || !resId) {
      throw new BadRequestException("Thiếu userId hoặc resId");
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
    const existingLike = await prisma.like_res.findFirst({
      where: {
        user_id: parsedUserId,
        res_id: parsedResId,
        isDeleted: false,
      },
    });
    if (existingLike) {
      throw new BadRequestException("Bạn đã like nhà hàng này!");
    }

    return await prisma.like_res.create({
      data: {
        user_id: parsedUserId,
        res_id: parsedResId,
        date_like: new Date(),
      },
    });
  },

  unlike: async (req) => {
    const { userId, resId } = req.body;
    const parsedUserId = Number(userId);
    const parsedResId = Number(resId);

    if (!userId || !resId) {
      throw new BadRequestException("Thiếu userId hoặc resId");
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

    const updateResult = await prisma.like_res.updateMany({
      where: {
        user_id: parsedUserId,
        res_id: parsedResId,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    if (updateResult.count === 0) {
      throw new BadRequestException("Bạn chưa like nhà hàng này");
    }

    return {
      message: "Hủy like thành công",
    };
  },

  getLikesByRestaurant: async (req) => {
    const { id: resId } = req.params;
    const parsedResId = Number(resId);

    if (!resId) {
      throw new BadRequestException("Thiếu resId");
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parsedResId },
    });
    if (!restaurant) {
      throw new BadRequestException("Nhà hàng không tồn tại");
    }

    return await prisma.like_res.findMany({
      where: {
        res_id: parsedResId,
        isDeleted: false,
      },
      include: {
        user: { select: { id: true, full_name: true, email: true } },
      },
    });
  },

  getLikesByUser: async (req) => {
    const { id: userId } = req.params;
    const parsedUserId = Number(userId);

    if (!userId) {
      throw new BadRequestException("Thiếu userId");
    }

    const user = await prisma.user.findUnique({
      where: { id: parsedUserId },
    });
    if (!user) {
      throw new BadRequestException("Người dùng không tồn tại");
    }

    return await prisma.like_res.findMany({
      where: {
        user_id: parsedUserId,
        isDeleted: false,
      },
      include: {
        restaurant: { select: { id: true, name: true, image: true } },
      },
    });
  },
};

export default likeService;
