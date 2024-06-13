import React from "react";
import Image from "next/image";
import whatsappImage from "../../../../../public/whatsapp.png"; //
const WhatsAppButton = () => {
  const phoneNumber = "+8801775770439";
  const message = "Hello, I have a question!";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
    >
      <Image
        src={whatsappImage} // Path to your WhatsApp icon
        alt="WhatsApp"
        width={40}
        height={40}
        className="rounded-full"
      />
    </a>
  );
};

export default WhatsAppButton;
