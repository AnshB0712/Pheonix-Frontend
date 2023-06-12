import { IconBookmarks, IconShoppingCart, IconHome, IconPower } from '@tabler/icons';

export const NAVLINK_DATA = [
    { icon: <IconHome size={26} color='#aaadb3' />, label: 'Home',to:"/" },
    { icon: <IconShoppingCart size={26} color='#aaadb3' />, label: 'Cart',to:'/cart' },
    { icon: <IconBookmarks size={26} color='#aaadb3'  />,label: 'My Orders',to:'/my-orders' },
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
  SET_CART:'SET_CART',
}

export const ORDER_STATUS_FF = {
  'SXS': 'Success',
  'FLD': 'Failed',
  'PNDG': 'Pending'
}

export const ORDER_STATUS_COLOR = {
  'SXS': 'green',
  'FLD': 'red',
  'PNDG': 'yellow'
}

export const ORDER_STATUS_TINTS = {
  'SXS': 'rgba(0, 208, 132,.1)',
  'FLD': 'rgba(244, 67, 54,.1)',
  'PNDG': 'rgba(245, 240, 97,.1)'
}

