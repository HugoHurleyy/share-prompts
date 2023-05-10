import Prompt from "@models/prompt";
import { connectDb } from "@utils/connectDb";

export const GET = async () => {
  try {
    await connectDb();

    const prompt = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompts", { status: 500 });
  }
};
