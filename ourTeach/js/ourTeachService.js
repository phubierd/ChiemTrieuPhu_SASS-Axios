function OurTeachService(){
    this.layDS = function(){
        var promise = axios({
            method: 'get',
            url: 'https://6065c023b8fbbd001756738a.mockapi.io/ourTeach'
        });
        return promise;
    }
}