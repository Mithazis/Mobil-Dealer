import mongoose from 'mongoose';


const MobilSchema = new mongoose.Schema(
  {
    nama: String,
    merk: String,   
    tipe: String,   
    tahun: Number,
    harga: Number,
    deskripsi: String,
    gambar: [String],
    whatsapp: String, 
  },
  { timestamps: true }
);

export default mongoose.models.Mobil || mongoose.model('Mobil', MobilSchema);
