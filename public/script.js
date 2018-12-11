let newProducts;
const product = document.getElementsByClassName("product");
const productPic = document.getElementsByClassName("pic");
const productThumbnail = document.getElementsByClassName("product-thumbnail");
const closeBtns = document.getElementsByClassName("close");
const productGallery = document.getElementById("product-gallery");
const openProduct = document.getElementsByClassName('open')
// product expander
function expand(e, state) {
  if(state == true) {
    e.classList.remove("product-thumbnail");
    e.classList.add("open");
  }
  else {
    e.parentNode.classList.add("product-thumbnail");
    e.parentNode.classList.remove("open");
  }
}
function createImg(array, i){
  let imgContainer = document.createElement("div");
  imgContainer.style.backgroundImage = "url('" + array[i].thumbnail.href + "')"
  imgContainer.classList.add("pic")
  imgContainer.classList.add("img-container")
  return imgContainer
}
/* see above for all created parts */
function createProduct(array) {
  console.log(array)
    const productGallery = document.getElementById("product-gallery");
    for (i=0;i<array.length;i++){
      let container = document.createElement("div");
      container.classList.add("product-thumbnail");
      container.classList.add("product");

      let name = document.createElement("p");
      let nameTxt = document.createTextNode(array[i].name);
      name.appendChild(nameTxt)
      name.classList.add("name")

      let price = document.createElement("p");
      let priceTxt = document.createTextNode(array[i].priceRange.selling.high);
      price.appendChild(priceTxt)
      price.classList.add("price")

      let close = document.createElement("p");
      let closeTxt = document.createTextNode("✖");

      close.appendChild(closeTxt);
      close.classList.add("close")
      close.setAttribute("aria-label", "close")

      container.appendChild(close)
      container.appendChild(createImg(array, i))

      container.appendChild(name)
      container.appendChild(price)
      productGallery.appendChild(container)
    }

    for (i=0;i<productPic.length;i++){
        productPic[i].addEventListener("click", function(event){
          expand(event.target.parentNode, true)
        })
      }
    for (i=0;i<productThumbnail.length;i++){
        productThumbnail[i].addEventListener("click", function(event){
          expand(event.target, true)
        })
      }
    for (i=0;i<closeBtns.length;i++) {
      closeBtns[i].addEventListener("click", function(event){
        expand(event.target, false)
      })
    }
}
(function getJSONFile() {
    var httpRequest = new XMLHttpRequest();
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                newProducts = JSON.parse(xhr.responseText);
                createProduct(newProducts.groups);
            }
        }
    };
    xhr.open('GET', "product.json", true);
    xhr.send();
})();
