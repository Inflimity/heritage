// /* =========================================
//    1. GLOBAL FUNCTIONS (Called via HTML onclick)
//    ========================================= */

// // FAQ Accordion Logic
// function toggleFaq(element) {
//     const content = element.querySelector('.faq-content');
//     const icon = element.querySelector('i');

//     if (content.style.maxHeight) {
//         // Close
//         content.style.maxHeight = null;
//         icon.classList.remove('fa-minus');
//         icon.classList.add('fa-plus');
//     } else {
//         // Open
//         content.style.maxHeight = content.scrollHeight + "px";
//         icon.classList.remove('fa-plus');
//         icon.classList.add('fa-minus');
//     }
// }

// /* =========================================
//    2. DOM LOADED LOGIC
//    ========================================= */
// document.addEventListener("DOMContentLoaded", function () {

//     // --- A. LOOPING SCROLL ANIMATION ---
//     // This observer adds the class when visible, and REMOVES it when not.
//     // This creates the "always fade in" effect you wanted.
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('is-visible');
//             } else {
//                 // Remove class to reset animation when scrolling away
//                 entry.target.classList.remove('is-visible');
//             }
//         });
//     }, { threshold: 0.1 }); // Trigger when 10% visible

//     document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));


//     // --- B. MOBILE MENU LOGIC ---
//     const btn = document.getElementById('mobile-menu-btn');
//     const menu = document.getElementById('mobile-menu');

//     if (btn && menu) {
//         const icon = btn.querySelector('i');

//         // Toggle Button Click
//         btn.addEventListener('click', () => {
//             menu.classList.toggle('hidden');

//             // Toggle Icon between Bars and X
//             if (menu.classList.contains('hidden')) {
//                 icon.classList.remove('fa-xmark'); // or fa-times
//                 icon.classList.add('fa-bars');
//             } else {
//                 icon.classList.remove('fa-bars');
//                 icon.classList.add('fa-xmark'); // or fa-times
//             }
//         });

//         // Define Global Close Menu Function (for links inside the menu)
//         window.closeMenu = function () {
//             menu.classList.add('hidden');
//             // Reset icon to bars
//             if (icon) {
//                 icon.classList.remove('fa-xmark');
//                 icon.classList.add('fa-bars');
//             }
//         }
//     }


//     // --- C. HERO CAROUSEL LOGIC ---
//     const carouselItems = document.querySelectorAll('.carousel-item');

//     if (carouselItems.length > 0) {
//         let currentItem = 0;
//         const totalItems = carouselItems.length;
//         const intervalTime = 6000; // 6 seconds

//         // Ensure first item is visible initially
//         carouselItems[0].style.opacity = 1;
//         carouselItems[0].style.zIndex = 10;

//         function cycleCarousel() {
//             // Fade out current
//             carouselItems[currentItem].style.opacity = 0;
//             carouselItems[currentItem].style.zIndex = 0;

//             // Move to next
//             currentItem = (currentItem + 1) % totalItems;

//             // Fade in next
//             carouselItems[currentItem].style.opacity = 1;
//             carouselItems[currentItem].style.zIndex = 10;
//         }
//         setInterval(cycleCarousel, intervalTime);
//     }


//     // --- D. TYPEWRITER EFFECT ---
//     const line1 = document.getElementById('typewriter-line1');
//     const line2 = document.getElementById('typewriter-line2');

//     // Only run if elements exist on the page
//     if (line1 && line2) {
//         function typeString(text, element, speed, callback) {
//             let i = 0;
//             function step() {
//                 if (i < text.length) {
//                     element.innerHTML += text.charAt(i);
//                     i++;
//                     setTimeout(step, speed);
//                 } else if (callback) {
//                     callback();
//                 }
//             }
//             step();
//         }

//         // Start typing sequence after 500ms delay
//         setTimeout(() => {
//             // Type First Line
//             typeString("Precision Tech.", line1, 80, function () {
//                 // Pause 400ms, then Type Second Line
//                 setTimeout(() => {
//                     typeString("Curated Living.", line2, 80, null);
//                 }, 400);
//             });
//         }, 500);
//     }

// });


document.addEventListener("DOMContentLoaded", function () {

    // --- 1. NEW LOOPING ANIMATION LOGIC ---
    // Updated Observer to remove the visible class when element leaves view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // This removes the class so it fades out, ready to fade in again
                entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.1 }); // 10% visible to trigger

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- 2. MOBILE MENU LOGIC ---
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    // Function accessible globally
    window.closeMenu = function () {
        menu.classList.add('hidden');
    }

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // --- 3. CAROUSEL LOGIC ---
    const items = document.querySelectorAll('.carousel-item');
    let current = 0;
    const total = items.length;

    if (items.length > 0) items[0].style.opacity = 1;

    setInterval(() => {
        if (items.length === 0) return;
        items[current].style.opacity = 0;
        current = (current + 1) % total;
        items[current].style.opacity = 1;
    }, 6000);

    // --- 4. TYPEWRITER LOGIC ---
    const line1 = document.getElementById('typewriter-line1');
    const line2 = document.getElementById('typewriter-line2');

    function type(text, el, delay, callback) {
        let i = 0;
        function step() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(step, 80);
            } else if (callback) callback();
        }
        setTimeout(step, delay);
    }

    // Start typing
    if (line1 && line2) {
        type("Precision Tech.", line1, 500, function () {
            type("Curated Living.", line2, 300);
        });
    }
});

// --- 5. FAQ LOGIC ---
function toggleFaq(element) {
    const content = element.querySelector('.faq-content');
    const icon = element.querySelector('i');

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    }
}