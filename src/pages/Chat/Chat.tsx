import React, { useState, Fragment, useEffect } from 'react';
import {
  List,
  InputItem,
  NavBar,
  Icon
} from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import { getChatId } from '../../lib/utils';
import { socket } from '../../lib/socket';

const Chat = ({ history, match, dispatch, users, msgList, userId }) => {
  const [content, setContent] = useState('');
  const targetUserId = match.params['_id'];
  const Item = List.Item;
  const chatId = getChatId(targetUserId, userId);
  const currentChatMsg = msgList.filter((msg) => msg.chatId === chatId);
  const handleSubmit = () => {
    socket.emit('sendMsg', { from: userId, to: targetUserId, content }, function (res) {
      console.log('sdf', res);
    });
    setContent('');
  };
  const [once, setOnce] = useState(false);
  useEffect(() => {
    const isObjNull = !!Object.keys(users).length;
    if (userId && !once && !isObjNull) {
      setOnce(true);
      dispatch({ type: 'chat/getMsgList'});
      socket.removeAllListeners();
      socket.on('receiveMsg', function (msg) {
        dispatch({ type: 'chat/SET_RECEIVE_MSG', payload: { msg, userId }});
      });
    }
  }, [dispatch, userId, once, users]);
  if (!users[targetUserId]) {
    return null;
  }
  return (
    <Fragment>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        {users[targetUserId].username || ''}
      </NavBar>
      <QueueAnim
        delay={100}
        type="bottom"
      >
        {
          currentChatMsg.map((msg) => {
            const avatar = require(`../../img/${users[msg.from].avatar}.png`);
            return msg.from === userId ?
              <List
                key={msg['_id']}
              >
                <Item thumb={avatar}>{msg.content}</Item>
              </List> :
              <List
                key={msg['_id']}
              >
                <Item
                  extra={<img alt="avatar" src={avatar} />}
                >
                  {msg.content}
                </Item>
              </List>;
          })
        }
      </QueueAnim>
      <div
        style={{ position: 'fixed', bottom: 0, width: '100%' }}
      >
        <List>
          <InputItem
            value={content}
            onChange={(val) => setContent(val)}
            extra={
              <Fragment>
                <span
                  onClick={() => handleSubmit()}
                >
                  发送
                </span>
              </Fragment>
            }
            placeholder="请输入聊天内容"
          >
          </InputItem>
        </List>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.chat.users,
    msgList: state.chat.msgList,
    userId: state.user['_id']
  };
};

export default connect(mapStateToProps)(Chat);