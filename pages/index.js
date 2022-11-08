import { Layout } from 'antd';
import { useEffect, useState } from 'react';
const SuperAgent = require('superagent');
const prefix = require('superagent-prefix');
const { Sider, Header, Footer, Content } = Layout;

const headerStyles = {
  color: 'white',
};

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const fetcher = (url) => {
    SuperAgent.get(url)
      .use(prefix)
      .end((err, res) => {
        console.log(err);
        console.log(res.body);
        setData(res.body);
        console.log(data.products);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetcher('https://dummyjson.com/products');
    setLoading(false);
  }, []);
  return (
    <>
      <Layout style={{ minHeight: '100vh', maxHeight: '100vh' }}>
        <Sider>
          <h1 style={headerStyles}> Sider text</h1>
        </Sider>
        <Layout>
          <Header>
            <h1 style={headerStyles}>My Header</h1>
          </Header>
          <Content style={{ overflowY: 'scroll' }}>
            {isLoading ? (
              <p>Loading...</p>
            ) : data.products && !isLoading ? (
              data.products.map(
                ({
                  id,
                  title,
                  description,
                  price,
                  discountPercentage,
                  rating,
                  stock,
                  brand,
                  category,
                  thumbnail,
                  images,
                }) => {
                  return (
                    <div key={id} style={{ paddingLeft: '10px' }}>
                      <h1>{title}</h1>
                      <h1>
                        <strong>
                          ONLY FOR $
                          {price - Math.floor(price / discountPercentage)}
                        </strong>
                      </h1>
                      <p>{brand}<br/>${price}</p>
                      <p>
                        desc : <br /> {description}{' '}
                      </p>
                      <p>rating : {rating}<br/>stock : {stock}</p>
                      <i>category : {category}</i>
                      <hr />
                    </div>
                  );
                }
              )
            ) : null}
          </Content>
          <Footer>My footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
