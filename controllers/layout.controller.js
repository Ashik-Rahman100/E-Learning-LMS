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
exports.getLayoutByType = exports.editLayout = exports.createLayout = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const catchAsync_1 = require("../middleware/catchAsync");
const layout_model_1 = __importDefault(require("../models/layout.model"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
// create Layout
exports.createLayout = (0, catchAsync_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.body;
        const isTypeExist = yield layout_model_1.default.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler_1.default(`${type} already exist`, 400));
        }
        if (type === "Banner") {
            const { image, title, subTitle } = req.body;
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout",
            });
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle,
            };
            yield layout_model_1.default.create(banner);
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const FaqItems = yield Promise.all(faq.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                return {
                    question: item.question,
                    answer: item.answer,
                };
            })));
            yield layout_model_1.default.create({ type: "FAQ", faq: FaqItems });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            const categoriesItems = yield Promise.all(categories.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                return {
                    title: item.title,
                };
            })));
            yield layout_model_1.default.create({
                type: "Categories",
                categories: categoriesItems,
            });
        }
        res.status(200).json({
            success: true,
            message: "Layout created successfully.",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// Edit Layout
exports.editLayout = (0, catchAsync_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.body;
        if (type === "Banner") {
            const bannerData = yield layout_model_1.default.findOne({ type: "Banner" });
            const { image, title, subTitle } = req.body;
            if (bannerData) {
                yield cloudinary_1.default.v2.uploader.destroy(bannerData.image.public_id);
            }
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout",
            });
            const banner = {
                type: "Banner",
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle,
            };
            yield layout_model_1.default.findByIdAndUpdate(bannerData._id, { banner });
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const faqItem = yield layout_model_1.default.findOne({ type: "FAQ" });
            const FaqItems = yield Promise.all(faq.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                return {
                    question: item.question,
                    answer: item.answer,
                };
            })));
            yield layout_model_1.default.findByIdAndUpdate(faqItem === null || faqItem === void 0 ? void 0 : faqItem._id, {
                type: "FAQ",
                faq: FaqItems,
            });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            const categoriesData = yield layout_model_1.default.findOne({
                type: "Categories",
            });
            const categoriesItems = yield Promise.all(categories.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                return {
                    title: item.title,
                };
            })));
            yield layout_model_1.default.findByIdAndUpdate(categoriesData === null || categoriesData === void 0 ? void 0 : categoriesData._id, {
                type: "Categories",
                categories: categoriesItems,
            });
        }
        res.status(200).json({
            success: true,
            message: "Layout Updated successfully.",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// Get Layout by type
exports.getLayoutByType = (0, catchAsync_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.body;
        const layout = yield layout_model_1.default.findOne({ type });
        res.status(200).json({
            success: true,
            layout,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
