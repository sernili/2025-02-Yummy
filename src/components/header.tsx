import Logo from "./logo";
import Navbar from "./navbar";

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
