import css from 'styled-jsx/css';

const Dropdown = () => {
  const options = [
    { key: 'A', name: 'A' },
    { key: 'B', name: 'B' },
    { key: 'C', name: 'C' },
    { key: 'D', name: 'D' },
  ];

  return (
    <div>
      <div>Dropdown</div>
    </div>
  );
};

export { Dropdown };

const Wrapper = css`
  width: 240px;
  height: 120px;
`;
