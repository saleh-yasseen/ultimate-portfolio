import { NextResponse } from "next/server";
import { getResumeData } from "@/lib/mongodb";

export async function GET() {
  try {
    const data = await getResumeData();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control":
          "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching resume data:", error);
    return NextResponse.json(
      { error: "Failed to fetch resume data" },
      { status: 500 },
    );
  }
}

