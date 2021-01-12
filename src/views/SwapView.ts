import Swap from "../models/Swap";

export default {
  render(swap: Swap) {
    return{
      swap_id: swap.swap_id,
      item_id: swap.item_id,
      targed_item_id:  swap.targed_item_id
    };
  },
}