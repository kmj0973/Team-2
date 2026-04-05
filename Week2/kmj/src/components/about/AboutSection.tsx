import Photo from '../../assets/Photo.jpg';
import Phone from '../../assets/Phone.svg';
import Email from '../../assets/Email.svg';
import Address from '../../assets/Address.svg';
import styles from './AboutSection.module.scss';
import { InfoCard } from './InfoCard';

const infoCardContents = [
  {
    title: 'EDUCATION',
    contents: ['한성대학교 컴퓨터공학부', '2020.03~2027.02(졸업예정)'],
  },
  {
    title: 'SKILLS',
    contents: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'WORK',
    contents: ['프론트엔드 개발자(예정)'],
  },
  {
    title: 'ACTIVITIES',
    contents: ['멋쟁이사자처럼 14기'],
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className={styles.aboutContainer}>
      <h1 className={styles.title}>ABOUT</h1>
      <div id="contact" className={styles.aboutContents}>
        <div className={styles.profileCard}>
          <img className={styles.myPhoto} src={Photo} alt="myPhoto" />
          <div className={styles.name}>고명준</div>
          <div className={styles.phone}>
            <img src={Phone} alt="phone" />
            <span>010-2434-0973</span>
          </div>
          <div className={styles.email}>
            <img src={Email} alt="email" />
            <span>a22950973@gmail.com</span>
          </div>
          <div className={styles.address}>
            <img src={Address} alt="address" />
            <span>경기도 의정부시 신곡동</span>
          </div>
        </div>
        {infoCardContents.map((content, index) => (
          <InfoCard
            key={index}
            title={content.title}
            contents={content.contents}
          />
        ))}
      </div>
    </section>
  );
};
