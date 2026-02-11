import { NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { adminDb } from "../../../../lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { uid, email, first_name, last_name } = body;

    if (!uid || !email) {
      return NextResponse.json(
        {
          success: false,
          status: 400,
          title: "Invalid request",
          description: "Email and uid are required.",
        },
        { status: 400 },
      );
    }

    const userRef = adminDb.collection("users").doc(uid);
    const userSnap = await userRef.get();

    const now = Timestamp.now();

    if (userSnap.exists) {
      await userRef.update({
        last_login: now,
      });

      return NextResponse.json(
        {
          success: true,
          data: {
            action: "updated",
            uid,
          },
        },
        { status: 200 },
      );
    }

    await userRef.set({
      email,
      first_name: first_name ?? null,
      last_name: last_name ?? null,
      created_at: now,
      last_login: now,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          action: "created",
          uid,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("User sync error:", error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        title: "Server error",
        description: "Failed to sync Firebase user.",
      },
      { status: 500 },
    );
  }
}
