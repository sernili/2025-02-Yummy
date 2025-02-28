export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <h1>My Page</h1>;
}
