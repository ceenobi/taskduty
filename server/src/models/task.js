import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    max: 50,
  },
  description: {
    type: String,
    required: true,
    max: 300,
  },
  tags: {
    type: String,
    default: "Urgent",
    required: true,
  },
},
{
    timestamps: true,
}
);

export default model("Task", taskSchema);