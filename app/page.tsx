import { redirect } from "next/navigation";

export default function RootPage() {
  // When someone visits "/", send them to the Signin screen
  redirect("/Account/Signin");
}