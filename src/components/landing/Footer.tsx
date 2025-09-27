
import Link from "next/link";
import { Twitter, Linkedin, Facebook, Mail, Phone, Globe } from "lucide-react";
import ContactForm from "../forms/ContactForm";

const socialLinks = [
  { icon: Twitter, href: "#", name: "Twitter" },
  { icon: Linkedin, href: "#", name: "LinkedIn" },
  { icon: Facebook, href: "#", name: "Facebook" },
];

const Logo = () => (
    <svg
      width="135"
      height="36"
      viewBox="0 0 135 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.2355 35.5L11.8355 6.39999L0.435547 35.5H7.23555L10.3355 27.4H14.9355L18.0355 35.5H23.2355ZM12.6355 10.8L15.3355 24.3H9.93555L12.6355 10.8Z"
        fill="#F94D1D"
      />
      <path d="M28.0355 35.5V6.39999H34.8355V35.5H28.0355Z" fill="#F94D1D" />
      <path
        d="M48.0355 35.5V6.39999H54.8355V21.3L61.6355 6.39999H67.2355L58.2355 23.2L67.7355 35.5H61.6355L54.8355 24.9V35.5H48.0355Z"
        fill="#F94D1D"
      />
      <path
        d="M71.2355 35.5V6.39999H86.8355V10.5H78.0355V18.3H85.7355V22.5H78.0355V31.3H87.2355V35.5H71.2355Z"
        fill="#F94D1D"
      />
      <path
        d="M107.536 6.40002V35.5H100.736V10.8L93.9355 35.5H90.4355L83.6355 10.8V35.5H76.8355V6.40002H84.6355L89.1355 24.1L93.6355 6.40002H101.436L107.536 6.40002Z"
        fill="#F94D1D"
      />
      <path
        d="M110.136 35.5V6.39999H116.936V35.5H110.136Z"
        fill="#2622E7"
      />
      <path
        d="M121.336 35.5V6.39999H128.136V35.5H121.336Z"
        fill="#2622E7"
      />
    </svg>
  );

export default function Footer() {
  return (
    <footer id="contact" className="py-20 bg-card border-t">
      <div className="container max-w-7xl grid lg:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Logo />
          </Link>
          <p className="text-muted-foreground">
            Your city, simplified. Fast, trusted hyperlocal services at your
            fingertips.
          </p>
          <div className="flex flex-col gap-2 mt-2 text-muted-foreground">
             <a href="mailto:ceo@macs11.com" className="flex items-center gap-2 hover:text-primary">
                <Mail className="w-5 h-5" />
                <span>ceo@macs11.com</span>
             </a>
             <a href="tel:8919702207" className="flex items-center gap-2 hover:text-primary">
                <Phone className="w-5 h-5" />
                <span>8919702207</span>
             </a>
             <a href="https://macs11.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                <Globe className="w-5 h-5" />
                <span>macs11.com</span>
             </a>
          </div>
          <div className="flex gap-4 mt-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={`macs11 on ${link.name}`}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-headline font-semibold mb-4">
            Get In Touch
          </h3>
          <p className="text-muted-foreground mb-6">
            Have a question or want to work with us? Drop us a line.
          </p>
          <ContactForm />
        </div>
      </div>
      <div className="container max-w-7xl mt-12 pt-8 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} macs11. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-foreground">
              About Us
            </Link>
            <Link href="#careers" className="hover:text-foreground">
              Careers
            </Link>
            <Link href="#" className="hover:text-foreground">
              FAQ
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
