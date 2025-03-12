import { BASE_URL } from "@/data/constants";
import { token } from "@/data/token";
import { NextResponse } from "next/server";

export async function createNewEmployee(payload) {
  try {
    const response = await fetch(`${BASE_URL}/employees`, {
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

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
