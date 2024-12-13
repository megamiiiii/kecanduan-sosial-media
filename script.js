function durasiHarianRendah(x) {
    return Math.max(0, Math.min(1, (6 - x) / 6));
}

function durasiHarianTinggi(x) {
    return Math.max(0, Math.min(1, (x - 4) / 6));
}

function jumlahPlatformSedikit(x) {
    return Math.max(0, Math.min(1, (3 - x) / 3));
}

function jumlahPlatformBanyak(x) {
    return Math.max(0, Math.min(1, (x - 2) / 3));
}

function interaksiSosialRendah(x) {
    return Math.max(0, Math.min(1, (6 - x) / 6));
}

function interaksiSosialTinggi(x) {
    return Math.max(0, Math.min(1, (x - 4) / 6));
}

function kualitasTidurBaik(x) {
    return Math.max(0, Math.min(1, (6 - x) / 6));
}

function kualitasTidurBuruk(x) {
    return Math.max(0, Math.min(1, (x - 4) / 6));
}

function emosiNegatifRendah(x) {
    return Math.max(0, Math.min(1, (6 - x) / 6));
}

function emosiNegatifTinggi(x) {
    return Math.max(0, Math.min(1, (x - 4) / 6));
}

function defuzzifikasi(rules) {
    let numerator = 0;
    let denominator = 0;

    rules.forEach(([w, z]) => {
        numerator += w * z;
        denominator += w;
    });

    return denominator !== 0 ? numerator / denominator : 0;
}

function fuzzyRules(durasi, platform, interaksi, tidur, emosi) {
    const rules = [];

    rules.push([Math.min(durasiHarianTinggi(durasi), jumlahPlatformBanyak(platform)), 8]);
    rules.push([Math.min(durasiHarianRendah(durasi), kualitasTidurBaik(tidur)), 2]);
    rules.push([Math.min(emosiNegatifTinggi(emosi), interaksiSosialRendah(interaksi)), 8]);
    rules.push([Math.min(kualitasTidurBuruk(tidur), jumlahPlatformSedikit(platform)), 8]);
    rules.push([Math.min(durasiHarianRendah(durasi), emosiNegatifRendah(emosi)), 2]);

    return rules;
}

function hitung() {
    const durasi = parseFloat(document.getElementById('durasi').value);
    const platform = parseFloat(document.getElementById('platform').value);
    const interaksi = parseFloat(document.getElementById('interaksi').value);
    const tidur = parseFloat(document.getElementById('tidur').value);
    const emosi = parseFloat(document.getElementById('emosi').value);

    if (isNaN(durasi) || isNaN(platform) || isNaN(interaksi) || isNaN(tidur) || isNaN(emosi)) {
        alert('Masukkan nilai yang valid!');
        return;
    }

    const rules = fuzzyRules(durasi, platform, interaksi, tidur, emosi);
    const tingkatKecanduan = defuzzifikasi(rules);

    document.getElementById('result').innerHTML = `
        <h2>Hasil Prediksi</h2>
        <p>Tingkat Kecanduan (Fuzzy): ${tingkatKecanduan.toFixed(2)}</p>
    `;
}
