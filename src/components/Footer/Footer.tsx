import React from 'react';
import { TabBar } from 'antd-mobile';

const Item = TabBar.Item;

const Footer = ({ list, path, history }) => {
  const linkTo = (msg) => history.push(msg);
  const bottomList = list.filter((item) => !item.hide);
  return (
    <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
      <TabBar tabBarPosition="bottom">
        {
          bottomList.map((item) => {
            return (
              <Item
                key={item.path}
                title={item.title}
                icon={{ uri: require(`./img/${item.icon}.svg`) }}
                selectedIcon={{ uri: require(`./img/${item.icon}-active.svg`) }}
                selected={path === item.path}
                onPress={() => linkTo(item.path)}
              >
              </Item>
            );
          })
        }
      </TabBar>
    </div>
  );
};

export default Footer;