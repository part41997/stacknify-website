import { NextResponse } from "next/server";

import { submitContactRequest } from "@/lib/contact/submit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const result = await submitContactRequest(request);

  return NextResponse.json(result.body, {
    status: result.status,
    headers: result.headers,
  });
}
