import { BASE_URL } from "@/data/constants";
import { token } from "@/data/token";
import { NextResponse } from "next/server";

export async function getDepartments() {
  try {
    const response = await fetch(`${BASE_URL}/departments
            `);
    const departments = await response.json();
    return departments;
  } catch (err) {
    console.error(err);
  }
}

export async function getEmployees() {
  try {
    const response = await fetch(
      `${BASE_URL}/employees
      `,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!response.ok) console.error("Request failed");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: "Something went wrong getting employees",
    });
  }
}

export async function getTasks() {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) console.error("Request failed");
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function getPriorities() {
  try {
    const response = await fetch(`${BASE_URL}/priorities`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) console.error("Request failed");
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function getStatuses() {
  try {
    const response = await fetch(`${BASE_URL}/statuses`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) console.error("Request failed");
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}

export async function getTaskById(id) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) console.error("Request failed");
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
