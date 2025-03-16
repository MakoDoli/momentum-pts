import { updateStatus } from "@/service/apiStatus";

export async function PUT(request) {
  try {
    const payload = await request.json();

    const { statusId, taskId } = payload;
    const formData = new FormData();
    formData.append("status_id", statusId);
    console.log([...formData.entries()]);
    const response = await updateStatus({ formData, taskId });
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "API Internal Server Error" }),
      { status: 500 }
    );
  }
}
