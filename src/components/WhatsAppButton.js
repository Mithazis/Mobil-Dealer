// src/components/WhatsAppButton.jsx
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ mode }) => {
  // --- GANTI NOMOR INI DENGAN NOMOR ANDA ---
  const phoneNumber = '6281234567890'; 
  const message = encodeURIComponent('Halo, saya tertarik dengan mobil yang ada di website Anda. Bisa minta info lebih lanjut?');
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  if (mode === 'floating') {
    return (
      <a 
        href={waLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center animate-bounce"
        aria-label="Hubungi kami via WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
    );
  }

  // mode 'homepage'
  return (
    <a 
      href={waLink} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="inline-flex items-center gap-3 bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition"
    >
      <FaWhatsapp size={24} />
      <span>Hubungi via WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;