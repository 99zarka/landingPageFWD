/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


//Generating the navigation bar & adding it to the html file
const fragment = document.createDocumentFragment(); 
let navigationBar=document.getElementById("navbar__list");
let allSections=document.getElementsByTagName("section");

for(let i=0;i<allSections.length;i++){
    let navItem = document.createElement('li');
    navItem.textContent=allSections[i].querySelector("h2").textContent;
    navItem.setAttribute("data-section-id",allSections[i].id);
    navItem.id=`item${i+1}`;
    allSections[i].setAttribute("data-navItem-id",navItem.id);
    //saving the id of the section in its corresponding navigation item on the top menu
    //so each item could be paired with its reffered section, and vice versa
    //the nav item and the section are pointing at one another using IDs
    fragment.appendChild(navItem);
}

navigationBar.appendChild(fragment);


//scrolling functionality
let scrollToSection=function (evt){
    if(evt.target.nodeName === 'LI'){
        let el=document.getElementById(evt.target.getAttribute("data-section-id"));
        el.scrollIntoView({behavior: "smooth"});
    }
}

navigationBar.addEventListener('click',scrollToSection);

//Showing a horizontal scroll bar when the screen doesn't fit the navigation bar
let ShowHideScrollBar=function(){
    let pageWidth=document.querySelector("html").offsetWidth;
    if(navigationBar.scrollWidth<=pageWidth)
        navigationBar.style.overflowX="hidden";
    else 
        navigationBar.style.overflowX="scroll";
}
window.addEventListener('load', ShowHideScrollBar);
//to style the navigation list depending on the size of the screen while initialing the web page
window.addEventListener('resize', ShowHideScrollBar);


