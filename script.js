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
    let numerator = 0, denominator = 0;
    rules.forEach(rule => {
        numerator += rule.w * rule.z;
        denominator += rule.w;
    });
    return denominator !== 0 ? numerator / denominator : 0;
}

function fuzzyRules(durasi, platform, interaksi, tidur, emosi) {
    return [
        { w: Math.min(durasiHarianTinggi(durasi), jumlahPlatformBanyak(platform)), z: 8 },
        { w: Math.min(durasiHarianRendah(durasi), kualitasTidurBaik(tidur)), z: 2 },
        { w: Math.min(emosiNegatifTinggi(emosi), interaksiSosialRendah(interaksi)), z: 8 },
        { w: Math.min(kualitasTidurBuruk(tidur), jumlahPlatformSedikit(platform)), z: 8 },
        { w: Math.min(durasiHarianRendah(durasi), emosiNegatifRendah(emosi)), z: 2 }
    ];
}

function hitung() {
    const durasi = parseFloat(document.getElementById('durasi').value);
    const platform = parseFloat(document.getElementById('platform').value);
    const interaksi = parseFloat(document.getElementById('interaksi').value);
    const tidur = parseFloat(document.getElementById('tidur').value);
    const emosi = parseFloat(document.getElementById('emosi').value);

    if (isNaN(durasi) || isNaN(platform) || isNaN(interaksi) || isNaN(tidur) || isNaN(emosi)) {
        alert("Masukkan nilai yang valid!");
        return;
    }

    // Logika Fuzzy
    const rules = fuzzyRules(durasi, platform, interaksi, tidur, emosi);
    const tingkatKecanduanFuzzy = defuzzifikasi(rules);

    // Prediksi Dummy
    const knnPrediction = durasi > 5 ? "Tinggi" : "Rendah";
    const kmeansPrediction = platform > 2 ? "Cluster 2" : "Cluster 1";
    const nbPrediction = emosi > 5 ? "Tinggi" : "Rendah";

    // Tampilkan Hasil
    document.getElementById('result').style.display = "block";
    document.getElementById('result-text').innerHTML =
        `<strong>Prediksi KNN:</strong> ${knnPrediction}<br>` +
        `<strong>Prediksi K-Means:</strong> ${kmeansPrediction}<br>` +
        `<strong>Prediksi Naive Bayes:</strong> ${nbPrediction}`;
    document.getElementById('progress-bar').style.width = `${tingkatKecanduanFuzzy * 10}%`;
    document.getElementById('progress-bar').innerText = `${tingkatKecanduanFuzzy.toFixed(2)}`;
}

function resetForm() {
    document.getElementById('form-prediksi').reset();
    document.getElementById('result').style.display = "none";
}
