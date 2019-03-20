import React, { Fragment } from 'react';
import { WhiteSpace, Card } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

const { Header, Body, Footer } = Card;

const CardList = ({ list }) => {
  return (
    <Fragment>
      <QueueAnim>
        {
          list.map((item) =>
            (
              <div key={item._id}>
                <WhiteSpace />
                <Card
                  onClick={() => console.log('sdf')}
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

export default CardList;