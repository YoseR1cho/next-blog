import mongoose from "mongoose";

let topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    articleIds: {
        type: Array,
        required: true,
    },
});
topicSchema.pre("save", function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = new Date();
    } else {
        this.updateAt = new Date();
    }
    next();
});

let articleTopicAssociationSchema = new mongoose.Schema({
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "articles",
        required: true,
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topics",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// 添加复合唯一索引
articleTopicAssociationSchema.index(
    { articleId: 1, topicId: 1 },
    { unique: true }
);
const topics = mongoose.models.topics || mongoose.model("topics", topicSchema);
const articleTopicAssociations =
    mongoose.models.articleTopicAssociations ||
    mongoose.model("articleTopicAssociations", articleTopicAssociationSchema);

export { topics, articleTopicAssociations };
