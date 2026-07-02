fetch("data.json")
.then(res => res.json())
.then(data => {

for(let key in data){
let el = document.getElementById(key);

if(el){
if(typeof data[key] === "number"){
if(key.includes("distance") || key.includes("trip")){
el.innerText = data[key].toLocaleString();
}else if(
key.includes("ontime") ||
key.includes("reliable") ||
key.includes("ready")
){
el.innerText = data[key] + "%";
}else{
el.innerText = data[key];
}
}else{
el.innerText = data[key];
}
}
}

});
