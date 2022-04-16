import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { db } from "../../../database";
import { User } from "../../../models";
import { jwt, validations } from "../../../utils";

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        name: string;
        email: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  if (password.length < 6) {
    return res.status(400).json({
      message: "La contraseña debe tener al menos 6 caracteres",
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: "El nombre debe tener al menos 3 caracteres",
    });
  }

  //TODO: validar email

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();
    return res.status(400).json({
      message: `Ese correo ya está en uso`,
    });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({
      message: `El correo no es válido`,
    });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: "client",
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
    await db.disconnect();
  } catch (error) {
    console.log("🚀 ~ file: register.ts ~ line 75 ~ error", error);
    return res.status(500).json({ message: "Revisar logs del servidor" });
  }

  const { _id, role } = newUser;
  const token = jwt.signToken(_id, email);
  return res.status(200).json({
    token,
    user: {
      role,
      name,
      email,
    },
  });
};
