const { ratingSchema } = require("../validators/ratingValidator");

const ratingService = require("../services/ratingService");

class RatingController {
  async submit(req, res, next) {
    try {
      const payload = ratingSchema.parse(req.body);

      const result = await ratingService.submitRating(
        req.user.id,
        payload.storeId,
        payload.rating,
      );

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const rating = Number(req.body.rating);

      const result = await ratingService.updateRating(
        req.user.id,
        req.params.storeId,
        rating,
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RatingController();
