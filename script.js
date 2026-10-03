const rp = n => "Rp" + Math.round(n).toLocaleString("id-ID");
const clamp = el => Math.min(+el.max, Math.max(+el.min, parseInt(el.value) || +el.min));

function hitung() {
  const opt = dest.selectedOptions[0];
  const hari = clamp(days), orang = clamp(ppl);
  const perOrang = opt.dataset.d * style.value * hari + +opt.dataset.t;
  const totalHarga = perOrang * orang;

  total.textContent = rp(totalHarga);
  detail.textContent = `Per orang: ${rp(perOrang)} · ${hari} hari · ${orang} orang`;

  try {
    localStorage.setItem("pesanan", JSON.stringify({
      destinasi: opt.textContent,
      kelas: style.selectedOptions[0].textContent,
      hari, orang, total: totalHarga
    }));
  } catch (e) {}
}

document.addEventListener("input", hitung);
[days, ppl].forEach(el => el.addEventListener("change", () => { el.value = clamp(el); hitung(); }));
hitung();

/* Klik kartu destinasi -> isi kalkulator */
document.querySelectorAll("#destinasi .card").forEach(card => {
  card.style.cursor = "pointer";
  card.addEventListener("click", () => {
    const nama = card.querySelector(".card-title").textContent.trim();
    const idx = [...dest.options].findIndex(o => o.textContent === nama);
    if (idx < 0) return;
    dest.selectedIndex = idx;
    hitung();
    document.getElementById("biaya").scrollIntoView({ behavior: "smooth" });
  });
});

/* Pencarian destinasi */
cari.addEventListener("input", () => {
  const q = cari.value.toLowerCase();
  document.querySelectorAll("#destinasi .col").forEach(col => {
    col.classList.toggle("d-none", !col.textContent.toLowerCase().includes(q));
  });
});