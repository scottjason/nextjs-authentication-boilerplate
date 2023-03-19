import * as React from 'react';

interface Props {
  copy: string;
  color: string;
}

export const SubHeader = ({ copy, color }: Props): JSX.Element => {
  return <h2 className={`${color} text-xl tracking-wider mb-1.5`}>{copy}</h2>;
};
