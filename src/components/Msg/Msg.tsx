import React from 'react';
import { connect } from 'dva';
import { List, Badge } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

const Item = List.Item;
const Brief = Item.Brief;

const Msg = ({ msgList, userId, users, history }) => {
  if (!msgList.length) {
    return null;
  }
  const msgGroup = {};
  msgList.map((msg) => {
    msgGroup[msg.chatId] = msgGroup[msg.chatId] || [];
    msgGroup[msg.chatId].push(msg);
    return null;
  });
  const chatList: any[] = Object.values(msgGroup);
  const chatSortedList = chatList.sort((prev, next) => next[next.length - 1].createTime - prev[prev.length - 1].createTime);
  return (
    <QueueAnim>
      {
        chatSortedList.map((chat) => {
          const lastChat = chat[chat.length - 1];
          const targetId = lastChat.from === userId ?
            lastChat.to :
            lastChat.from;
          const unreadNum = chat.filter((item) => !item.read && (item.to === userId)).length;
          return (
            <List
              key={lastChat._id}
            >
              <Item
                extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`../../img/${users[targetId].avatar}.png`)}
                arrow="horizontal"
                onClick={() => history.push(`/chat/${targetId}`)}
              >
                {lastChat.content}
              </Item>
              <Brief>{users[targetId].name}</Brief>
            </List>
          );
        })
      }
    </QueueAnim>
  );
};

const mapStateToProps = (state) => {
  return {
    msgList: state.chat.msgList,
    userId: state.user['_id'],
    users: state.chat.users
  };
};

export default connect(mapStateToProps)(Msg);