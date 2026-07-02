let data = getDashboardData();

function init(){
    loadMonths();
    loadYears();
    renderKPI();
    renderStations();
}

function loadMonths(){
    const months = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
    let select = document.getElementById("month");
    months.forEach(m=>{
        let op = document.createElement("option");
        op.textContent = m;
        select.appendChild(op);
    });
}

function loadYears(){
    let year = document.getElementById("year");
    for(let y=2568;y<=2600;y++){
        let op = document.createElement("option");
        op.textContent = y;
        year.appendChild(op);
    }
}

function renderKPI(){
    let grid = document.getElementById("kpiGrid");
    grid.innerHTML = "";
    data.kpis.forEach(k=>{
        grid.innerHTML += `
        <div class="card">
            <h3>${k.title}</h3>
            <p>${k.value}</p>
        </div>`;
    });
}

function renderStations(){
    let table = document.getElementById("stationTable");
    table.innerHTML = `
    <tr>
        <th>สถานี</th>
        <th>ผู้โดยสาร</th>
        <th>เติบโต</th>
    </tr>`;
    
    data.stations.forEach(s=>{
        table.innerHTML += `
        <tr>
            <td>${s.name}</td>
            <td>${s.passenger}</td>
            <td>${s.growth}</td>
        </tr>`;
    });
}

document.getElementById("graphUpload").addEventListener("change", function(e){
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(ev){
        document.getElementById("graphPreview").src = ev.target.result;
        localStorage.setItem("graphImage", ev.target.result);
    }

    reader.readAsDataURL(file);
});

window.onload = init;

function goAdmin(){
    window.location.href = "admin.html";
}
