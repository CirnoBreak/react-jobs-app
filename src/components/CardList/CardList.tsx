import React, { Fragment } from 'react';
import { WhiteSpace, Card } from 'antd-mobile';
import { withRouter } from 'dva/router';
import QueueAnim from 'rc-queue-anim';

const { Header, Body, Footer } = Card;

const CardList = (props) => {
  const { list, history } = props;
  return (
    <Fragment>
      <QueueAnim>
        {
          list.map((item) =>
            (
              <div key={item._id}>
                <WhiteSpace />
                <Card
                  onClick={() => history.push(`/chat/${item._id}`)}
                >
                  <Header
                    title={item.position}
                    thumb={item.avatar && require(`../../img/${item.avatar}.png`)}
                    extra={item.money}
                  />
                  <Body>
                    {item.type === 'applicant' ? '技能: ' : '岗位描述: '} {item.desc}
                  </Body>
                  <Footer
                    content={<p>{!!item.company && item.company} {item.username}</p>}
                  />
                </Card>
              </div>
            )
          )
        }
      </QueueAnim>
    </Fragment>
  );
};

export default withRouter(CardList);