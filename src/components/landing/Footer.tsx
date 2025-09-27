
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
    viewBox="0 0 130 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="0"
      y="28"
      fontFamily="Poppins, sans-serif"
      fontSize="30"
      fontWeight="700"
    >
      <tspan fill="#F94D1D">macs</tspan>
      <tspan fill="#2622E7">11</tspan>
    </text>
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
            <Link href="/about" className="hover:text-foreground">
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
