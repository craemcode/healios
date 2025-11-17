export default function Home(){
    return(
         <div className="bg-white min-h-screen text-gray-900">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center shadow-md bg-white fixed top-0 left-0">
        <h1 className="text-2xl font-bold text-orange-600">Healios</h1>

        <div className="flex gap-6">
          <a href="/about" className="hover:text-orange-600 transition">About Us</a>
          <a
            href="/login"
            className="px-4 py-2 border border-orange-600 rounded hover:bg-orange-600 hover:text-white transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            Register
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center text-center pt-36 px-6">
        <h2 className="text-4xl font-bold mb-4 text-orange-600">
          Buy & Sell Medical Equipment with Confidence
        </h2>

        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          Healios is a trusted marketplace for hospitals, clinics, and individuals
          to buy and sell medical equipment safely and easily.
        </p>

        <div className="flex gap-6">
          <a
            href="/login"
            className="px-6 py-3 border border-orange-600 rounded text-orange-600 font-medium hover:bg-orange-600 hover:text-white transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-3 bg-orange-600 text-white rounded font-medium hover:bg-orange-700 transition"
          >
            Register
          </a>
        </div>
      </section>
    </div>
    );
}