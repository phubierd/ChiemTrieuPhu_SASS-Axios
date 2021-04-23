function RegUserService() {
    this.layDS = function () {
        var promise = axios({
            method: 'get',
            url: 'https://6065c023b8fbbd001756738a.mockapi.io/ourTeach',
        });
        return promise;
    }

    // ================Tim Kiem User=============
    this.findUser = function (arrUser, stringFind) {

        var arrFind = [];

        arrFind = arrUser.filter(function (user) {
            return user.hoTen.toLowerCase().indexOf(stringFind.toLowerCase()) >= 0;
            // user.hoTen -> hoTen lay tu API
        })
        return arrFind;
    }

    // ===================ADD USER================
    this.addUser = function (user) {
        var promise = axios({
            method: 'post',
            url: 'https://6065c023b8fbbd001756738a.mockapi.io/ourTeach',
            data: user,
        });
        return promise;
    }

    // ==============Del user===============
    this.delUser = function (id) {
        var promise = axios({
            method: 'delete',
            url: `https://6065c023b8fbbd001756738a.mockapi.io/ourTeach/${id}`,

        });
        return promise;
    }


    //===========Xem thong tin USER=========
    this.infoUser = function (id) {
        var promise = axios({
            method: 'get',
            url: `https://6065c023b8fbbd001756738a.mockapi.io/ourTeach/${id}`,
        });
        return promise;
    }


    //=============update user=============
    this.updateUser = function (id, user) {
        var promise = axios({
            method: 'put',
            url: `https://6065c023b8fbbd001756738a.mockapi.io/ourTeach/${id}`,
            data: user,
        });
        return promise;
    }
}