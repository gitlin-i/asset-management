import type { Meta, StoryObj } from '@storybook/react';

import Card  from '../component/Card';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Card> = {
  title: 'Assets/Card2',
  component: Card,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const NoneProp: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args

};

export const OneChildren : Story = {
  args : {
    color : "yellow",
  },
  render: (args) => (
    <Card {...args}>
      <p>hi</p>
    </Card>
  ),

}

export const Title : Story = {
  render: () => (
    <Card title='안녕하세요.'>

    </Card>
  ),

}

export const example : Story = {
  render: () => (
    <Card title='적절한 예시'>
      <p> 안녕하세요. </p>

    </Card>
  )
}

