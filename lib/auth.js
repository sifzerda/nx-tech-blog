// lib/auth.js
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = "HS256";

export async function signJWT(user, options = {}) {
  // user = { id, username, email }
  return await new SignJWT({
    sub: user.id,        // user id under 'sub'
    username: user.username,
    email: user.email,
  })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(options.expiresIn || "7d")
    .sign(secret);
}

export async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload; // will contain sub, username, email
  } catch (err) {
    console.error("JWT verification error:", err);
    return null;
  }
}