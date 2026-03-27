import { auth } from "@/auth";
import EditRoleMobile from "@/Components/EditRoleMobile";
import Nav from "@/Components/Nav";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { redirect } from "next/navigation";


export default async function Home() {
  await connectDb();
  //as this is render on server side we dont make it client side
  //so we use auth which is used in server side
  const session = await auth();
  console.log("session is :", session);
  const user = await User.findById(session?.user?.id);

  if (!user) {
    redirect("/login");
  }
  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role == "user")
  if (inComplete) {
    return <EditRoleMobile />
  }

  return (
    <>
      <Nav user={user} />
    </>
  );
}

//6:00