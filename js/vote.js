let Previou = "";

function selectCharacter(chara) {
    if (Previou === chara) {
        return
    }

    if (Previou) {
        temp = Previou;
        Previou = "";
        selectCharacter(temp);
    }
    loc = document.querySelector("#" + chara);
    if (loc.nextElementSibling.classList.contains("checked")) {
        loc.parentElement.classList.remove("checked");
        loc.nextElementSibling.classList.remove("checked");
        return;
    }
    loc.parentElement.classList.add("checked");
    loc.nextElementSibling.classList.add("checked");
    radio_btn = document.getElementById(chara);
    radio_btn.checked = !radio_btn.checked;
    Previou = chara;
}

function validateEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function Submit() {
    if ((document.querySelector("#email").value !== '') && (validateEmail(document.querySelector("#email").value) === null)) {
        alert("Please enter a valid email");
        scrollTo("email");
        return;
    }
    if (document.f.chara.value) {
        document.f.submit();
        return;
    }

    alert("Please select a character");
    scrollTo("vote");

}

