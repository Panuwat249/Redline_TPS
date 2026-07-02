let defaultData = {
month:"มิถุนายน 2569",
punctuality:100,
reliability:100,
readiness:100,
total_distance:170475,
total_trip:8819,
cancel_total:0
};

let data = JSON.parse(localStorage.getItem("dashboardData")) || defaultData;

document.getElementById("month").innerText = data.month;
document.getElementById("punctuality").innerText = data.punctuality + "%";
document.getElementById("reliability").innerText = data.reliability + "%";
document.getElementById("readiness").innerText = data.readiness + "%";
document.getElementById("total_distance").innerText = data.total_distance.toLocaleString();
document.getElementById("total_trip").innerText = data.total_trip.toLocaleString();
document.getElementById("cancel_total").innerText = data.cancel_total;
