import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  comparePassword(candidatePassword: string): Promise<boolean>;
  _id: mongoose.Types.ObjectId;
  resetPasswordExpires?: Date;
  resetPasswordToken?: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  phone: string;
}

const userSchema = new Schema(
  {
    firstName: {
      required: [true, "First name is required"],
      maxlength: [50, "First name cannot exceed 50 characters"],
      type: String,
      trim: true,
    },
    lastName: {
      maxlength: [50, "Last name cannot exceed 50 characters"],
      required: [true, "Last name is required"],
      type: String,
      trim: true,
    },
    email: {
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      type: String,
      trim: true,
    },
    phone: {
      required: [true, "Phone number is required"],
      type: String,
      trim: true,
    },
    password: {
      minlength: [6, "Password must be at least 6 characters"],
      required: [true, "Password is required"],
      type: String,
    },
    resetPasswordToken: {
      type: String,
      default: undefined,
    },
    resetPasswordExpires: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(12));
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set("toJSON", {
  transform: (_doc: unknown, ret: Record<string, unknown>) => {
    ret.resetPasswordExpires = undefined;
    ret.resetPasswordToken = undefined;
    ret.password = undefined;
    ret.__v = undefined;
    return ret;
  },
});

export const User = mongoose.model<IUser>("User", userSchema);
