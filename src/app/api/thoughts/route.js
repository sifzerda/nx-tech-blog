// app/api/thoughts/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { verifyJWT } from "../../../../lib/auth";

function getUserFromToken(request) {
  const authHeader = request.headers.get("authorization");

  console.log("Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No Bearer token found in headers");
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyJWT(token);
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}

export async function POST(request) {
  try {
    const user = await getUserFromToken(request);

    if (!user) {
      console.log("Unauthorized attempt to submit thought");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await request.json();
    console.log("Incoming thought:", { title, content, user });

    if (!title || !content) {
      console.log("Missing title or content");
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const thought = await prisma.thought.create({
      data: {
        title,
        content,
        userId: user.sub, // Make sure your JWT payload uses `sub` for the user ID
      },
      include: { user: true },
    });

    console.log("Thought created:", thought);

    return NextResponse.json(thought, { status: 201 });
  } catch (err) {
    console.error("Create thought error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const thoughts = await prisma.thought.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    console.log("Fetched thoughts:", thoughts.length);

    return NextResponse.json(thoughts);
  } catch (err) {
    console.error("Fetch thoughts error:", err);
    return NextResponse.json({ error: "Failed to fetch thoughts" }, { status: 500 });
  }
}