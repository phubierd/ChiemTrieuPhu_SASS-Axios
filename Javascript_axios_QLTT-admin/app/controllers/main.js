var regUserSer = new RegUserService();

function getELE(id){
    return document.getElementById(id);
}



getELE("btnThemNguoiDung").addEventListener("click",function(){
    var footerEle = document.querySelector(".modal-footer");
    footerEle.innerHTML = `
    <button onclick = "addProducts()" class = "btn btn-success">Add New User</button>
    `
});


// function getListUser(){
//     regUserSer.layDS(){
//         .them(function (result){
//             console.log(result.data);

//         })
//     }
// }




