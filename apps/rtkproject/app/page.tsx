import Image from 'next/image';
import styles from './page.module.css';
import StaticTable from './src/components/table/static/StaticTable';
import CloneElement from './src/components/CloneElement';
import DataFlowPage from './src/components/table/tanstack/table1';
import SaaSPage from './src/components/table/tanstack/table2';

export default function Home() {
  return (
    <>
      {/* <div>This is the content area </div> */}
      {/* <div>HELLO WORLD!</div> */}
      {/* <StaticTable /> */}
      {/* <CloneElement /> */}
      {/* <DataFlowPage /> */}
      <SaaSPage />
    </>
  );
}
