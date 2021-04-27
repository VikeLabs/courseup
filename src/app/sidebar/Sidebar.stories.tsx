import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { SidebarContainer, SidebarContainerProps } from './containers/SidebarContainer';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

export default {
  title: 'Sidebar',
  component: SidebarContainer,
} as Meta;

const Template: Story<SidebarContainerProps> = (args) => <SidebarContainer {...args} />;

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/taMF1mrqs7jAS7myzk78mT/clockwork?node-id=0%3A1',
  },
};
