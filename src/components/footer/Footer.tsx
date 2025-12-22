import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
// import companyLogo from "../assets/images/logo.jpg";
 
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
 
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
 
          {/* Company Info */}
          <div>
            {/* <img
              src={companyLogo}
              alt="Company Logo"
              className="h-10 mb-4"
            /> */}
            <p className="text-sm leading-relaxed">
              We build reliable digital solutions and scalable software
              products that help businesses grow in the modern world.
            </p>
          </div>
 
          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Services</li>
              <li className="hover:text-white cursor-pointer">Products</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
            </ul>
          </div>
 
          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Documentation</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
            </ul>
          </div>
           <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Documentation</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
            </ul>
          </div>
 
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm mb-2">hello@yourcompany.com</p>
            <p className="text-sm mb-4">+91 9XXXXXXXXX</p>
 
            <div className="flex gap-2">
              <Button icon="pi pi-linkedin" text rounded />
              <Button icon="pi pi-twitter" text rounded />
              <Button icon="pi pi-github" text rounded />
            </div>
          </div>
 
        </div>
 
        <Divider className="border-slate-700 my-8" />
 
        {/* Bottom */}
        <div className="text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </div>
 
      </div>
    </footer>
  );
}