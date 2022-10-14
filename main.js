let b = document.querySelector("#book");
let a = document.querySelector("#author");
let d = document.querySelector("#date");
let c = document.querySelector("#conclusion");
let add = document.querySelector("#add");
let tbody = document.querySelector("tbody");
let sun = document.querySelector("#display-fon");
let icon = document.querySelector(".fa-solid");
let contains = sun.contains(icon);
let calendar = document.querySelector(".calendar");
const date = new Date();

sun.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  b.classList.toggle("dark");
  a.classList.toggle("dark");
  d.classList.toggle("dark");
  c.classList.toggle("dark");
  sun.classList.toggle("dark");
  icon.classList.toggle("fa-moon");
});
d.addEventListener("click", () => {
  calendar.classList.toggle("display");
});

// =================================================================================================================

const renderCalendar = () => {
  date.setDate(1);
  const monthDays = document.querySelector(".days");

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let fmonth = document.querySelector(".date h3");
  fmonth.innerHTML = months[date.getMonth()];
  document.querySelector(".date p").innerHTML = new Date().toDateString();
  let year = document.querySelector("h4");
  year.innerHTML = date.getFullYear();
  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="btnDate prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div class="btnDate">${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="btnDate next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
  let btnDate = Array.from(document.getElementsByClassName("btnDate"));
  btnDate.map((btnDate) => {
    btnDate.addEventListener("click", (e) => {
      d.value = e.target.innerText + " " + fmonth.innerText + " " + year.innerText;
      calendar.classList.toggle("display");
    });
  });
};
document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});
renderCalendar();
// ===========================================================================================================================

add.addEventListener("click", () => {
  let itemId = mass.length + 1;
  let delRow = document.createElement("button");
  delRow.classList.add("delete");
  let delicon = document.createElement("i");
  delicon.classList.add("fa-regular");
  delicon.classList.add("fa-trash-can");
  delRow.setAttribute("onclick", "remove(this)");
  delRow.appendChild(delicon);
  delRow.setAttribute("id", itemId);
  var tableInfo = {
    book: b.value,
    author: a.value,
    fdate: d.value,
    conclusion: c.value,
    del: delRow.outerHTML,
    id: itemId,
  };
  if (b.value) {
    mass.push(tableInfo);
    localStorage.setItem("table", JSON.stringify(mass));
  }
  a.value = "";
  b.value = "";
  d.value = "";
  c.value = "";
  location.reload();
});

let mass = localStorage.getItem("table") ? JSON.parse(localStorage.getItem("table")) : [];

for (let tableInfo of mass) {
  let tr = document.createElement("tr");
  tbody.appendChild(tr);
  for (let key in tableInfo) {
    let td = document.createElement("td");
    if (key != "id") {
      td.innerHTML = tableInfo[key];
      tr.appendChild(td);
    }
  }
}
// =================================================================
// var retrievedScores = JSON.parse(localStorage.getItem("mass"));
var remove = function (self) {
  mass = mass.filter(function (elem) {
    return elem.id != self.id;
  });
  localStorage.setItem("table", JSON.stringify(mass));
  self.parentNode.parentNode.removeChild(self.parentNode);
  location.reload();
};
