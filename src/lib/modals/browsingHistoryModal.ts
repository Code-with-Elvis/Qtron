import mongoose from "mongoose";

const browsingHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
browsingHistorySchema.index({ userId: 1 }, { unique: true });
browsingHistorySchema.index({ updatedAt: -1 });

const BrowsingHistory =
  mongoose.models.BrowsingHistory ||
  mongoose.model("BrowsingHistory", browsingHistorySchema);

export default BrowsingHistory;
