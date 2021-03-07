import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import { Sidebar, SidebarProps } from './Sidebar';

export default {
  title: 'Sidebar',
  component: Sidebar,
} as Meta;

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  pid: '',
  subjects: [],
  courses: [],
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/taMF1mrqs7jAS7myzk78mT/clockwork?node-id=0%3A1',
  },
};
