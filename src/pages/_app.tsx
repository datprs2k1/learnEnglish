import 'antd/dist/reset.css';
import '../../public/antd.min.css';
import '@/styles/globals.css';

import { AppPropsWithLayout } from '@/models';
import { EmptyLayout } from '@/layouts';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ? Component.Layout : EmptyLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
