const formKapsayiciDivDOM = document.querySelector(".form-wrapper");
const formDOM = document.querySelector("#form");
const inputDOM = document.querySelector("#aramaInput");
const buttonKapsayiciDivDOM = document.querySelector(".button-wrapper");
const buttonAramaDOM = document.querySelector("#aramaButon");
const buttonTemizleDOM = document.querySelector("#temizleButon");
const resimKapsayiciDivDOM = document.querySelector(".imageList-wrapper");

runEventListeners();

function runEventListeners(){
    formDOM.addEventListener("submit",aramaYap);
    buttonTemizleDOM.addEventListener("click",temizle)
}


function temizle(){
    inputDOM.value = "";            // input icerisine yazilan metini temizledik
    Array.from(resimKapsayiciDivDOM.children).forEach((cocuklar) => cocuklar.remove())   // secili dom ogesinin children ogelerini forEach ile tek tek donerek sildik
    // resimKapsayiciDivDOM.innerHTML="";           //  bu sekilde de yapabilirdik
}


function aramaYap(e){
    e.preventDefault();
    //Array.from(resimKapsayiciDivDOM.children).forEach((cocuklar) => cocuklar.remove());  => arama butonuna basildiginda önceki görseller temizlenecek ve yeni arama sonucu gelen görseller sayfada gösterilecektir.  
    const deger = inputDOM.value.trim()
    fetch(`https://api.unsplash.com/search/photos?query=${deger}`,{
        method : "GET",
        headers : {
            Authorization: "Client-ID Y3lHQAHYmnDfq8JPHhp76e2mDOkfl__dUqqW0wTpIIQ"    // sagdaki parametreye access key'imizi verdik
        }
    })
    .then((res) => res.json())
    .then((data) => {
        Array.from(data.results).forEach((img) => {         // once array'a cevirdik ardindan results'un icerisinde forEach ile donduk
            //console.log(img.urls.small)
            resimleriGetir(img.urls.small)
        })
    })
    .catch((err) => console.log(err))
    
}


function resimleriGetir(url){
    const div = document.createElement("div");
    div.className = "card";
    
    const img = document.createElement("img");
    img.setAttribute("src",url);
    img.height = "400";
    img.width = "400";

    div.append(img)
    resimKapsayiciDivDOM.append(div)
}


