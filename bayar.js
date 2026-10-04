const rp = n => "Rp" + Math.round(n).toLocaleString("id-ID");
let p = null;
try { p = JSON.parse(localStorage.getItem("pesanan") || "null"); } catch (e) {}

ringkasan.textContent = p
  ? `${p.destinasi} · ${p.kelas} · ${p.hari} hari · ${p.orang} orang — Total ${rp(p.total)}`
  : "Belum ada pesanan. Hitung biaya dulu di halaman utama.";

pay.addEventListener("submit", e => {
  e.preventDefault();
  try {
    localStorage.setItem("pembayaran", JSON.stringify({ nama: nama.value, metode: metode.value }));
  } catch (err) {}
  location.href = "sukses.html";
});