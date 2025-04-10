export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300">
            Toko RR hadir online, menawarkan pakaian premium berkualitas tinggi dan bergaya abadi. Koleksi pilihan kami dirancang untuk mereka yang menghargai detail. Nikmati kemudahan berbelanja online untuk menemukan pakaian impian Anda, di mana pun Anda berada. Rasakan kemewahan Elegant Threads dalam genggaman Anda.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Shop</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: Shebhotak@gmail.com</li>
              <li>Phone: +62 812-8638-3535</li>
              <li>Address: Jl.Thamrin 5,RT 004/RW 004, Ketapang, Kec. Cipondoh, Kota Tangerang, Banten</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Seragam Sekolah .</p>
        </div>
      </div>
    </footer>
  );
}