let daftarPilihan = [];
let pilihanAkhir = "";
const nama = document.getElementById("nama");
const jumlah = document.getElementById("jumlah");
const inputPilihan = document.getElementById("inputPilihan");
const daftarRadio = document.getElementById("daftarRadio");
const dropdown = document.getElementById("dropdown");
const email = document.getElementById("email");

document.getElementById("okNama").addEventListener("click", function () {
    const namaUser = nama.value.trim();
    const jumlahPilihan = Number(jumlah.value);
    if (namaUser === "") {
        alert("Nama wajib diisi!");
        nama.focus();
        return;
    }
    if (
        jumlah.value === "" ||
        !Number.isInteger(jumlahPilihan) ||
        jumlahPilihan < 1 ||
        jumlahPilihan > 20
    ) {
        alert("Jumlah pilihan harus berupa bilangan bulat 1 sampai 20!");
        jumlah.focus();
        return;
    }

    inputPilihan.innerHTML = "";
    for (let i = 0; i < jumlahPilihan; i++) {
        const label = document.createElement("label");
        label.textContent = "Pilihan " + (i + 1) + ":";

        const input = document.createElement("input");
        input.type = "text";
        input.className = "pilihanInput";
        input.placeholder = "Masukkan pilihan " + (i + 1);

        inputPilihan.appendChild(label);
        inputPilihan.appendChild(input);
    }
    document.getElementById("bagianPilihan").hidden = false;
    document.getElementById("bagianRadio").hidden = true;
    document.getElementById("bagianEmail").hidden = true;
    document.getElementById("bagianHasil").hidden = true;
});
document.getElementById("okTeks").addEventListener("click", function () {
    const semuaInput = document.querySelectorAll(".pilihanInput");

    daftarPilihan = [];

    for (let i = 0; i < semuaInput.length; i++) {
        const isi = semuaInput[i].value.trim();

        if (isi === "") {
            alert("Semua pilihan wajib diisi!");
            semuaInput[i].focus();
            return;
        }

        daftarPilihan.push(isi);
    }

    daftarRadio.innerHTML = "";
    dropdown.innerHTML = '<option value="">-- Pilih --</option>';
    for (let i = 0; i < daftarPilihan.length; i++) {
        const label = document.createElement("label");
        label.className = "radio-item";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "pilihan";
        radio.value = daftarPilihan[i];

        radio.addEventListener("change", function () {
            pilihanAkhir = radio.value;
            dropdown.value = radio.value;
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(daftarPilihan[i]));
        daftarRadio.appendChild(label);

        const option = document.createElement("option");
        option.value = daftarPilihan[i];
        option.textContent = daftarPilihan[i];
        dropdown.appendChild(option);
    }
    pilihanAkhir = "";
    document.getElementById("bagianRadio").hidden = false;
    document.getElementById("bagianEmail").hidden = true;
    document.getElementById("bagianHasil").hidden = true;
});
dropdown.addEventListener("change", function () {
    pilihanAkhir = dropdown.value;
    const semuaRadio = document.querySelectorAll(
        'input[name="pilihan"]'
    );
    semuaRadio.forEach(function (radio) {
        radio.checked = radio.value === pilihanAkhir;
    });
});
document.getElementById("okPilihan").addEventListener("click", function () {
    if (pilihanAkhir === "") {
        alert("Silakan pilih salah satu pilihan!");
        return;
    }
    document.getElementById("bagianEmail").hidden = false;
});
function emailValid(teksEmail) {
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return polaEmail.test(teksEmail);
}
document.getElementById("okEmail").addEventListener("click", function () {
    const emailUser = email.value.trim();
    if (!emailValid(emailUser)) {
        alert("Format email salah! Silakan masukkan email yang benar.");
        email.value = "";
        email.focus();
        return;
    }
    const namaUser = nama.value.trim();
    const jumlahPilihan = daftarPilihan.length;
    document.getElementById("hasil").textContent =
        "Hallo, nama saya " + namaUser +
        ", email " + emailUser +
        ", saya mempunyai sejumlah " + jumlahPilihan +
        " pilihan yaitu " + daftarPilihan.join(", ") +
        " dan saya memilih " + pilihanAkhir + ".";
    document.getElementById("bagianHasil").hidden = false;
});