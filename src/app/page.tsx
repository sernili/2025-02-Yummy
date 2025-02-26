import { redirect } from "next/navigation";

export default function Page() {
  redirect("/recipelist");

  return <p>Homepage</p>;
}
