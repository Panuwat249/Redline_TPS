/* Global utilities */
const monthNames = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
const STORAGE_KEY = 'redlineData';


function loadData(){ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
function saveData(d){ localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }


/* Populate months dropdowns */
['month','mMonth','searchMonth'].forEach(id=>{
const el = document.getElementById(id);
if(!el) return;
el.innerHTML = '<option value="">-- เลือกเดือน --</option>' + monthNames.map(m=>`<option value="${m}">${m}</option>`).join('');
});


/* Populate years for search and dashboard selectors */
(function fillYears(){
const years = Array.from({length:21},(_,i)=>2015+i);
const sy = document.getElementById('searchYear');
const dy = document.getElementById('dashboardYear');
if(sy) sy.innerHTML = '<option value="">ทุกปี</option>' + years.map(y=>`<option>${y}</option>`).join('');
if(dy) dy.innerHTML = '<option value="">(ทั้งหมด)</option>' + years.map(y=>`<option>${y}</option>`).join('');
})();


/* Add form */
const dataForm = document.getElementById('dataForm');
if(dataForm){
dataForm.addEventListener('submit', e =>{
e.preventDefault();
const d = loadData();
const entry = {
year: document.getElementById('year').value,
month: document.getElementById('month').value,
line: document.getElementById('line').value,
type: document.getElementById('type').value,
details: document.getElementById('details').value
};
d.push(entry);
saveData(d);
alert('บันทึกเรียบร้อย');
location.href = 'index.html';
});
}


/* Render table on index */
function renderTable(data){
const tbody = document.querySelector('#dataTable tbody');
if(!tbody) return;
tbody.innerHTML = '';
data.sort((a,b)=> (a.year - b.year) || (monthNames.indexOf(a.month) - monthNames.indexOf(b.month)));
data.forEach((it,i)=>{
const tr = document.createElement('tr');
tr.innerHTML = `
<td>${it.year}</td>
<td>${it.month}</td>
<td>${it.line}</td>
<td>${it.type}</td>
<td>${it.details}</td>
<td><button class="edit-btn" data-i="${i}">แก้ไข</button></td>
<td><button class="del-btn" data-i="${i}">ลบ</button></td>
`;
tbody.appendChild(tr);
});
attachRowEvents();
}


function attachRowEvents(){
document.querySelectorAll('.del-btn').forEach(b=> b.onclick = ()=>{ if(confirm('ลบรายการ?')){ const i = +b.dataset.i; deleteItem(i);} });
document.querySelectorAll('.edit-btn').forEach(b=> b.onclick = ()=>{ const i = +b.dataset.i; openModal(i);} );
}


function deleteItem(i){ const d = loadData(); d.splice(i,1); saveData(d); renderTable(d); }


/* Modal editing */
let editingIndex = null;
function openModal(i){
const d = loadData()[i];
editingIndex = i;
documen
