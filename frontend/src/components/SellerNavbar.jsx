import LogoutButton from "./LogoutButton";

export function SellerNavbar() {
    return (
        <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Seller Dashboard</h1>
            <LogoutButton/>
        </div>
    );
}