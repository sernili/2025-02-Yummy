import banner from "../../../public/banner.png";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="m-4 max-h-96 rounded-4xl overflow-hidden relative">
      <Image
        src={banner}
        alt="banner"
        className="object-cover max-h-96 w-full object-center rounded-4xl overflow-hidden"
      />
      <h1 className="text-9xl font-serif text-white absolute bottom-6 left-6">
        Rezepte
      </h1>
    </div>
  );
}
