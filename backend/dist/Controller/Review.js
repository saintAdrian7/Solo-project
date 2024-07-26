"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const reviewService = __importStar(require("../Services/Review"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rating, comment, userId } = req.body;
        const { productId } = req.params;
        const review = yield reviewService.createReview({
            user: userId,
            product: productId,
            rating,
            comment
        });
        yield ProductModel_1.default.findByIdAndUpdate(productId, { $push: { reviews: review._id } });
        res.status(201).json({ message: 'Review added successfully', review });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to add review', error: err.message });
    }
});
exports.createReview = createReview;
const getReviewsByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const reviews = yield reviewService.getReviewsByProduct(productId);
        res.status(200).json(reviews);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch reviews', error: err.message });
    }
});
exports.getReviewsByProduct = getReviewsByProduct;
const getReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewId } = req.params;
        const review = yield reviewService.getReviewById(reviewId);
        if (review) {
            res.status(200).json(review);
        }
        else {
            res.status(404).json({ message: 'Review not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch review', error: err.message });
    }
});
exports.getReviewById = getReviewById;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewId } = req.params;
        const reviewData = req.body;
        const review = yield reviewService.updateReview(reviewId, reviewData);
        if (review) {
            res.status(200).json({ message: 'Review updated successfully', review });
        }
        else {
            res.status(404).json({ message: 'Review not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to update review', error: err.message });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewId } = req.params;
        const review = yield reviewService.deleteReview(reviewId);
        if (review) {
            res.status(200).json({ message: 'Review deleted successfully', review });
        }
        else {
            res.status(404).json({ message: 'Review not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete review', error: err.message });
    }
});
exports.deleteReview = deleteReview;
