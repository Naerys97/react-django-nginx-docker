import { Container, Header, Content } from 'rsuite';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Layout from './components/Layout';

function App() {

  return (
    <Container>
      <Header>
        <NavBar />
      </Header>
      <Content>
        <Layout>
          <Outlet />
        </Layout>
      </Content>
      {/* <Footer>Footer</Footer> */}
    </Container>
  );
}

export default App;
