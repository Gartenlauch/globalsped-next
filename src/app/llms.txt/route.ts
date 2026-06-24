import { llmsTxtDe } from "@/content/llms/de";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxtDe, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}