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

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}



let menu = document.querySelectorAll('.menu');
menu.forEach(item => {
    item.addEventListener('click', () => {
        menu.forEach(item => {
            item.classList.remove('active');
        });
        item.classList.add('active');
    });
});

let filtres = document.querySelectorAll('.filre');
filtres.forEach(filtre => {
    filtre.addEventListener('click', () => { 
        filtres.forEach(filtre => {
            filtre.classList.remove('active');
        });
        filtre.classList.add('active');
        let house = filtre.textContent;
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (house == 'All') {
                card.style.display = 'flex';
                card.classList.remove('Gryffindor');
                card.classList.remove('Slytherin');
                card.classList.remove('Ravenclaw');
                card.classList.remove('Hufflepuff');
            } else {
                if (card.classList.contains(house)) {
                    card.style.display = 'flex';
                    card.classList.add(house);
                } else {
                    card.style.display = 'none';
                    
                }
            }
        });

    });
});


function toggleBurger() {
    let headers = document.querySelector('header');
    let svg = document.querySelector('header svg');
    headers.classList.toggle('burgerNav');
    svg.classList.toggle('flipNav');
}

function toggleFilter() {
    let filters = document.querySelector('#filtres');
    let svg = document.querySelector('#filtres svg');
    filters.classList.toggle('burgerFiltres');
    svg.classList.toggle('flipFiltres');
}