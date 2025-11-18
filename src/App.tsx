import { Outlet } from 'react-router-dom';
import Menu from './shared/menu';
import Footer from './shared/footer';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { store } from './store/store';

const { Content } = Layout;

const App = () => {
  return (
    <Provider store={store}>
      <Layout style={{ minHeight: '100vh' }}>
        <Menu />
        <Content style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <main>
            <Outlet />
          </main>
        </Content>
        <Footer />
      </Layout>
    </Provider>
  );
};

export default App;
