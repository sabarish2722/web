
import Link from "next/link";
import { Twitter, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Twitter, href: "#", name: "Twitter" },
  { icon: Linkedin, href: "#", name: "LinkedIn" },
  { icon: Facebook, href: "#", name: "Facebook" },
];

const Logo = () => (
    <div className="flex items-center text-3xl font-bold font-headline">
      <span className="text-primary">Macs</span><span className="text-accent">11</span>
    </div>
  );

export default function Footer() {
  return (
    <footer id="contact" className="py-20 bg-card border-t">
      <div className="container max-w-7xl grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <Logo />
          </Link>
          <p className="text-muted-foreground">
            Your city, simplified. Fast, trusted hyperlocal services at your
            fingertips.
          </p>
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
        <div>
          <h3 className="text-2xl font-headline font-semibold mb-4">
            Contact Information
          </h3>
          <div className="flex flex-col gap-4 text-muted-foreground">
             <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                <span>8-1-364/A/1, First Floor, Opposite SBI, Shaikpet, Tolichowki, Hyderabad, Telangana, 500008.</span>
             </div>
             <a href="mailto:ceo@macs11.com" className="flex items-center gap-3 hover:text-primary">
                <Mail className="w-5 h-5 text-primary" />
                <span>ceo@macs11.com</span>
             </a>
             <a href="tel:8919702207" className="flex items-center gap-3 hover:text-primary">
                <Phone className="w-5 h-5 text-primary" />
                <span>8919702207</span>
             </a>
          </div>
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
