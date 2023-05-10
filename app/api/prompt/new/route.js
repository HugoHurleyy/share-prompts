import { connectDb } from "@utils/connectDb";
import Prompt from "@models/prompt";
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectDb();
    const newPrompt = await Prompt.create({
      creator: userId,
      tag,
      prompt,
    });

    return new Response(newPrompt, { status: 201 });
  } catch (error) {
    return new Response("Failed to create new prompt", { status: 500 });
  }
};
