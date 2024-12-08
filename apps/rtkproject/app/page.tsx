import Image from 'next/image';
import styles from './page.module.css';
import StaticTable from './src/components/table/static/StaticTable';

export default function Home() {
  return (
    <>
      <div>This is the content area </div>
      <div>HELLO WORLD!</div>
      <StaticTable />
    </>
  );
}
