import connectDb from "@/lib/db";
import User from "@/models/user.model";
import Image from "next/image";

export default async function Home() {
  await connectDb();
  const user = await User.find()
  return (
    <div>hello</div>
  );
}

//5:30