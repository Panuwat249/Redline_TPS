function login(){
let password = document.getElementById("password").value;

if(password === "123456"){
sessionStorage.setItem("adminAuth","true");
window.location.href = "admin.html";
}else{
alert("รหัสผ่านไม่ถูกต้อง");
}
}
