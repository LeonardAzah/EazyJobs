import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

export async function POST(request) {
  const {
    companyName,
    position,
    skills,
    description,
    contractType,
    skillLevel,
    salary,
  } = await request.json();
  await connectDB();
  await Job.create({
    companyName,
    position,
    skills,
    description,
    contractType,
    skillLevel,
    salary,
  });

  return NextResponse.json(
    { message: "Job Created" },
    { status: StatusCodes.CREATED }
  );
}

export async function GET() {
  await connectDB();
  const jobs = await Job.find();
  return NextResponse.json({ jobs }, { status: StatusCodes.OK });
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await connectDB();
  await Job.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Topic Deleted" },
    { status: StatusCodes.OK }
  );
}
