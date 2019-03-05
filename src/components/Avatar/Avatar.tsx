import React, { useState } from 'react';
import {
  Grid,
  List
} from 'antd-mobile';

const Avatar = ({ changeAvatar }) => {
  const avatarStr = 'default,spider,hero,athlete,businessman,ninja,alien,smiley,pizza,football,hamburger,cat,cake,doge,horse';
  const avatarList = avatarStr
    .split(',')
    .map((v) => ({
      icon: require(`../../img/${v}.png`),
      text: v
    }));
  const [icon, setIcon] = useState('');
  const isSelectAvatar = () => (
    <div>
      <span>已经选择的头像 </span>
      <img
        style={{ width: 20 }}
        src={icon}
      />
    </div>
  );
  const notSelectAvatar = () => (
    <div>请选择头像</div>
  );

  const avatarHeader = icon ?
    isSelectAvatar :
    notSelectAvatar;
  const iconStyle = {
    marginTop: '50%',
    transform: 'translateY(-50%)'
  };
  return (
    <>
      <List renderHeader={avatarHeader()} />
      <Grid
        data={avatarList}
        columnNum={5}
        renderItem={(dataItem) =>
          <img style={iconStyle} src={dataItem.icon} />
        }
        onClick={(e) => {
          setIcon(e.icon);
          changeAvatar(e.text);
        }}
      />
    </>
  );
};

export default Avatar;