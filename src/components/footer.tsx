export default function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <div className="bg-primary w-full space-y-4 p-20 text-center text-white">
      <p>Yummy!</p>
      <p>&copy; {currYear}</p>
    </div>
  );
}
