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
const fragment = document.createDocumentFragment(); 
const navigationBar=document.getElementById("navbar__list");
const allSections=document.getElementsByTagName("section");
const pageHeader=document.querySelector('.page__header');
const buttonToTop=document.querySelector('#buttonToTop');
const buttonDummySection=document.getElementById('buttonDummySection');
const buttonNewSection=document.getElementById('buttonNewSection');
let oldMousePos=0
let oldScrollPos=0 //Position of navigation menu's horizontal scroll bar
let timer = 0;
const timeLimit = 3000 //time in ms. navigation bar is hidden beyond this limit.
const TimerInterval=100; //time in ms
let mouseHoldOnNavBar=false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function initializeNavItem(section,index){
    const navItem = document.createElement('li');
    navItem.textContent=section.querySelector("h2").textContent;
    navItem.setAttribute("data-section-id",section.id);
    navItem.id=`item${index+1}`;
    section.setAttribute("data-navItem-id",navItem.id);

    return navItem;
    //saving the id of the section in its corresponding navigation item on the top menu
    //so each item could be paired with its reffered section, and vice versa
    //the nav item and the section are pointing at one another using IDs
}

//When the middle line of the screen touches the section, the section will be marked as visible.
function isVisible(elem) {
    const middleLineOfScreen=window.scrollY+window.innerHeight/2;
    const elemBottom=elem.offsetTop+elem.offsetHeight;
    if(elem.offsetTop<middleLineOfScreen && middleLineOfScreen<elemBottom )
        return true;
        
    return false;
  }

//Showing the "Back to top" button when reaching the last section, otherwise it's going to be hidden
function showHideBackToTopButton() {
    if(allSections[allSections.length-1].className=='your-active-class' || isVisible(document.querySelector('footer')))
        buttonToTop.style.display='inline';
    else
        buttonToTop.style.display='none';
}

function createDummySectionHTML(numOfNewSection){
    return `
    <section id="section${numOfNewSection}" data-nav="Section ${numOfNewSection}">
        <div class="landing__container">
            <h2>Section ${numOfNewSection}</h2>
            <div class='paragraphs'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    
                <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
            </div>
        </div>
    </section>`;
    }





/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function initializeNavBar(){
    for(let i=0;i<allSections.length;i++)
        fragment.appendChild(initializeNavItem(allSections[i],i));
    navigationBar.appendChild(fragment);
}


//Showing a horizontal scroll bar (and grabbing cursor) when the screen doesn't fit the navigation bar
function ShowHideNavBarScrollBar(){
    const pageWidth=document.querySelector("html").offsetWidth;
    if(navigationBar.scrollWidth<=pageWidth){
            navigationBar.style.overflowX="hidden";
            pageHeader.style.cursor='default';
        }
    else{
        navigationBar.style.overflowX="scroll";
        pageHeader.style.cursor='grab';
    }   
}

// Add class 'active' to section when near top of viewport
//updating 'your-active-class' while scrolling by calculating if a section is visible on the screen 
function changeActiveClass(elem){
    const previousActiveElement=document.querySelector('.your-active-class');
    previousActiveElement.classList.remove('your-active-class');
    elem.classList.add('your-active-class');

    const previousActiveNavItem=document.querySelector('.your-active-nav-menu');
    previousActiveNavItem.classList.remove('your-active-nav-menu');

    const newActiveNavItemID=elem.getAttribute('data-navItem-id');
    const newActiveNavItem=document.getElementById(newActiveNavItemID);
    newActiveNavItem.classList.add('your-active-nav-menu');
    navigationBar.scrollTo({ //centering the active item in the middle of the navigation bar.
        left: newActiveNavItem.offsetLeft-window.innerWidth*0.5+newActiveNavItem.offsetWidth*0.5+2, //2 is the half of the margin (4px)
        behavior: 'smooth'});
}

// Scroll to anchor ID using scrollTO event smoothly
function scrollToSection(evt){
    if(evt.target.nodeName === 'LI'){
        const el=document.getElementById(evt.target.getAttribute("data-section-id"));
        window.scrollTo({top: el.offsetTop, behavior: 'smooth'} );
    }
}

//A button for adding a dummy section to make it easier to test the web page
function addNewSection(htmlText){
    allSections[allSections.length-1].insertAdjacentHTML('afterend',htmlText);
    navigationBar.appendChild(initializeNavItem(allSections[allSections.length-1],allSections.length-1));
    ShowHideNavBarScrollBar();
    navigationBar.scrollTo({
        left: navigationBar.scrollWidth ,
        behavior: 'smooth'});
    
    changeActiveClass(allSections[allSections.length-1])
}

//Feature: adding a new section entered by the user.

function addNewSectionByUser(){
    const newTitle=document.getElementById('newTitle').value.trim();
    let newText=document.getElementById('newText').value.trim();
    while(newText.search('\n\n')>=0)
        newText=newText.replaceAll('\n\n','\n'); //to discard empty newlines.

    newText=newText.replaceAll('\n','<p>');

    const htmlText=`
    <section id="section${allSections.length+1}" data-nav="Section ${allSections.length+1}">
        <div class="landing__container">
            <h2>${newTitle}</h2>
            <div class='paragraphs'>${newText}</div>
        </div>
    </section>`;

    if(newTitle&& newText){
        addNewSection(htmlText);
        document.getElementById('newTitle').value='';
        document.getElementById('newText').value='';
        window.scrollTo({
            top: allSections[allSections.length-1].offsetTop,
            behavior: 'smooth'} );
    }
    else{
        alert('You must fill Title and Text fields.');
    }
}

//Section collapse feature
function collapseSection(evt){
    classListArray=Array.from(evt.target.classList);
    if(!classListArray.includes('collapsed')){
        evt.target.parentElement.parentElement.style.minHeight='0';
        evt.target.nextElementSibling.style.maxHeight='0';
    }
    else{
        evt.target.nextElementSibling.style.maxHeight='100%';
        evt.target.parentElement.parentElement.style.minHeight='80vh';
    }
    evt.target.classList.toggle('collapsed');
}

//Scroll navigation menu by clicking & dragging it
function dragScrolling(evt){
    mouseHoldOnNavBar=true;
    if(pageHeader.style.cursor=='grab')
        pageHeader.style.cursor='grabbing';
    oldScrollPos=navigationBar.scrollLeft;
    oldMousePos=evt.pageX;

    function moveScrollBar(evt){
        navigationBar.scrollLeft=oldScrollPos-(evt.pageX-oldMousePos);
    }

    function abortDragScrolling(evt){
        mouseHoldOnNavBar=false;
        timer=0;
        ShowHideNavBarScrollBar();
        document.removeEventListener('mousemove',moveScrollBar);
        document.removeEventListener('mouseup',abortDragScrolling);
        if(evt.pageX!=oldMousePos) //clicking event will be aborted if the curser moves
            navigationBar.removeEventListener('click',scrollToSection); //solves the conflict between the dragging and clicking
    }

    document.addEventListener('mousemove', moveScrollBar);
    document.addEventListener('mouseup', abortDragScrolling);
    navigationBar.addEventListener('click',scrollToSection);
}

//When the timer exceeds a specfic time, the navigation bar will be hidden.
function continueOrResetTimer()  {
    timer+=100;

    //If The user is still on top of the page, the navigation bar will be shown
    if(window.scrollY<allSections[0].offsetTop) 
        timer=0;

    //If The user is dragging the navigation bar, it will always be shown
    if(mouseHoldOnNavBar)
        timer=-Infinity; 

    if(timer>=timeLimit){
        navigationBar.style.maxHeight='0';
        timer=timeLimit+TimerInterval;
    }else
        navigationBar.style.maxHeight='20vh';
    
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
//Generating the navigation bar & adding it to the html file
initializeNavBar();

//to style the navigation list depending on the size of the screen after initialing the web page or resizing
window.addEventListener('load', ShowHideNavBarScrollBar);
window.addEventListener('resize', ShowHideNavBarScrollBar);

// Scroll to section on link click
navigationBar.addEventListener('mousedown',dragScrolling);

// Set sections as active
navigationBar.firstChild.classList.add('your-active-nav-menu'); //initial value
window.addEventListener('scroll', function() {
    Array.from(allSections).forEach(function(elem){
        if(isVisible(elem))
            changeActiveClass(elem);
    })
})

/* Back to top button */
buttonToTop.addEventListener('click',function(){
    window.scrollTo({top: 0, behavior: 'smooth'});
})
window.addEventListener('scroll', showHideBackToTopButton)


/* Updating page content */

buttonDummySection.addEventListener('click',function(){
    addNewSection(createDummySectionHTML(allSections.length+1));
    window.scrollBy({
        top: allSections[allSections.length-1].offsetHeight,
        behavior: 'smooth'});
})

buttonNewSection.addEventListener('click',addNewSectionByUser);

document.addEventListener('click',function (evt){
    if(evt.target.nodeName === 'H2')
        collapseSection(evt);
});

/* Hide navigation bar while not scrolling */
setInterval(continueOrResetTimer, TimerInterval);
window.addEventListener('scroll',function(){ timer=0; });
//Show the navigation bar if the curser touches the top 10% of the window
window.addEventListener('mousemove',function(evt){
    if(evt.clientY<window.innerHeight/10)
        timer=0
});
navigationBar.addEventListener('scroll',function(){ timer=0; });
