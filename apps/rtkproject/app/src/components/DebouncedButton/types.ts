import { Button } from '../Button';

export interface DebouncedButtonProps extends React.ComponentProps<typeof Button> {
  timer?: number;
}
