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
    width="120"
    height="32"
    viewBox="0 0 163 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-primary"
  >
    <path
      d="M27.424 43.04L13.752 1.28H19.016L30.12 35.84L41.224 1.28H46.52L32.816 43.04H27.424Z"
      fill="#F25822"
    />
    <path
      d="M48.2499 43.04V1.28H53.5139V43.04H48.2499Z"
      fill="#F25822"
      transform="translate(5, 0)"
    />
    <path
      d="M62.3733 43.04V1.28H82.0213C87.8133 1.28 91.2693 3.68 91.2693 8.32C91.2693 11.648 89.6053 13.888 86.8213 15.2L92.7093 25.12V26.4H86.2773L81.2853 17.28H67.6133V43.04H62.3733ZM67.6133 12.32H80.5173C83.8773 12.32 85.9573 13.472 85.9573 16.032C85.9573 18.528 83.9093 19.808 80.5173 19.808H67.6133V12.32Z"
      fill="#F25822"
      transform="translate(8, 0)"
    />
    <path
      d="M93.3183 43.04V1.28H113.806C120.022 1.28 123.446 4 123.446 9.6C123.446 13.088 122.054 15.616 119.334 17.216C122.966 18.656 124.942 21.664 124.942 25.792C124.942 31.904 120.71 35.2 113.574 35.2H98.5583V43.04H93.3183ZM98.5583 30.24H112.55C116.502 30.24 118.982 28.48 118.982 25.504C118.982 22.464 116.47 20.64 112.414 20.64H98.5583V30.24ZM98.5583 15.84H111.422C115.11 15.84 117.35 14.144 117.35 11.232C117.35 8.256 115.142 6.56 111.454 6.56H98.5583V15.84Z"
      fill="#F25822"
      transform="translate(14, 0)"
    />
    <path d="M139.125 43.04V1.28H144.389V43.04H139.125Z" fill="currentColor" />
    <path
      d="M149.333 43.04V1.28H154.597V43.04H149.333Z"
      fill="currentColor"
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
