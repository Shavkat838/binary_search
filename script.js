let massiv = [];
let maqsad = null;
const massivKonteyner = document.getElementById("array");
const massivInput = document.getElementById("massivInput");
const maqsadInput = document.getElementById("maqsadInput");
const boshlashTugmasi = document.getElementById("startBtn");

function massivniChizish(chap = 0, ong = massiv.length - 1) {
  massivKonteyner.innerHTML = "";
  massiv.map((qiymat, indeks) => {
    const quti = document.createElement("div");
    quti.className = `box ${
      indeks >= chap && indeks <= ong ? "default" : "removed"
    }`;
    quti.textContent = qiymat;
    quti.id = `quti-${indeks}`;
    massivKonteyner.appendChild(quti);
  });
}


function ikkilikQidiruv(massiv, maqsad) {
  let chap = 0;
  let ong = massiv.length - 1;

  function qadam() {
    if (chap > ong) {
      alert("Element topilmadi!");
      return;
    }

    const oRta = Math.floor((chap + ong) / 2);

   
    qutiniBelgilash(oRta, "active");

    setTimeout(() => {
      if (massiv[oRta] === maqsad) {
        qutiniBelgilash(oRta, "found");
      } else {
        qutiniBelgilash(oRta, "checked");

        if (massiv[oRta] < maqsad) {
          chap = oRta + 1;
        } else {
          ong = oRta - 1;
        }

        
        massivniChizish(chap, ong);
        setTimeout(qadam, 1500); 
      }
    }, 1000);
  }

  qadam();
}


function qutiniBelgilash(indeks, classNomi) {
  const quti = document.getElementById(`quti-${indeks}`);
  if (quti) {
    quti.className = `box ${classNomi}`;
  }
}


function massivniTuzish() {
  const massivString = massivInput.value;
  maqsad = parseInt(maqsadInput.value);

  if (!massivString || isNaN(maqsad)) {
    alert("Massiv va  qiymatni to'g'ri kiriting!");
    return;
  }

  massiv = massivString
    .split(",")
    .map((qiymat) => parseInt(qiymat.trim(), 10))
    .sort((a, b) => a - b);
  massivniChizish();
  boshlashTugmasi.disabled = false;
}


function binaryQidiruvniBoshlash() {
  boshlashTugmasi.disabled = true; 
  ikkilikQidiruv(massiv, maqsad);
}
