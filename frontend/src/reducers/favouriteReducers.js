import { FAVOURITE_ADD_ITEM, FAVOURITE_REMOVE_ITEM } from "../constants/favouriteConstants";

export const favouriteReducer = (state = { favouriteItems: [] }, action) => {
  switch ((action.type)) {
    case FAVOURITE_ADD_ITEM:
      const item = action.payload;
      const existsItem = state.favouriteItems.find(
        (x) => x.product === item.product
      );

      if (existsItem) {
        return {
          ...state,
          favouriteItems: state.favouriteItems.map((x) =>
            x.product === existsItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          favouriteItems: [...state.favouriteItems, item],
        };
      }
    case FAVOURITE_REMOVE_ITEM:
      return {
        ...state,
        favouriteItems:state.favouriteItems.filter(x => x.product !== action.payload)
      }
    default:
      return state;
  }
};
