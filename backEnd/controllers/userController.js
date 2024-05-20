import prisma from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";

class UsersController {

  async index(req, res) {
    console.log('Getting all users')
    const token = req.headers.token;
    console.log(token)
    try {
      let user = await prisma.user.findFirst({
        where: {
          token: token
        },
        include: {
          cards: true
        }
      });
      
      delete user.password;
      delete user.id;
      delete user.token;
      delete user.lastBooster;

      let cards = user.cards;

      delete user.cards;

      cards = cards.filter(card => card.obtained == true);

      console.table(user)
      console.table(cards)
      
      return res.status(200).json({user, cards});
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async store(req, res) {
    const body = req.body;
    //console.log('Registering user', body)
    try { 

        // we create a new user 
        let starterTime = new Date();
        starterTime.setDate(starterTime.getDate() - 1);

        const encryptedPassword = await hashPassword(body.password);
        const token = generateAccessToken(body.email);
        const  user = await prisma.user.create({
            data: {
            email: body.email,
            name: body.name,
            token: token,
            password: encryptedPassword,
            lastBooster: starterTime,
            },
        });

        // we create a card collection for the user

        let allCards = await fetch("https://hp-api.lainocs.fr/characters") 
        allCards = await allCards.json()
        //console.log(allCards)
        allCards.forEach(async card => {
            await prisma.card.create({
                data: {
                    cardId: card.id,
                    cardName: card.name,
                    cardImage: card.image,
                    cardSlug: card.slug,
                    cardBirthday: card.birthday,
                    cardBlood: card.blood,
                    cardEyes: card.eyes,
                    cardHairs: card.hairs,
                    cardHouse: card.house,
                    cardPatronus: card.patronus,
                    cardWand: card.wand,
                    cardRole: card.role,
                    cardActor: card.actor,
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            })
        })

        return res.status(201).json(user);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }


}

export default new UsersController();