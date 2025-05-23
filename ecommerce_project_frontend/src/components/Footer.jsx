const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h5 className="text-lg font-semibold mb-3">About SBS Optics</h5>
            <p className="text-gray-100">
              SBS Optics is a leading provider of high-quality optical lenses and eyewear solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a href="/#aboutus" className="cursor-pointer hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/#faq" className="cursor-pointer hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/#contactus" className="cursor-pointer hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h5 className="text-lg font-semibold mb-3">Contact Information</h5>
            <p className="text-gray-100">Email: optics.sbs@gmail.com</p>
            <p className="text-gray-100">Phone: +123 456 7890</p>
            <p className="text-gray-100">Address: 456 Optics Street, Kathmandu, Nepal</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-100 my-6" />

        {/* Copyright */}
        <div className="text-center text-gray-100 text-sm">
          <p className="mb-0">&copy; {new Date().getFullYear()} SBS Optics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
