function exportPDF(){
    window.print();
}

function exportExcel(){
    let data = getDashboardData();

    let csv = "Type,Value\n";

    data.kpis.forEach(k=>{
        csv += `${k.title},${k.value}\n`;
    });

    let blob = new Blob([csv], {type:"text/csv"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "report.csv";
    a.click();
}
