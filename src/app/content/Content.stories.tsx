import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Content, ContentProps } from './Content';

export default {
  title: 'Content',
  component: Content,
} as Meta;

const Template: Story<ContentProps> = (args) => <Content {...args} />;

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/taMF1mrqs7jAS7myzk78mT/clockwork?node-id=0%3A1',
  },
}
