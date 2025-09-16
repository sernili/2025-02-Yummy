import { redirect } from "next/navigation";

export default function Page() {
  redirect("/recipes");

  return <p>Homepage</p>;
}
