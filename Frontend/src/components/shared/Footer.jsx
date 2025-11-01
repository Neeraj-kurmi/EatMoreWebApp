import React from 'react'

function Footer() {
      return (
        <footer className=" w-full py-1 bg-linear-to-l from-orange-500 to-red-500 text-gray-300 bottom-0 ">
          <div className=''>
            <div className="flex items-center justify-between px-10 ">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="mt-2">
                <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
                <li><a href="/services" className="hover:text-blue-400 ">Services</a></li>
                <li><a href="/contact" className="hover:text-blue-400 ">Contact</a></li>
                <li><a href="/privacy" className="hover:text-blue-400 ">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="mb-4 md:mb-0 ">
              <h4 className="text-lg font-semibold">Follow Us</h4>
              <ul className="mt-2">
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Facebook</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">Instagram</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4 border-t border-gray-700 pt-1">
            <p>&copy; {new Date().getFullYear()} myFood. All rights reserved.</p>
          </div>
          </div>
        </footer>
      );
    };    

export default Footer