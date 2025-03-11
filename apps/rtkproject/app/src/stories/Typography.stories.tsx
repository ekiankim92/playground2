import type { Meta, StoryObj } from '@storybook/react';
import {
  Body1,
  Body2,
  Body3,
  Caption1,
  Caption2,
  Caption3,
  Head1,
  Head2,
  Head3,
  Head4,
  Head5,
  Head6,
  ReportBody1,
  ReportHead1,
  ReportHead2,
} from '../components/common/Typography';

type Head1Type = typeof Head1;
type Head2Type = typeof Head2;

interface TypoType extends Head1Type, Head2Type {}

const meta: Meta = {
  title: 'Typography/Typography',
  argTypes: {
    fontWeight: {
      options: ['bold', 'normal', 'lighter'],
      control: { type: 'select' },
    },
    color: { control: { type: 'color' } },
    textDecoration: {
      control: { type: 'text' },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<TypoType>;

const Template: Story = {
  render: (args) => <div>{args.children}</div>,
};

export const Head1Story: Story = {
  ...Template,
  args: {
    fontWeight: 'bold',
    color: 'green',
    children: 'Head1 Example',
  },
  render: (args) => <Head1 {...args}>{args.children}</Head1>,
};

export const Head2Story: Story = {
  ...Template,
  args: {
    fontWeight: 'bold',
    color: '#000',
    children: 'Head2 Example',
  },
  render: (args) => <Head1 {...args}>{args.children}</Head1>,
};

export const Head3Story: Story = {
  ...Template,
  args: {
    fontWeight: 'lighter',
    color: '#000',
    children: 'Head3 Example',
  },
  render: (args) => <Head3 {...args}>{args.children}</Head3>,
};

export const Head4Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: 'orange',
    children: 'Head4 Example',
  },
  render: (args) => <Head4 {...args}>{args.children}</Head4>,
};

export const Head5Story: Story = {
  ...Template,
  args: {
    fontWeight: 'bold',
    color: 'purple',
    children: 'Head5 Example',
  },
  render: (args) => <Head5 {...args}>{args.children}</Head5>,
};

export const Head6Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: 'brown',
    children: 'Head6 Example',
  },
  render: (args) => <Head6 {...args}>{args.children}</Head6>,
};

export const Body1Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: '#000',
    children: 'Body1 Example',
  },
  render: (args) => <Body1 {...args}>{args.children}</Body1>,
};

export const Body2Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: '#000',
    children: 'Body2 Example',
  },
  render: (args) => <Body2 {...args}>{args.children}</Body2>,
};

export const Body3Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: '#000',
    children: 'Body3 Example',
  },
  render: (args) => <Body3 {...args}>{args.children}</Body3>,
};

export const Caption1Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: '#ffbc00',
    children: 'Caption1 Example',
  },
  render: (args) => <Caption1 {...args}>{args.children}</Caption1>,
};

export const Caption2Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: '#FFCC00',
    children: 'Caption1 Example',
  },
  render: (args) => <Caption2 {...args}>{args.children}</Caption2>,
};

export const Caption3Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: '#60584C',
    children: 'Caption1 Example',
  },
  render: (args) => <Caption3 {...args}>{args.children}</Caption3>,
};

export const ReportBody1Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: '#545045',
    children: 'ReportBody1 Example',
  },
  render: (args) => <ReportBody1 {...args}>{args.children}</ReportBody1>,
};

export const ReportHead1Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: '#8D744B',
    children: 'ReportHead1 Example',
  },
  render: (args) => <ReportHead1 {...args}>{args.children}</ReportHead1>,
};

export const ReportHead2Story: Story = {
  ...Template,
  args: {
    fontWeight: 'normal',
    color: '#84888B',
    children: 'ReportHead2 Example',
  },
  render: (args) => <ReportHead2 {...args}>{args.children}</ReportHead2>,
};
