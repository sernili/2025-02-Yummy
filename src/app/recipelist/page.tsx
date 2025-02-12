import TagList from "../../components/tags/tags"; // TODO: find way to generalize import

export default function Page() {
  return (
    <div className="bg-secondary min-h-screen space-y-4 overflow-hidden py-6">
      <TagList />
    </div>
  );
}
