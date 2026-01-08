

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

document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = this;
    const btn = form.querySelector('button[type="submit"]');
    const originalBtnText = btn.innerHTML;

    // Disable button and show loading state
    btn.disabled = true;
    btn.innerHTML = "Sending...";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // Show the modal
            document.getElementById('successModal').classList.remove('hidden');
            document.getElementById('successModal').classList.add('flex');
            form.reset();
        } else {
            alert("Submission failed. Please try again.");
        }
    } catch (error) {
        alert("Error connecting to server.");
    } finally {
        // Re-enable button
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
    }
});

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}