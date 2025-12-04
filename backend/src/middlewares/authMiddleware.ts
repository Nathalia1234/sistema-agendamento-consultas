import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JWTPayload {
  id: number;
}

export default function authMiddleware(
  req: Request & { user?: { id: number } },
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;

    req.user = { id: decoded.id }; // adiciona o ID corretamente
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}
