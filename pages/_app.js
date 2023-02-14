//Next.JS가 최초 실행 될 때 _app.js 먼저 확인

import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
