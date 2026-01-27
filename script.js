const xValues = [
  "", "2", "", "4", "", "6", "", "8", "", "10",
  "", "12", "", "14", "", "16", "", "18", "", "20",
  "", "22", "", "24", "", "26", "", "28", "", "30", ""
];
let yValues = JSON.parse(localStorage.getItem("yValues")) || Array(31).fill(0);

const barColors = Array.from({ length: 31 }, (_, i) =>
  i % 2 === 0 ? "gray" : "black"
);

const ctx = document.getElementById("myChart");

const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      data: yValues,
      backgroundColor: barColors,
      borderRadius: 10
    }]
  },
  options: {
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } }
    },
    plugins: {
      legend: { display: false },
      title: { display: false }
    }
  }
});



const now = new Date();

const day = now.getDate();        
const monthIndex = now.getMonth();
const year = now.getFullYear();

const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const monthName = monthNames[monthIndex];

console.log(day, monthName, year);


let total = Number(localStorage.getItem("data1")) || 0;
let weektot =Number(localStorage.getItem("data2")) || 0;
let week;

switch (true) {
  case day >= 1 && day <= 7:
    week = 1;
    document.getElementById("wdates").textContent = ("1st") + " " +(monthName) + " to " + ("7th") + " " + (monthName);
    break;
  case day >= 8 && day <= 14:
    week = 2;
    document.getElementById("wdates").textContent = ("8th") + " " +(monthName) + " to " + ("14th") + " " + (monthName);
    break;
  case day >= 15 && day <= 21:
    week = 3;
    document.getElementById("wdates").textContent = ("15th") + " " +(monthName) + " to " + ("21st") + " " + (monthName);
    break;
  case day >= 22 && day <= 28:
    week = 4;
    document.getElementById("wdates").textContent = ("22nd") + " " +(monthName) + " to " + ("28th") + " " + (monthName);
    break;
  case day >= 29 && day <= 31:
    week = 5;
    document.getElementById("wdates").textContent = ("29th") + " " +(monthName) + " to " + ("31st") + " " + (monthName);
    break;
  default:
    week = 0;
}

const lastWeek = Number(localStorage.getItem("lastWeek"));

if (week !== lastWeek) {
  weektot = 0;
  localStorage.setItem("lastWeek", week);
  localStorage.setItem("data2", weektot);
}


document.getElementById("tdata").textContent = "₹"+ total;
document.getElementById("wdata").textContent = "₹" + weektot;


const amount = document.getElementById("addamount");
const note =  document.getElementById("addnote");
const licontan = document.getElementById("licontan");


function addexpense(){

  if (note.value.trim() === ""||amount.value.trim() === "") {
        alert("Please write something");
        return;
    }
    console.log(amount.value);
    console.log(note.value);
    console.log("week" + week);
    const amt = Number(amount.value);

    total +=  amt;
    weektot += amt;


    yValues[day-1] += amt;
    myChart.data.datasets[0].data = yValues;
    myChart.update();

    let li = document.createElement("li");
    li.textContent = note.value;

    let span = document.createElement("span");
    span.textContent = amount.value;

    
    li.appendChild(span);
    licontan.prepend(li);

    trimList(10);

    document.getElementById("tdata").textContent = "₹"+ total;
    document.getElementById("wdata").textContent = "₹" + weektot;

    save();
    showsaved();
    
    amount.value = "";
    note.value = "";
}


function trimList(limit = 10) {
  while (licontan.children.length > limit) {
    licontan.lastElementChild.remove();
  }
}



amount.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    note.focus();
  }
});

note.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addexpense();
    }
});

function save() {
    localStorage.setItem("data1",String(total));
    localStorage.setItem("data2",String(weektot));
    localStorage.setItem("yValues", JSON.stringify(yValues));
    localStorage.setItem("data3", licontan.innerHTML);
}


function showsaved() {
    licontan.innerHTML = localStorage.getItem("data3") || "";
    
}

document.addEventListener("DOMContentLoaded", showsaved);
