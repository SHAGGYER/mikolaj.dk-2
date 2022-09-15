import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export const USER_ACCESS_LEVEL = {
  GUEST: "Guest",
  USER: "User",
  ADMIN: "Admin",
};

interface Address {
  street: string;
  zip: number;
  city: string;
  fullName: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  accessLevel: string;
  name: string;
  passwordResetToken?: number;
  tempPassword?: string;
  stripeCustomerId?: string;
  stripePaymentMethodId?: string;
  stripeCardBrand?: string;
  stripeCardLast4?: number;
  stripeCardExpMonth?: number;
  stripeCardExpYear?: number;
  stripeCardHolderName?: string;
  address?: Address;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: String,
    email: String,
    password: String,
    accessLevel: String,
    passwordResetToken: Number,
    tempPassword: String,
    stripeCustomerId: String,
    stripePaymentMethodId: String,
    stripeCardBrand: String,
    stripeCardLast4: Number,
    stripeCardExpMonth: Number,
    stripeCardExpYear: Number,
    stripeCardHolderName: String,
    address: Object,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  user.password = await bcrypt.hash(user.password, 10);
  next();
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
