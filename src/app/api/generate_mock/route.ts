import { AudioInfo } from "./../../../lib/SunoApi";
import { NextResponse, NextRequest } from "next/server";
import { DEFAULT_MODEL, sunoApi } from "@/lib/SunoApi";
import { corsHeaders } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { prompt, make_instrumental, model, wait_audio } = body;

      if (!prompt) {
        return new NextResponse(
          JSON.stringify({ error: "Prompt is required" }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      const audioInfo: AudioInfo[] = [
        {
          id: "1", // Unique identifier for the audio
          title: "Test Audio Mock 1", // Title of the audio
          image_url: "", // URL of the image associated with the audio
          lyric: "", // Lyrics of the audio
          audio_url: "", // URL of the audio file
          video_url: "", // URL of the video associated with the audio
          created_at: Date.now().toLocaleString(), // Date and time when the audio was created
          model_name: "", // Name of the model used for audio generation
          gpt_description_prompt: prompt, // Prompt for GPT description
          prompt: "", // Prompt for audio generation
          status: "submitted", // Status
          type: "",
          tags: "",
          duration: "", // Duration of the audio
          error_message: "", // Error message if any
        },
        {
          id: "2", // Unique identifier for the audio
          title: "Test Audio Mock 2", // Title of the audio
          image_url: "", // URL of the image associated with the audio
          lyric: "", // Lyrics of the audio
          audio_url: "", // URL of the audio file
          video_url: "", // URL of the video associated with the audio
          created_at: Date.now().toLocaleString(), // Date and time when the audio was created
          model_name: "", // Name of the model used for audio generation
          gpt_description_prompt: prompt, // Prompt for GPT description
          prompt: "", // Prompt for audio generation
          status: "submitted", // Status
          type: "",
          tags: "",
          duration: "", // Duration of the audio
          error_message: "", // Error message if any
        },
      ];

      return new NextResponse(JSON.stringify(audioInfo), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    } catch (error: any) {
      console.error(
        "Error generating custom audio:",
        JSON.stringify(error.response.data)
      );
      if (error.response.status === 402) {
        return new NextResponse(
          JSON.stringify({ error: error.response.data.detail }),
          {
            status: 402,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }
      return new NextResponse(
        JSON.stringify({
          error:
            "Internal server error: " +
            JSON.stringify(error.response.data.detail),
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }
  } else {
    return new NextResponse("Method Not Allowed", {
      headers: {
        Allow: "POST",
        ...corsHeaders,
      },
      status: 405,
    });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}
