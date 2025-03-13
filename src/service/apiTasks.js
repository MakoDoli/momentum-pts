import { BASE_URL } from "@/data/constants";
import { NextResponse } from "next/server";

export async function createNewTask(payload) {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: payload,
    });

    if (!response.ok) {
      console.error("Request Failed");
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
