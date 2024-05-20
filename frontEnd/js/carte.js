fetch('http://localhost:3000/verify', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'token' : localStorage.getItem('token')
    }
})
.then(response => 
    {
        //console.log(response.status);
        if (response.status != 200) {
            window.location.href = 'login.html';
        }
    }
)

function toggleBurger() {
    let headers = document.querySelector('header');
    let svg = document.querySelector('header svg');
    headers.classList.toggle('burgerNav');
    svg.classList.toggle('flipNav');
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

const slug = window.location.search.substring(1);

fetch('http://localhost:3000/myCards', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'token' : localStorage.getItem('token')
    }
})
.then(response => response.json())
.then(data => {
    //console.log(data);
    data = data.find(character => character.cardSlug === slug);
    let h2 = document.querySelector('section h2');
    h2.textContent = data.cardName;
    let img = document.querySelector('section img');
    img.src = data.cardImage;
    img.alt = data.cardSlug;
    if (data.obtained == true) {
        img.classList.add('obtained');
    }
    let ul = document.querySelector('section ul');
    let li = document.createElement('li');
    li.innerHTML = 'Born the : ' + data.cardBirthday;
    let li2 = document.createElement('li');
    li2.innerHTML = 'Blood : ' + data.cardBlood;
    let li3 = document.createElement('li');
    li3.innerHTML = 'Eyes : ' + data.cardEyes;
    let li4 = document.createElement('li');
    li4.innerHTML = 'Hair : ' + data.cardHairs;
    let li5 = document.createElement('li');
    li5.innerHTML = 'House : ' + data.cardHouse;
    let li6 = document.createElement('li');
    li6.innerHTML = 'Patronus : ' + data.cardPatronus;
    let li7 = document.createElement('li');
    li7.innerHTML = 'Wand : ' + data.cardWand;
    let li8 = document.createElement('li');
    li8.innerHTML = 'Role : ' + data.cardRole;
    let li9 = document.createElement('li');
    li9.innerHTML = 'Played by : ' + data.cardActor;
    ul.appendChild(li);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4); 
    ul.appendChild(li5);
    ul.appendChild(li6);
    ul.appendChild(li7);
    ul.appendChild(li8);
    ul.appendChild(li9);
});

