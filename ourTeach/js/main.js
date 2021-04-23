var ourTeachSer = new OurTeachService();
getListOurTeach();

function getListOurTeach() {
    var promise = ourTeachSer.layDS();
    promise.then(function (result) {
        console.log(result.data);
        // for (var i = 0; i < result.data.length; i++) {
        //     console.log(result.data[i].loaiND)
        //     // switch (result.data[i].loaiND) {
        //     //     case "GV":
        //     //         console.log("GV1111")
        //     //         renderOurTeach(result.data);
        //     //         break;
        //     //     case "HV":
        //     //         console.log("HV11111");  
        //     //         break;
        //     // }
        //     if (result.data[i].loaiND == "GV"){
        //         renderOurTeach(result.data);
        //     }else{
        //         break;
        //     }
        // }
        renderOurTeach(result.data);
    })

        .catch(function (error) {
            console.log(error);
        })
};

function renderOurTeach(mangOT) {
    var content = "";
    
    mangOT.map(function (ot, index) {

        if (ot.loaiND === "GV"){
            content += `
        <div class="col-12 col-md-6 col-lg-3">
                    <div class="card" style="width: 18rem;">
                        <img src="./images/${ot.hinhAnh}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${ot.ngonNgu}</h5>
                            <h1>${ot.hoTen}</h1>
                            <p class="card-text">${ot.moTa}</p>
                        </div>
                    </div>
                </div>
        `
        }

        
        // content += `
        // <div class="col-12 col-md-6 col-lg-3">
        //             <div class="card" style="width: 18rem;">
        //                 <img src="./images/${ot.hinhAnh}" class="card-img-top" alt="...">
        //                 <div class="card-body">
        //                     <h5 class="card-title">${ot.ngonNgu}</h5>
        //                     <h1>${ot.hoTen}</h1>
        //                     <p class="card-text">${ot.moTa}</p>
        //                 </div>
        //             </div>
        //         </div>
        // `
    });

    
    document.getElementById("OurTeacch__list").innerHTML = content;
}


