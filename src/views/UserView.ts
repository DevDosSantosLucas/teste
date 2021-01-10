import UserController from "../controllers/UserController";
import User from "../models/User";
import Item from "../models/Item"
export default {
  render(user: User) {
    return{
      user_id: user.user_id,
      name: user.name,
      city: user.city,
      uf: user.uf,
      whatsapp: user.whatsapp,
      avatar: user.avatar,
    };
  },

}