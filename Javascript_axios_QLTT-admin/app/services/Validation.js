function Validation() {
    this.checkEmpty = function (inputVal, spanID, message) {
        if (inputVal.trim() != "") {
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    };



    // ============check trùng ID======
    this.checkTK = function (inputVal, spanID, message, arrUser) {
        //kiểm tra có tồn tại trong mảng user ko
        var isExist = false;

        isExist = arrUser.some(function (item) {
            return item.taiKhoan === inputVal;
        })


        if (isExist) {
            document.getElementById(spanID).innerHTML = message;
            return false;
        } else {
            document.getElementById(spanID).innerHTML = "";
            return true;
        }

    }

    //=============check name===========
    this.checkName = function (inputVal, spanID, message) {
        //cách 1: dùng đối tượng RegExp
        var namePattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");

        if (namePattern.test(inputVal)) {
            //tên hợp lệ:
            document.getElementById(spanID).innerHTML = ""; //xóa câu thông báo lỗi
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }


    //=============check Length==========
    this.checkLength = function (inputVal, spanID, message, min, max) {
        if (inputVal.length >= min && inputVal.length <= max) {
            //dữ liệu hợp lệ
            document.getElementById(spanID).innerHTML = "";//xóa câu thông báo lỗi
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }


    //===========check pass====
    this.checkPass = function (inputVal, spanID, message) {
        var passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (inputVal.match(passPattern)) {
            document.getElementById(spanID).innerHTML = "";
            return true;

        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }

    //===========check MAIL========
    this.checkMail = function (inputVal, spanID, message) {
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputVal.match(emailPattern)) {
            document.getElementById(spanID).innerHTML = "";
            return true;
        } else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }


    //=============check DropDown=======
    this.checkDropDown = function (selectID, spanID, message) {
        if (document.getElementById(selectID).selectedIndex != 0){
            document.getElementById(spanID).innerHTML="";
            return true;

        }else {
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
}