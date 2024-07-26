"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getReviewById = exports.getReviewsByProduct = exports.createReview = void 0;
const ReviewModel_1 = __importDefault(require("../models/ReviewModel"));
const createReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const review = new ReviewModel_1.default(reviewData);
    yield review.save();
    return review;
});
exports.createReview = createReview;
const getReviewsByProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return ReviewModel_1.default.find({ product: productId }).populate('user', 'firstName lastName');
});
exports.getReviewsByProduct = getReviewsByProduct;
const getReviewById = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return ReviewModel_1.default.findById(reviewId).populate('user', 'firstName lastName');
});
exports.getReviewById = getReviewById;
const updateReview = (reviewId, reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    return ReviewModel_1.default.findByIdAndUpdate(reviewId, reviewData, { new: true }).populate('user', 'firstName lastName');
});
exports.updateReview = updateReview;
const deleteReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return ReviewModel_1.default.findByIdAndDelete(reviewId);
});
exports.deleteReview = deleteReview;
