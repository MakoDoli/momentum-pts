import { BASE_URL } from "@/data/constants";
import { token } from "@/data/token";
import { NextResponse } from "next/server";

export async function updateStatus(formData) {
  const { payload, taskId } = formData;
  try {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Request Failed");
    }

    const data = await response.json();

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
