import styles from './sidebar.module.css';

export default function Sidebar() {
  const nav = ['Option1', 'Option2', 'Option3'];

  return (
    <section className={styles.section}>
      {nav.map((el, index) => (
        <div key={index} className={styles.menus}>
          {el}
        </div>
      ))}
    </section>
  );
}
