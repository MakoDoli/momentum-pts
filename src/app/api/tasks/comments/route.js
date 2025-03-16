import { createCommentByTaskId } from "@/service/apiComment";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log(data);
    const { text, parent_id } = data.payload;
    console.log(text, parent_id);
    const formData = new FormData();
    formData.append("text", text);
    formData.append("parent_id", parent_id);
    console.log([...formData.entries()]);
    const response = await createCommentByTaskId({
      formData,
      taskId: data.taskId,
    });
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "API Internal Server Error" }),
      { status: 500 }
    );
  }
}
