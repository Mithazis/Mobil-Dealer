import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ mode, namaMobil, linkMobil }) => {
  const phoneNumber = '6282117774545';
  let message;


  if (namaMobil && linkMobil) {
    message = `Halo, saya tertarik dengan mobil "${namaMobil}".\n\nBerikut link mobilnya: ${linkMobil}\n\nApakah unitnya masih tersedia?`;
  } else {
 
    message = 'Halo, saya ingin bertanya tentang mobil yang ada di website Anda. Bisa minta info lebih lanjut?';
  }


  const encodedMessage = encodeURIComponent(message);
  const waLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;


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