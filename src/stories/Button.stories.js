import { fn } from '@storybook/test';

import './button.css';

const baseStyles = `
  text-white
`;

const Button = ({label, className}) => {
  return (<button onClick={() => {}} className={className}>
      <span>{label}</span>
    </button>)
}

export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
};

export const PrimaryAction = {
  args: {
    label: 'Publish',
    className: `${baseStyles} bg-[#f87341] rounded-full text-xl uppercase px-14 py-3.5`
  },
};

export const SecondaryAction = {
  args: {
    label: 'Generate',
    className: `${baseStyles} bg-blue-600 rounded-lg font-medium text-sm px-5 p-1.5`
  },
};

export const LoadMore = {
  args: {
    label: 'Load More',
    className: `${baseStyles} bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg font-medium text-sm px-5 py-2.5`
  },
};