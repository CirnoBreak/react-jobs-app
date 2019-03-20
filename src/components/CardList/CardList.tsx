import React from 'react';
import { WhiteSpace, Card } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';

const { Header, Body, Footer } = Card;

const CardList = ({ list }) => {
  return (
    <>
      <QueueAnim>
        {
          list.map((item) =>
            (
              <div key={item._id}>
                <WhiteSpace />
                <Card>
                  <Header
                    title={item.position}
                    thumb={item.avatar && require(`../../img/${item.avatar}.png`)}
                    extra={item.money}
                  />
                  <Body>
                    {item.type === 'applicant' ? '技能: ' : '岗位描述: '} {item.desc}
                  </Body>
                  <Footer
                    content={<p>{!!item.company && item.company} {item.user}</p>}
                  />
                </Card>
              </div>
            )
          )
        }
      </QueueAnim>
    </>
  );
};

export default CardList;