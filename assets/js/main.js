/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== CONTACT FORM FUNCTIONALITY =====*/
function sendEmail() {
    // Get form values
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    const feedbackElement = document.getElementById('contact-feedback');
    
    // Validate inputs
    if (!name || !email || !message) {
        showFeedback('Please fill in all fields', false);
        return false;
    }
    
    try {
        // Create email subject and body
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        
        // Show processing message
        showFeedback('Opening email client...', true);
        
        // For Chrome users, open Gmail compose window
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=sagarprempadhy@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open in new tab
        const newWindow = window.open(gmailUrl, '_blank');
        
        // If pop-up was blocked or failed, use mailto as fallback
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            // Fallback to mailto
            const mailtoLink = `mailto:sagarprempadhy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;
        }
        
        // Clear the form after sending
        document.getElementById('contact-form').reset();
        
        // Show success message
        showFeedback('Email client opened! If nothing happened, please check your pop-up blocker settings.', true);
        
        return true;
    } catch (e) {
        console.error("Error sending email:", e);
        
        // Show error message
        showFeedback('Error opening email client. Please use the direct email link above.', false);
        
        return false;
    }
}

// Helper function to show feedback messages
function showFeedback(message, isSuccess) {
    const feedbackElement = document.getElementById('contact-feedback');
    feedbackElement.textContent = message;
    feedbackElement.className = 'contact__message';
    
    if (isSuccess) {
        feedbackElement.classList.add('contact__message--success');
    } else {
        feedbackElement.classList.add('contact__message--error');
    }
    
    // Clear message after 5 seconds
    setTimeout(() => {
        feedbackElement.className = 'contact__message';
        feedbackElement.textContent = '';
    }, 5000);
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img__1,.work__img__2,.work__img__3, .contact__input',{interval: 200});
