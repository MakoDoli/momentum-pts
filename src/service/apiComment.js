import { BASE_URL } from "@/data/constants";
import { token } from "@/data/token";
import { NextResponse } from "next/server";

export async function createCommentByTaskId(formData) {
  try {
    const { payload, taskId } = formData;

    const response = await fetch(`${BASE_URL}/tasks/${taskId}/comments`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.error("Request failed");
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
