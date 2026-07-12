import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase";

export async function login(email: string, password: string) {
  const { data: admin, error } = await supabase
    .from("admins")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !admin) {
    return {
      success: false,
      status: 401,
      message: "Invalid login credentials",
    };
  }

  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) {
    return {
      success: false,
      status: 401,
      message: "Invalid login credentials",
    };
  }

  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      role: "admin",
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    },
  );

  return {
    success: true,
    status: 200,
    token,
    user: {
      id: admin.id,
      email: admin.email,
      role: "admin",
    },
  };
}
