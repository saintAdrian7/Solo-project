"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Review_1 = require("../Controller/Review");
const router = express_1.default.Router();
router.post('/:productId/', Review_1.createReview);
router.get('/:productId/', Review_1.getReviewsByProduct);
router.get('/review/:reviewId', Review_1.getReviewById);
router.patch('/review/:reviewId', Review_1.updateReview);
router.delete('/review/:reviewId', Review_1.deleteReview);
exports.default = router;
