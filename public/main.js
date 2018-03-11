"use strict";

function auth(username, email, callback){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/auth', true);
    xhr.withCredentials = true;

    const user = {username, email};
    const body = JSON.stringify(user);

    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');

    xhr.onreadystatechange = function(){
        if(xhr.readyState !== 4) return;
        if(+xhr.status!== 200){
            return callback(xhr, null);
        }

        const response = JSON.parse(xhr.responseText);
        callback(null, response);
    };
    xhr.send(body);
}

const sections = [
    ['login', 'Login'],
    ['profile', 'My profile'],
    ['about', 'About']
];

const application = document.querySelector('#application');
const nav = document.getElementById('navigation');

for (let section of sections) {
    const newButton = document.createElement('input');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('data-section', section[0]);
    newButton.value = section[1];
    nav.appendChild(newButton);
}



const liveSectionsCollection = document.getElementsByTagName('section');
const liveSectionsArray = Array.from(liveSectionsCollection);
const emaildiv = document.getElementById('emaildiv');
const usernamediv = document.getElementById('usernamediv');
const countdiv = document.getElementById('countdiv');

nav.addEventListener('click', function(event){
const sectionId = event.target.getAttribute('data-section');

    if(sectionId === 'profile') {
        whoAmI(function (err, resp) {
            if(err){
                alert('Auth err:', err);
            }
            emaildiv.textContent = resp.email;
            usernamediv.textContent = resp.username;
            countdiv.textContent = resp.count;

            //event.target.parentNode.hidden = false;
            //sectionElement.hidden = false;
            return;
        });
    }

    console.log(sectionId);

    liveSectionsArray.forEach( function(sectionElement) {
        sectionElement.hidden = true;
        if (sectionElement.id === sectionId) sectionElement.hidden = false;
    });
});

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(loginForm.elements);
    const email = loginForm.elements['login-form-email'].value;
    const username = loginForm.elements['login-form-name'].value;

    auth(username,email, function (err, resp) {
        console.log(err, resp);
        if(err){
            alert('Auth err: ${err.status}', err.status);
        }
        loginForm.reset();
    });
});

function whoAmI(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/me', true);
    xhr.withCredentials = true;
    xhr.onreadystatechange = function (){
        if(xhr.readyState !== 4) return;

        if(xhr.status !== 200) {
            console.log('WhoAmI != 200', xhr);
            return callback(xhr);
        }
        console.log('WhoAmI == 200');
        //const response = JSON.parser(xhr.responseText);
        const response = JSON.parse(xhr.responseText);
        return callback(null, response);

    };
    xhr.send();
}