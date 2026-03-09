async function yazarVerisiBul(yazarAdi) {
    // 1. İstatistiksel Veriyi Çek
    const styleRes = await fetch('style_vectors.json');
    const styleData = await styleRes.json();
    const styleVector = styleData[yazarAdi];

    // 2. Tematik Yorumu Çek
    const temaRes = await fetch('yazar_tema_yorumlari.txt');
    const temaText = await temaRes.text();
    // Yazar isminden bir sonraki çizgiye kadar olan kısmı alır
    const yazarBlok = temaText.split(yazarAdi)[1].split('----------------')[0];

    return { style: styleVector, temaYorum: yazarBlok.trim() };
}

async function diyalogUret(y1, y2, secilenTema) {
    const veri1 = await yazarVerisiBul(y1);
    const veri2 = await yazarVerisiBul(y2);

    const sistemPromptu = `
        Sen bir edebiyat profesörüsün. Sana verilen verileri kullanarak iki yazarı konuşturacaksın.
        
        Yazar 1 (${y1}):
        - Cümle Uzunluğu: ${veri1.style.avg_sentence_length} kelime
        - Sıfat Oranı: ${veri1.style.adj_ratio}
        - Tematik Bakış: ${veri1.temaYorum}

        Yazar 2 (${y2}):
        - Cümle Uzunluğu: ${veri2.style.avg_sentence_length} kelime
        - Fiil Oranı: ${veri2.style.verb_ratio}
        - Tematik Bakış: ${veri2.temaYorum}

        Kural: Yazarlar birbirine kendi üsluplarıyla "${secilenTema}" üzerine cevap versinler.
    `;

    // OpenAI API Fetch isteği buraya gelecek...
}
