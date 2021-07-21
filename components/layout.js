import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import Showcase from './showcase';
import styles from '@/styles/layout.module.css';

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <Header />

      {router.pathname === '/' && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'DJ Events | Find the hottest parties',
  keywords: 'music, dj, edm, events',
  description: 'Find the latest DJ and other musical events',
};
