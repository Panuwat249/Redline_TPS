const selector =
document.getElementById(
"monthSelector"
);

statistics.forEach(item=>{

const op =
document.createElement(
"option"
);

op.value=item.id;

op.textContent=item.month;

selector.appendChild(op);

});

showData(statistics[0]);

selector.addEventListener(
"change",
()=>{

const item =
statistics.find(
x=>x.id===selector.value
);

showData(item);

}
);

function showData(data){

monthTitle.innerText =
data.month;

ontime.innerText =
data.onTime.total+"%";

ontimeNorth.innerText =
data.onTime.north+"%";

ontimeWest.innerText =
data.onTime.west+"%";

availability.innerText =
data.availability.total+"%";

availabilityNorth.innerText =
data.availability.north+"%";

availabilityWest.innerText =
data.availability.west+"%";

reliability.innerText =
data.reliability.total+"%";

reliabilityNorth.innerText =
data.reliability.north+"%";

reliabilityWest.innerText =
data.reliability.west+"%";

distance.innerText =
data.distance.total
.toLocaleString();

trips.innerText =
data.trips.total
.toLocaleString();

cancelled.innerText =
data.cancelled.total;
}

const chartLabels =
statistics.map(
x=>x.month
);

const chartValues =
statistics.map(
x=>x.onTime.total
);

new Chart(

document.getElementById(
"historyChart"
),

{
type:"line",

data:{

labels:chartLabels,

datasets:[
{
label:
"ความตรงต่อเวลา",

data:chartValues,

borderColor:"#d90429",

backgroundColor:
"rgba(217,4,41,.15)",

fill:true,

tension:.3
}
]

},

options:{

responsive:true,

plugins:{
legend:{
display:true
}
}

}

}

);
