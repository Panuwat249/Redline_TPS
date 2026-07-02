let adminData = getDashboardData();

function loadAdmin(){
    let div = document.getElementById("adminContent");
    div.innerHTML = "";

    adminData.kpis.forEach((k,index)=>{
        div.innerHTML += `
        <div>
            <input value="${k.title}" onchange="adminData.kpis[${index}].title=this.value">
            <input value="${k.value}" onchange="adminData.kpis[${index}].value=this.value">
        </div>`;
    });

    adminData.stations.forEach((s,index)=>{
        div.innerHTML += `
        <div>
            <input value="${s.name}" onchange="adminData.stations[${index}].name=this.value">
            <input value="${s.passenger}" onchange="adminData.stations[${index}].passenger=this.value">
            <input value="${s.growth}" onchange="adminData.stations[${index}].growth=this.value">
        </div>`;
    });
}

function addKPI(){
    adminData.kpis.push({
        title:"New KPI",
        value:"0"
    });
    loadAdmin();
}

function addStation(){
    adminData.stations.push({
        name:"New Station",
        passenger:"0",
        growth:"0%"
    });
    loadAdmin();
}

function saveAll(){
    saveDashboardData(adminData);
    alert("Saved");
}
