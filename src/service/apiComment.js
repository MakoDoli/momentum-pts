import { BASE_URL } from "@/data/constants";
import { token } from "@/data/token";
import { NextResponse } from "next/server";

export async function createCommentByTaskId(formData) {
  try {
    console.log(formData);
    const response = await fetch(`${BASE_URL}/tasks/492/comments`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    if (!response.ok) {
      console.error("Request failed");
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 }
      );
    }
    const data = await response.json();
    //return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
