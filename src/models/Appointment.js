const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true
    },
    buyerName: {
      type: String,
      required: true,
      trim: true
    },
    buyerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    appointmentDate: {
      type: Date,
      required: true
    },
    message: {
      type: String,
      trim: true,
      default: ""
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Completed"],
      default: "Pending"
    },
    sellerResponse: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

appointmentSchema.index({ buyerEmail: 1, createdAt: -1 });
appointmentSchema.index({ item: 1, appointmentDate: 1 });

module.exports = mongoose.model("Appointment", appointmentSchema);
