
"use client";

import Link from "next/link";

export const WhatsAppIcon = () => (
    <svg
        role="img"
        aria-label="WhatsApp logo"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current w-6 h-6"
    >
        <path d="M11.999 2C6.486 2 2 6.486 2 12c0 1.847.493 3.55.1354 5.084L2.003 22l5.07-2.028c1.463.788 3.12.122 4.926.1225.514 0 11.001-4.486 11.001-10C22.001 6.486 17.514 2 12 2zM9.133 8.334c.21.419.418.835.418 1.047s-.209.418-.418.627c-.209.209-.418.418-.627.418-.209 0-.418-.209-.627-.209-.209 0-.418-.209-.627-.418h-.209c-.209 0-1.047.418-1.884 1.047-1.047.835-1.674 1.674-1.884 1.884-.209.209-.418.418-.209.835s.418.627.627.835c.209.209.418.418.627.418.209 0 .418-.209.627-.209l.418-.209c.209-.209.418-.209.627-.209s.418.0.627.209c.209.209 2.093 1.884 2.512 2.093.418.209.835.209 1.047.209h.418c.209 0 1.256-.418 1.674-1.256.418-.835.418-1.674.418-1.884s-.209-.418-.418-.627c-.209-.209-1.047-.627-1.256-.835-.209-.209-.209-.418 0-.627s.418-.418.627-.627c.209-.209.418-.418.627-.418.209 0 .418-.209.627-.418l.209-.209.209-.209c.209-.209.418-.418.418-.627s-.209-.418-.209-.627c0-.209-.209-.418-.209-.627s-.209-.209-.418-.209h-.418c-.418 0-.835.209-1.047.418z" />
    </svg>
);

export default function WhatsAppButton({ phoneNumber }: { phoneNumber: string }) {
  const whatsappUrl = `https://wa.me/91${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:bg-[#128C7E] group-hover:rounded-br-none"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </Link>
      <div className="absolute bottom-0 right-14 w-32 p-2 text-center text-sm font-semibold text-foreground bg-background rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Contact Here
      </div>
    </div>
  );
}
