import LogoutButton from "./LogoutButton";

export default function BuyerNavbar() {
  return (
    <div className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-700">Welcome to Healios</h1>
      <LogoutButton />
    </div>
  );
}
