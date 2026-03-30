import { Header } from '../../components/header/Header';
import { AboutSection } from '../../components/about/AboutSection';
import { HobbySection } from '../../components/hobby/HobbySection';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.intro}>
          <p>
            안녕하세요!
            <br />제 이름은 고명준입니다.
            <br />
            끊임없이 성장하며
            <br />
            소통하는 개발자가 되고 싶습니다.
          </p>
        </div>
        <div className={styles.section}>
          <AboutSection />
          <HobbySection />
        </div>
      </main>
    </>
  );
};
