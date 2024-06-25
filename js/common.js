// navi
window.addEventListener('DOMContentLoaded', function () {
    nav = document.querySelector('#navArea');
    btn = document.querySelector('.toggle_btn');
    mask = document.querySelector('#mask');
    navBtns = document.querySelectorAll('.nav_btn.can');
    open = 'open'; // class

    // menu open close
    btn.addEventListener('click', function () {
        if (!nav.classList.contains(open)) {
            nav.classList.add(open);
        } else {
            nav.classList.remove(open);
        }
    });

    // mask close
    mask.addEventListener('click', function () {
        nav.classList.remove(open);
    });

    // nav button close
    navBtns.forEach(function (navBtn) {
        navBtn.addEventListener('click', function () {
            nav.classList.remove(open);
        });
    });
});

// scroll

function scrollTo(elementID) {

targetElement = document.getElementById(elementID);

targetElement.scrollIntoView();
}


// page top
document.addEventListener("DOMContentLoaded", function () {
    topBtn = document.querySelector("#page-top");
    topBtn.style.display = "none";

    window.addEventListener("scroll", function () {
        if (window.scrollY > 350) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", function () {
        scrollTo("header-wrap");
        return false;
    });
});

// page
function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + "px";
}