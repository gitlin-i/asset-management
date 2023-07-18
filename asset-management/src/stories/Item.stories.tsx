import type { Meta, StoryObj } from '@storybook/react';

import Item  from '../component/Item';
import styled from 'styled-components';
import { MyStock } from '../domain/stock';
import { Currency } from '../domain/Domain';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Item> = {
  title: 'Assets/Item',
  component: Item,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<typeof Item>;

const StyledUl = styled.ul`
  background-color:yellow;
  padding : 0;
  margin : 0;
`

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const addImage: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args:{
      image: process.env.PUBLIC_URL + '/JohnCliftonBogle.webp',
      leftdownText : 22,
      leftupText: "비욘드 미트",
      rightUpText : 10.63,
      
    },
    render: (args) => (
        <StyledUl>
          <Item image={args.image} 
          leftupText={args.leftupText}
          leftdownText={args.leftdownText}
          rightUpText={args.rightUpText}></Item>
        </StyledUl>
    ),

};
export const NoneImage: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    ...addImage.args,
  },
    render: (args) => (
        <StyledUl>
          <Item 
          leftupText={args.leftupText}
          leftdownText={args.leftdownText}
          rightUpText={args.rightUpText}></Item>
        </StyledUl>
    )
};
