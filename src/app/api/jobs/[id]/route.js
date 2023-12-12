import connectDB from "@/lib/connectDB";
import Job from "@/models/Job";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";

export async function PUT(request, { params }) {
  const { id } = params;
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
  await Job.findByIdAndUpdate(id, {
    companyName,
    position,
    skills,
    description,
    contractType,
    skillLevel,
    salary,
  });
  return NextResponse.json(
    { message: "Job Updated" },
    { status: StatusCodes.OK }
  );
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectDB();
  const job = await Job.findOne({ _id: id });
  return NextResponse.json({ job }, { status: StatusCodes.OK });
}
