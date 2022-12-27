import { IconBookmarks, IconShoppingCart, IconHome, IconPower } from '@tabler/icons';

export const NAVLINK_DATA = [
    { icon: <IconHome size={18} />, color: 'blue', label: 'Home',to:"/" },
    { icon: <IconShoppingCart size={18} />, color: 'teal', label: 'Cart',to:'/cart' },
    { icon: <IconBookmarks size={18} />, color: 'violet', label: 'My Orders',to:'/my-orders' },
  ];

export const DISHES_CATEGORY = [
    {label:"All",value:"all"},
    {label:"Punjabi",value:"punjabi"},
    {label:"Thali",value:"thali"},
    {label:"Comfort Food",value:"comfort food"},
    {label:"Chinese",value:"chinese"},
]

export const CART_CONTEXT_ACTIONS = {
  ADD_TO_CART:'ADD_TO_CART',
  REMOVE_FROM_CART:'REMOVE_FROM_CART',
  MANIPULATE_QTY:'MANIPULATE_QTY',
  DELETE_CART:'DELETE_CART',
}