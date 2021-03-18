function MenuList() {
  const menuList = [
    {
      'id': 1,
      'name': '게시판'
    }
  ];

  return (
    <ul>
      {menuList.map(item => (
        <MenuItem menu={item} key={item.menuId}/>
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