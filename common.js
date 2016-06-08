var wrapper = document.querySelector(".wrapper");
var slider = document.querySelector(".slider");
var slw = document.querySelector(".slide-wrapper");
slider.addEventListener("click",slide);
slider.addEventListener("transitionend",check);
var slide = document.querySelectorAll(".slide");

var wrapWith = wrapper.offsetWidth;
var s = -wrapWith;
var fullwith = 0;
var position = s;
var setPosition = 0;
var fullSlide;
var clonefirst;
var cloneLast;
var active;
slw.style.transition = "0s";
slw.style.transform = "translate3d("+ -wrapWith + "px,0,0)";

(function makeSlide(){
	clonefirst = slide[0].cloneNode(true);
	cloneLast = slide[slide.length-1].cloneNode(true);
	slw.insertBefore(cloneLast,slide[0]);
	clonefirst.classList.add("cloned");
	slw.appendChild(clonefirst);
	cloneLast.classList.add("cloned");
	fullSlide = document.querySelectorAll(".slide");

	for (var i = 0; i < fullSlide.length; i++) {
		fullSlide[i].style.width = wrapWith + "px";
		fullwith += fullSlide[i].offsetWidth;
	}
	slw.style.width = fullwith + "px";
	for (var i = 0; i < slide.length; i++) {
		slide[i].setAttribute("data-position",position);
		position -= wrapWith;
	}
})();
function setActive(){
	for (var i = 0; i < slide.length; i++) {
		if(slide[i].getAttribute("data-position") == s){
			slide[i].classList.add("active");
		}else{
			slide[i].classList.remove("active");
		}
	}
}
setActive();

(function makeBottomSlider(){
	var bot = document.createElement("div");
	bot.className = "bottom-panel";
	for (var i = 0; i < slide.length; i++) {
		var a = slide[i].cloneNode(true);
		a.className = "bottom-item";
		a.style.width = (wrapWith/slide.length) + "px";
		a.style.height = (wrapWith/slide.length)/2 + "px";
		bot.appendChild(a);
	}

	slider.appendChild(bot);
})();

var botPanel = document.querySelector(".bottom-panel");
botPanel.addEventListener("click",change);
function change(e){
	active = document.querySelector(".active");
	var target = e.target;
	while (target != this) {
		debugger;
		if (target.hasAttribute("data-position")) {
			setPosition = e.target.parentNode.getAttribute("data-position");
			slw.style.transform = "translate3d("+ setPosition + "px,0,0)";
			s = setPosition;
		}
		target = target.parentNode;
	}
}



function check(e){
	if(s <= -fullwith+wrapWith){
		slw.style.transition = "0s";
		slw.style.transform = "translate3d("+ -wrapWith + "px,0,0)";
		s = -wrapWith;
	}
	else if(s == 0 || s > 0){
		var a = -fullwith+(wrapWith*2);
		slw.style.transition = "0s";
		slw.style.transform = "translate3d("+ a + "px,0,0)";
		s = a;
	}
	setActive();
}
function slide(e){
	var target = e.target;
	if(target.className == "next"){
		s -= wrapWith;
		slw.style.transition = "all .5s ease";
		slw.style.transform = "translate3d("+ s + "px,0,0)";	
	}
	if(target.className == "prev"){
		s += wrapWith;
		slw.style.transition = "all .5s ease";
		slw.style.transform = "translate3d("+ s + "px,0,0)";
	}
	setActive();
}

