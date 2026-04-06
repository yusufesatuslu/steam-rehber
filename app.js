async function verileriGetir() {
    const container = document.getElementById('opportunity-grid');
    
    try {
        // Botun oluşturduğu data.json dosyasını çekiyoruz
        const response = await fetch('data.json');
        
        if (!response.ok) {
            throw new Error("Veri dosyası henüz oluşturulmamış.");
        }

        const veriler = await response.json();
        
        // Eğer veri boşsa kullanıcıya bilgi ver
        if (veriler.length === 0) {
            container.innerHTML = '<p style="text-align:center;">Şu an aktif fırsat bulunamadı, birazdan tekrar kontrol edin!</p>';
            return;
        }

        container.innerHTML = ''; // Yükleniyor yazısını veya eski içeriği temizle

        // Her bir veriyi kart olarak ekrana bas
        veriler.forEach(item => {
            container.innerHTML += `
                <div class="card">
                    <span class="badge">AKTİF</span>
                    <h3>${item.title}</h3>
                    <p style="color: #66c0f4; font-weight: bold;">${item.price}</p>
                    <a href="${item.link}" target="_blank" class="btn">Kodu Al / İncele</a>
                </div>
            `;
        });

    } catch (error) {
        console.error("Hata:", error);
        container.innerHTML = `<p style="text-align:center; color:red;">Veriler yüklenirken bir hata oluştu: ${error.message}</p>`;
    }
}

// Sayfa yüklendiğinde fonksiyonu çalıştır
document.addEventListener('DOMContentLoaded', verileriGetir);
