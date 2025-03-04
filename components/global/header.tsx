import Logo from "@components/global/logo";
import Navbar from "@components/global/navbar";

export default function Header() {
  return (
    <>
      <div className="flex items-center justify-between py-4">
        <Logo />
        <Navbar />
      </div>
    </>
  );
}
