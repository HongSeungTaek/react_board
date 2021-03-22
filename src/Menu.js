import Const from './Const';

function MenuList() {
  let menuList = [];
  menuList = Const.MENU_LIST;

  return (
    <ul>
      {menuList.map(item => (
        <MenuItem menu={item} key={item.id}/>
      ))}
    </ul>
  );
}

function MenuItem({menu}) {
  return (
      <li>{menu.name}</li>
  );
}

export default MenuList;