import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    reminderSentToday: {
  type: Boolean,
  default: false,
},
reminderSentBefore: {
  type: Boolean,
  default: false,
},
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
