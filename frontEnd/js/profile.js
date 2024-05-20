let profileData = document.querySelectorAll('.profileData');
fetch('http://localhost:3000/users', {
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json',
        'token' : localStorage.getItem('token')
    },
})
.then(response => response.json())
.then(data => {
    console.log(data);
    console.log(localStorage.getItem('token'));

    let obtained = 0;
    data.cards.forEach(card => {
        if (card.obtained == true) {
            obtained++;
        }
    });

    profileData[0].textContent = 'Username : ' + data.user.name;
    profileData[1].textContent = 'Email : ' + data.user.email;
    profileData[2].textContent = 'Number of card found : ' + obtained + '/30';

    let characters = data.cards;
        let cards = document.querySelector('#cards');
        characters.forEach(character => {
            let card = document.createElement('div');
            card.classList.add('card');
            if (character.cardHouse != "") {
                card.classList.add(character.cardHouse);
            } else {
                card.classList.add('no-house');
            }
            if (character.liked == true) {
                card.classList.add('Favorite');
            }
            if (character.obtained == true) {
                card.classList.add('obtained');
            }
            let h3 = document.createElement('h3');
            h3.textContent = character.cardHouse;
            let img = document.createElement('img');
            img.src = character.cardImage;
            img.alt = character.cardSlug;
            let p = document.createElement('p');
            p.textContent = character.cardName;
            let p2 = document.createElement('p');
            p2.textContent = 'By : ' + character.cardActor;
            let div = document.createElement('div');
            let btn = document.createElement('button');
            btn.textContent = 'See in details';
            
            let btn2 = document.createElement('button');
            if (character.liked == true) {
                btn2.textContent = 'Remove from favorites';
            } else {
                btn2.textContent = 'Add to favorites';
            }

            div.appendChild(btn);
            div.appendChild(btn2);

            card.appendChild(h3);
            card.appendChild(img);
            card.appendChild(p);
            card.appendChild(p2);
            card.appendChild(div);
            cards.appendChild(card);
            
            btn.addEventListener('click', () => {
                //console.log('click');
                //console.log(character.cardSlug);
                window.location.href = 'carte.html?' + character.cardSlug;
            });

            btn2.addEventListener('click', () => {
                console.log('click');
                fetch('http://localhost:3000/liked', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'token' : localStorage.getItem('token')
                    },
                    body: JSON.stringify({cardId: character.cardId})
                })
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    if (card.classList.contains('Favorite')) {
                        btn2.textContent = 'Add to favorites';
                        card.classList.remove('Favorie');
                    } else {
                        btn2.textContent = 'Remove from favorites';
                        card.classList.add('Favorite');
                    }
                });
            });
        });
});