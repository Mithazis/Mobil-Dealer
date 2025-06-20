export default function WhatsAppButton({ link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl text-center transition"
    >
      Tanya via WhatsApp
    </a>
  )
}
