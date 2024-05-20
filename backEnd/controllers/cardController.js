import prisma from "../config/prisma.js";

class CardController {

    async myCards(req, res) {
        //console.log('Getting my cards')
        const token = req.headers.token;
        //console.log(token)
        try {
    
            const user = await prisma.user.findFirst({
                where: {
                    token: token
                },
                include: {
                    cards: true
                }
            });
            //console.log(user);
            if (!user) return res.status(404).json({ message: "User not found" });
    
            return res.status(200).json(user.cards);
    
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
      }

      async like(req, res) {

        const token = req.headers.token;
        const cardId = req.body.cardId;
        
        try {
    
            const user = await prisma.user.findFirst({
                where: {
                    token: token
                },
                include: {
                    cards: true
                }
            });
            //console.log(user);
            if (!user) return res.status(404).json({ message: "User not found" });
            //console.log('found user');
            //console.log(cardId);
            //console.log(user.id)
            // now we set liked to true for the card
            let test = await prisma.card.findFirst({
                where: {
                    cardId: cardId,
                    userId: user.id
                }
            });
            //console.log(test.liked);
        
            if (test.liked == true) {
                //console.log('liked is true');
                await prisma.card.updateMany({
                    where: {
                        cardId: cardId,
                        userId: user.id
                    },
                    data: {
                        liked: false
                    }
                });
            } else {
                //console.log('liked is false');
                await prisma.card.updateMany({
                    where: {
                        cardId: cardId,
                        userId: user.id
                    },
                    data: {
                        liked: true
                    }
                });
            }
        

    
            return res.status(200).json({ message: "Card added to favorites" });
    
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: e.message });
        }


      }

      async booster (req, res) {

        const token = req.headers.token;

        try {
    
            const user = await prisma.user.findFirst({
                where: {
                    token: token
                },
                include: {
                    cards: true
                }
            });
            //console.log(user);
            if (!user) return res.status(404).json({ message: "User not found" });
            
            console.log('found user');

            let currentDate = new Date();
            let lastBooster = new Date(user.lastBooster);

            //check if last booster was more than 24 hours ago
            if (currentDate - lastBooster < 86400000) {
                return res.status(400).json({ message: "You can only use the booster once a day, try in tomorow" });
            }

            //update lastBooster
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    lastBooster: currentDate
                }
            });

            

            let allCards = user.cards;

            //remove cards where obtained is true
            let toObtain = allCards.filter(card => card.obtained == false);

            //pick 5 random cads from toObtain
            let randomCards = [];
            for (let i = 0; i < 5; i++) {
                let randomIndex = Math.floor(Math.random() * toObtain.length);
                randomCards.push(toObtain[randomIndex]);
                toObtain.splice(randomIndex, 1);
            }
            //console.log(randomCards);

            //set obtained to true for the 5 random cards
            randomCards.forEach(async card => {
                await prisma.card.updateMany({
                    where: {
                        cardId: card.cardId,
                        userId: user.id
                    },
                    data: {
                        obtained: true
                    }
                });
            });

            return res.status(200).json(randomCards);
            
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }

    }

}

export default new CardController();