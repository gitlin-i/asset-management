import type { Meta, StoryObj } from '@storybook/react';

import Card2  from '../component/Card2';
import Test from '../component/Test';
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Card2> = {
  title: 'Assets/Card2',
  component: Card2,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof Card2>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const NoneProp: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args

};

export const OneChildren : Story = {
  args : {
    color : "yellow",
  },
  render: (args) => (
    <Card2 {...args}>
      <p>hi</p>
    </Card2>
  ),

}

export const Title : Story = {
  render: () => (
    <Card2 title='안녕하세요.'>

    </Card2>
  ),

}

export const example : Story = {
  render: () => (
    <Card2 title='적절한 예시'>
      <p> 안녕하세요. </p>

    </Card2>
  )
}

