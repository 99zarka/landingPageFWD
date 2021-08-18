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

let initializeNavItem= function(section,index){
    let navItem = document.createElement('li');
    navItem.textContent=section.querySelector("h2").textContent;
    navItem.setAttribute("data-section-id",section.id);
    navItem.id=`item${index+1}`;
    section.setAttribute("data-navItem-id",navItem.id);

    return navItem;
    //saving the id of the section in its corresponding navigation item on the top menu
    //so each item could be paired with its reffered section, and vice versa
    //the nav item and the section are pointing at one another using IDs

}

let i=0;
for(i=0;i<allSections.length;i++){
    fragment.appendChild(initializeNavItem(allSections[i],i));
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


//a button for adding a dummy section to make it easier to test the web page
let dummySection=(allSections)=>  `<section id="section${allSections.length+1}" data-nav="Section ${allSections.length+1}">
<div class="landing__container">
  <h2>Section ${allSections.length+1}</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

  <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
</div>
</section>`;

let button1=document.getElementById('button1');
button1.addEventListener('click',function(){
    allSections[allSections.length-1].insertAdjacentHTML('afterend',dummySection(allSections));
    navigationBar.appendChild(initializeNavItem(allSections[i],i++));
    ShowHideScrollBar();
    navigationBar.lastElementChild.scrollIntoView({behavior: "smooth"});
    button1.scrollIntoView({behavior: "smooth"});

})

//updating 'your-active-class' while scrolling by calculating if a section is visible on the screen 
function isVisible(elem) {
    bound=elem.getBoundingClientRect();
    if(bound.top>window.innerHeight && bound.bottom>window.innerHeight) //when the element is fully above the viewport
        return false;
    if(bound.top<0 && bound.bottom<0) //when the element is fully below the viewport
        return false;
    
    let mean=(bound.top+bound.bottom)/2;
    if(mean>window.innerHeight || mean<0) //when the centre (middle base) of the element is not visible
        return false; 

    return true;
  }

navigationBar.firstChild.classList.add('your-active-nav-menu'); //initial value

let changeActiveClass=function(elem){
    let previousActiveElement=document.querySelector('.your-active-class');
    previousActiveElement.classList.remove('your-active-class');
    elem.classList.add('your-active-class');

    let previousActiveNavItem=document.querySelector('.your-active-nav-menu');
    previousActiveNavItem.classList.remove('your-active-nav-menu');

    let newActiveNavItemID=elem.getAttribute('data-navItem-id');
    let newActiveNavItem=document.getElementById(newActiveNavItemID);
    newActiveNavItem.classList.add('your-active-nav-menu');
    newActiveNavItem.scrollIntoView({behavior: "smooth", inline : "center"});
}

window.addEventListener('scroll', function() {
    Array.from(allSections).forEach(function(elem){
        if(isVisible(elem))
            changeActiveClass(elem);
    })
})

//Back to top button

let buttonToTop=document.querySelector('#buttonToTop')
buttonToTop.addEventListener('click',function(){
    document.querySelector('html').scrollIntoView({behavior: "smooth"})
})

//showing the "Back to top" button when reaching the last section, otherwise it's going to be hidden
window.addEventListener('scroll', function() {
    if(isVisible(allSections[i-1]))
        buttonToTop.style.display='inline';
    else
        buttonToTop.style.display='none'
})