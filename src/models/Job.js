import { Schema } from "mongoose";
import mongoose from "mongoose";

const JobSchema = new Schema(
  {
    companyName: {
      type: String,
      trim: true,
      require: [true, "Provide compnay's name"],
    },
    position: {
      type: String,
      require: [true, "Provide the open position"],
    },
    skills: {
      type: [String],
    },
    description: {
      type: String,
    },
    contractType: {
      type: String,
      enum: ["full-time", "contracter", "partial"],
      default: "full-time",
    },
    skillLevel: {
      type: String,
      enum: ["senior", "entry", "junior", "intermidiate"],
    },
    salary: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
