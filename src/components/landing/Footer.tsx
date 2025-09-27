
import Link from "next/link";
import { Twitter, Linkedin, Facebook, Mail, Phone, Info } from "lucide-react";
import ContactForm from "../forms/ContactForm";

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
            Have questions or suggestions? We'd love to hear from you.
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
        <div className="p-6 bg-background rounded-lg shadow-lg">
          <h3 className="text-2xl font-headline font-semibold mb-4">
            Give us a Suggestion
          </h3>
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
