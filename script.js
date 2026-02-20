async function generatePDF() {
    const { jsPDF } = window.jspdf;
    
    // 1. Buat dokumen PDF (Landscape)
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [842, 595] // Ukuran A4 standar
    });

    const nama = document.getElementById('nameInput').value;
    if (!nama) {
        alert("Nama tidak boleh kosong!");
        return;
    }

    // 2. Load Gambar Template
    const img = new Image();
    img.src = 'certificate-template.png'; // GANTI dengan nama file gambar Anda

    img.onload = function() {
        // Tempel gambar ke PDF
        doc.addImage(img, 'PNG', 0, 0, 842, 595);

        // Atur posisi dan gaya teks nama
        doc.setFontSize(40);
        doc.setTextColor(0, 0, 0); // Warna hitam (RGB)
        doc.setFont("helvetica", "bold");

        // Hitung agar nama berada di tengah (Center)
        const textWidth = doc.getTextWidth(nama);
        const xPos = (842 - textWidth) / 2;
        const yPos = 300; // SESUAIKAN tinggi ini dengan posisi garis nama di gambar Anda

        doc.text(nama, xPos, yPos);

        // 3. Simpan/Download
        doc.save(`Sertifikat_${nama}.pdf`);
    };
}