function getDashboardData(){
    return JSON.parse(localStorage.getItem("dashboardData")) || {
        kpis:[
            {title:"ผู้โดยสารรวม", value:"100000"},
            {title:"รายได้รวม", value:"5000000"},
            {title:"เที่ยวรถรวม", value:"4500"},
            {title:"Growth", value:"+5%"}
        ],
        stations:[
            {name:"กรุงเทพอภิวัฒน์", passenger:"20000", growth:"+4%"},
            {name:"ดอนเมือง", passenger:"15000", growth:"+3%"}
        ]
    };
}

function saveDashboardData(data){
    localStorage.setItem("dashboardData", JSON.stringify(data));
}

function backupData(){
    let data = getDashboardData();
    let blob = new Blob([JSON.stringify(data)], {type:"application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "backup.json";
    a.click();
}
