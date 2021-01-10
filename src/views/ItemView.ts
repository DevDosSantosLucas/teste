import Item from "../models/Item";
import imagesView from "./ImagesView";
import userView from "./UserView";

export default {
  render(item: Item) {
    return{
      item_id: item.item_id,
      name_item: item.name_item,
      price: item.price,
      description: item.description,
      category: item.category,
      user: item.user_id,   // precisa mostrar todas ifos do user
    //   user_id: userView.renderMany(item.user_id),
      images: imagesView.renderMany(item.images)
    };
  },
  
  renderMany(items: Item[]) {
    return items.map(item => this.render(item));
  }
}
