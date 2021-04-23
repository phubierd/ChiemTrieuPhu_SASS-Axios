var regUserSer = new RegUserService();
// var listUser = new ListUser();
var validation = new Validation();



function getELE(id) {
    return document.getElementById(id);
}


//add button 
getELE("btnThemNguoiDung").addEventListener("click", function () {
    var footerEle = document.querySelector(".modal-footer");
    footerEle.innerHTML = `
    <button onclick = "addUser()" class = "btn btn-success">Add New User</button>
    `
});


// ==============hiển thị lên web=========
function renderTable(arrUser) {
    var content = "";
    var count = 1;
    arrUser.map(function (user, index) {
        content += `
            <tr>
            <td>${count}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td> <button class="btn btn-danger" onclick="delUser('${count}')">XÓA</button>
            <button class="btn btn-info" onclick="infoUser('${count}')">Xem</button></td>
            </tr>
            
            `;
        count++;
    })
    getELE("tblDanhSachNguoiDung").innerHTML = content;
};

// =========LOCAL STORAGE===========
function setLocalStorage(arrUser) {
    localStorage.setItem("DSUser", JSON.stringify(arrUser));
}
function getLocalStorage(arrUser) {
    var arrResult = JSON.parse(localStorage.getItem("DSUser"));
    return arrResult;
}



getListUser();


function getListUser() {
    regUserSer.layDS()
        .then(function (result) {
            console.log(result.data);
            renderTable(result.data);

            setLocalStorage(result.data);

//NOTE ******: đẩy all user vào mảng này để duyệt validation nhưng không thể console log kiểm tra
            return listUser = result.data;
        })
        .catch(function (error) {
            console.log(error);
        })
};
// console.log(qqq)

// =============== TÌM KIẾM=============
getELE("basic-addon2").addEventListener("click", function () {
    var arrUser = getLocalStorage();
    var arrFind = [];
    console.log(arrUser);

    var stringFind = getELE("inputTimKiem").value;

    arrFind = regUserSer.findUser(arrUser, stringFind);
    console.log(arrFind);
    renderTable(arrFind);

})

// ================Add USER===========
function addUser() {
    //buoc1 : lay info tu form

    var taiKhoan = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var pass = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var hinhAnh = getELE("HinhAnh").value;
    var loaiND = getELE("loaiNguoiDung").value;
    var ngonNgu = getELE("loaiNgonNgu").value;
    var moTa = getELE("MoTa").value;


    var isValid = true;

    //kiem tra tai khoản:
    isValid &= validation.checkEmpty(taiKhoan, "inputTaiKhoan", "Tài khoản không đươc để trống") && validation.checkTK(taiKhoan,"inputTaiKhoan","Tài khoản không được để trùng",listUser);

    //check name:
    isValid &= validation.checkEmpty(hoTen,"inputHoTen","Họ tên không được để trống") && validation.checkName(hoTen,"inputHoTen","họ tên không được để ký tự đặc biệt và số");

    //check PASS:
    isValid &= validation.checkEmpty(pass,"inputPass","pass không được để trống") && validation.checkLength(pass,"inputPass","pass phải có độ dài từ 6-8 ký tự",6,8) && validation.checkPass(pass,"inputPass","pass có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số ");

    //check Email
    isValid &= validation.checkEmpty(email,"inputEmail","Email không được để trống")&& validation.checkMail(email,"inputEmail","Email không đúng format");
    
    //check hinh anh
    isValid &= validation.checkEmpty(hinhAnh,"inputHinh","Hình không được để trống");

    //check DropDown
    isValid &= validation.checkDropDown("loaiNguoiDung","inputND","vui lòng chọn");

    //check DropDown NN
    isValid &= validation.checkDropDown("loaiNgonNgu","inputNN","vui lòng chọn loại ngôn ngữ");

    //check MOTA
    isValid &= validation.checkEmpty(moTa,"inputMoTa","không được để trống") && validation.checkLength(moTa,"inputMoTa","có độ dài không vượt quá 60 ký tự",1,60);


    if (isValid) {
        var regUser = new RegUser(taiKhoan, hoTen, pass, email, hinhAnh, loaiND, ngonNgu, moTa)
        console.log(regUser);

        //buoc 2: luu info xuong database:
        regUserSer.addUser(regUser)
            .then(function (result) {
                console.log(result);
                console.log(result.data);
                //load lai danh sach sau khi them ok (thay vi bam F5)
                getListUser();
                //goi su kien click co san cua close button
                //tat modal khi add user ok
                document.querySelector(".modal-header .close").click();

            })
            .catch(function (error) {
                console.log(error);
            })
    }


}

// ==================XOA USER===========
//gọi dòng 29
function delUser(id) {
    regUserSer.delUser(id)
        .then(function (result) {
            console.log(result.data);
            getListUser();
        })
        .catch(function (error) {
            console.log(error)
        });

}



// ================info USER=============
//gọi dòng 30
function infoUser(id) {
    regUserSer.infoUser(id)
        .then(function (result) {
            console.log(result.data);


            //mở modal
            $('#myModal').modal('show');

            //điền info lên form
            getELE("TaiKhoan").value = result.data.taiKhoan;
            getELE("HoTen").value = result.data.hoTen;
            getELE("MatKhau").value = result.data.matKhau;
            getELE("Email").value = result.data.email;
            getELE("HinhAnh").value = result.data.hinhAnh;
            getELE("loaiNguoiDung").value = result.data.loaiND;
            getELE("loaiNgonNgu").value = result.data.ngonNgu;
            getELE("MoTa").value = result.data.moTa;


            //thêm disable ID
            getELE("TaiKhoan").disabled = true;


            //add button update info;
            var footerEle = document.querySelector(".modal-footer");

            footerEle.innerHTML = `
    <button onclick = "updateUser('${id}')" class = "btn btn-success">Update User</button>
    `
        })
        .catch(function (error) {
            console.log(error)
        });
}

//gọi dòng 160
function updateUser(id) {
    //buoc1 : lay info từ form

    var taiKhoan = getELE("TaiKhoan").value;
    var hoTen = getELE("HoTen").value;
    var pass = getELE("MatKhau").value;
    var email = getELE("Email").value;
    var hinhAnh = getELE("HinhAnh").value;
    var loaiND = getELE("loaiNguoiDung").value;
    var ngonNgu = getELE("loaiNgonNgu").value;
    var moTa = getELE("MoTa").value;

    var regUser = new RegUser(taiKhoan, hoTen, pass, email, hinhAnh, loaiND, ngonNgu, moTa)
    console.log(regUser);

    //buoc2: update new info to DB
    regUserSer.updateUser(id, regUser)
        .then(function (result) {
            console.log(result.data);
            //load lại danh sách sau khi thêm thành công ( thay vì f5 quá phiền)
            getListUser();
            // //gọi sự kiện click có sẵn của close button 
            // //để tắt modal khi thêm thành công.
            document.querySelector(".modal-header .close").click();


        })
        .catch(function (error) {
            console.log(error);
        })
}


