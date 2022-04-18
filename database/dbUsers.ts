import { db } from ".";
import { User } from "../models";
import bcrypt from "bcryptjs";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();
  if (!user) return null;
  if (!bcrypt.compareSync(password, user.password!)) return null;
  const { role, name, _id } = user;

  return { role, name, _id, email: email.toLocaleLowerCase() };
};
