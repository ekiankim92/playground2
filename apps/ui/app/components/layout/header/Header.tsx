import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <FontAwesomeIcon icon={faBars} width={30} height={30} className={styles.menuIcon} />
      <div className={styles.title}>Header Title</div>
      <FontAwesomeIcon icon={faUser} width={30} height={30} className={styles.profileIcon} />
    </header>
  );
}
