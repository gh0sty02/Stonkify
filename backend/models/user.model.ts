import mongoose, { Schema } from "mongoose";
import * as bcrypt from "bcryptjs";
import IUser from "../Interfaces/user.interface";

export interface IUserDocument extends IUser, Document {
  matchPassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      default: false,
      type: Boolean,
      required: true,
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
        default: [],
      },
    ],
    cartItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cart",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: IUserDocument, next) {
  // @ts-ignore: Unreachable code error
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  const result = await bcrypt.compare(enteredPassword, this.password);
  return result;
};

const User = mongoose.model("User", userSchema);

export default User;
