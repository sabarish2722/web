import Link from "next/link";

const WhatsAppIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="32px"
        height="32px"
        fill="white"
    >
        <path d="M38.61,34.341c-1.745-0.873-10.313-5.088-11.914-5.656c-1.6-0.568-2.764-0.873-3.928,0.873	c-1.164,1.745-4.512,5.54-5.54,6.671c-1.029,1.131-2.058,1.27-3.803,0.428c-1.745-0.842-7.333-2.7-13.963-8.619	c-5.158-4.583-8.648-10.23-9.943-11.975c-1.295-1.745-0.139-2.688,0.732-3.53c0.759-0.731,1.745-1.9,2.622-2.868	c0.873-0.969,1.164-1.624,1.745-2.736c0.58-1.112,0.29-2.058-0.148-2.926C9.904,9.68,8.21,5.168,7.64,4.241	c-0.568-0.927-1.223-0.796-1.662-0.796h-1.5c-0.439,0-1.164,0.139-1.745,0.873c-0.58,0.731-2.223,2.164-2.223,5.252	c0,3.088,2.281,6.094,2.622,6.533c0.34,0.439,4.608,7.454,11.23,10.428c5.626,2.5,6.565,2.001,7.749,1.862	c1.184-0.14,7.459-3.03,8.5-5.959c1.041-2.926,1.041-5.424,0.732-5.959C40.091,35.214,39.464,35.083,38.61,34.341z"/>
    </svg>
);


export default function WhatsAppButton({ phoneNumber }: { phoneNumber: string }) {
  const whatsappUrl = `https://wa.me/91${phoneNumber}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon />
    </Link>
  );
}
