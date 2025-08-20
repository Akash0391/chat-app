import { Schema, model } from "mongoose";
import { ConversationProps } from "../types";

const conversationSchema = new Schema<ConversationProps>({
    type: {
        type: String,
        enum: ["direct", "group"],
        required: true,
    },
    name: {
        type: String,
    },
    participants: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: true,
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    avatar: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

conversationSchema.pre("save", function (next) {
    (this as any).updatedAt = new Date(); // update the updatedAt field
    next();
});

export default model<ConversationProps>("Conversation", conversationSchema);