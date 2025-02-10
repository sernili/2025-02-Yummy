import Banner from "../components/banner/banner";
import Header from "../components/header/header";

export default function Page() {
  return (
    <div className="bg-secondary min-h-screen overflow-hidden">
      <Header />
      <Banner />
    </div>
  );
}
