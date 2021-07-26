import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SidebarContainer } from '../containers/SidebarContainer';

export default {
  title: 'Sidebar',
  component: SidebarContainer,
} as ComponentMeta<typeof SidebarContainer>;

const Template: ComponentStory<typeof SidebarContainer> = (args) => <SidebarContainer {...args} />;

export const Default = Template.bind({});

Default.args = {};
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/taMF1mrqs7jAS7myzk78mT/clockwork?node-id=0%3A1',
  },
};
