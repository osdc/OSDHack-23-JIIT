function getChild(arr, clss){
  for(let i=0; i < arr.length; i++){
    if (arr[i].className === clss){
      return arr[i]
    }
  }
}

// FAQ selectors
document.addEventListener('keydown', handleFaq)
const faqItems = document.getElementsByClassName("question")
var currentFaq = 0

for(let i=0; i < faqItems.length; i++){
  faqItems[i].onmouseover = function(){
    for (let j of faqItems){
      j.style.color = '#001d55'
    }
    faqItems[i].style.color = '#26acc5'
    currentFaq = i
  }

  faqItems[i].onmouseout = function(){
    for (let j of faqItems){
      j.style.color = '#001d55'
    }
  }

  
  faqItems[i].onclick = function(){
    if(faqItems[i].childNodes[1].style.transform === ""){
      faqItems[i].childNodes[1].style.transform = "rotate(90deg)";
      var x = document.getElementById("answer");
    }
    else{
      faqItems[i].childNodes[1].style.transform = ""
    }
  }
}


function handleFaq(e){
  oldFaq = currentFaq;
  if(window.location.hash.substring(1) === 'faq'){
    if(e.key === "ArrowUp"){
      currentFaq= (faqItems.length + currentFaq - 1) % faqItems.length
    }
    else if(e.key === "ArrowDown"){
      currentFaq = (faqItems.length + currentFaq + 1) % faqItems.length
    }
    else if(e.key === "Enter") {
      faqItems[currentFaq].click()
    }
    faqItems[oldFaq].style.color = '#001d55'
    faqItems[currentFaq].style.color = '#26acc5'
  }
}

function myFunction(x) {
  x.classList.toggle("change");
}
var items = document.querySelectorAll("li");

function isItemInView(item){
  var rect = item.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isItemInView(items[i])) {
        items[i].classList.add("show");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);



