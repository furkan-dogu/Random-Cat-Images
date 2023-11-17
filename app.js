const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");

//! loading çalıştır

window.onload = function() {
  containerDiv.style.display = "none"
  setTimeout(() => {
      loadingDiv.style.display = "none"
      containerDiv.style.display = "block"
      getImage()
  }, 2000)
}

//! verileri getir

const getImage = (() => {
  fetch("https://api.thecatapi.com/v1/images/search?limit=10").then((res) => {
    if(!res.ok) {
        throw new Error()
    }
    return res.json()   
  })
  .then((data) => {
      show(data)
  })
  .catch(() => {
    containerDiv.textContent = ""
    let img = document.createElement("img")
    img.id = "error-img"
    img.src = "./img/error.gif"
    containerDiv.appendChild(img)
  })
});

//! resimleri yerleştir

const show = ((catsShow) => {
  cardDiv.textContent= ""

  catsShow.forEach((image) => {
      let disDiv = document.createElement("div")
      disDiv.className = "col-12 col-sm-6 col-lg-4"
      let icDiv = document.createElement("div")
      icDiv.style.height = "200px" 
      let img = document.createElement("img")
      img.id = "cats-img"
      img.src = image.url
      img.className = "w-100 h-100"

      icDiv.appendChild(img)
      disDiv.appendChild(icDiv)
      cardDiv.appendChild(disDiv)
  })    
})

//! butona basınca resim değişsin

btn.addEventListener("click", () => {
    loadingDiv.style.display = "none"
    setTimeout(() => { 
        cardDiv.textContent = ""  
        let img = document.createElement("img")
        img.id = "loading-img"
        img.src = "./img/loading.gif"
        cardDiv.appendChild(img)
    }, 0);
    getImage()
})

//! tarih belirleme

const outputDate = (() => {
    let gun = new Date().toLocaleDateString(); // localden şuanki tarih
    let saat = new Date().toLocaleTimeString(); // localden şuanki saat

    tarih.textContent = gun + " - " + saat
})

setInterval(outputDate, 1000)