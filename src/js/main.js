import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css'
import * as bootstrap from 'bootstrap';

window.next = (nextPage) => {
    let required = {};
    let inputs = document.querySelectorAll("input");
    let selects = document.querySelectorAll("select");

    let missingFields = false;
    inputs.forEach((el) => {
        let pat = new RegExp(el.pattern);
        if (el.type == "radio") {
            if (el.checked) {
                required[el.name] = el.value;
            }
        }
        else if (el.required) {
            if (el.value.length == 0) {
                el.parentNode.children[1].children[0].innerText = "Field Cannot be empty";
                missingFields = true;
            }
            else if (pat && el.value.match(pat) == null) {
                el.parentNode.children[1].children[0].innerText = "Wrong Format";
                missingFields = true;
            }
            else {
                el.parentNode.children[1].children[0].innerText = "";
            }
        }
        required[el.name] = el.value;
    });

    selects.forEach((el) => {
        let pat = new RegExp(el.pattern);
        if (el.required) {
            if (el.value.length == 0) {
                el.parentNode.children[1].children[0].innerText = "Field Cannot be empty";
                missingFields = true;
            }
            else if (pat && el.value.match(pat) == null) {
                el.parentNode.children[1].children[0].innerText = "Wrong Format";
                missingFields = true;
            }
            else {
                el.parentNode.children[1].children[0].innerText = "";
            }
        }
        required[el.name] = el.value;
    });

    if (!missingFields) {
        let cached = window.localStorage.getItem("store");
        if (cached == null || cached.length !== 0) {
            cached = JSON.parse(cached);
            cached = {
                ...cached,
                ...required
            }
        }
        else {
            cached = require;
        }
        console.log(cached)
        window.localStorage.setItem("store", JSON.stringify(cached));
        window.location.href = `${window.location.origin}/${nextPage}`;
    }
}

window.back = (page) => {
    if (window.confirm("Are you sure you want to go back?")) {
        window.location.href = `${window.location.origin}/${page}`;
    }
}

window.loadInfo = () => {
    let tbody = document.querySelector("tbody");
    let store = JSON.parse(window.localStorage.getItem("store"));
    let info = [
        store.txtLastName,
        store.txtFirstName,
        store.txtMiddleName,
        store.txtCourse,
        store.txtCampusCode,
        store.txtClass,
        store.txtEmail,
        new Date(store.txtExamDate),
    ]

    tbody.children
    for (let i=0;i<tbody.childElementCount;i++) {
        let td = tbody.children[i].children[1];
        td.innerText = info[i];
    }
};
