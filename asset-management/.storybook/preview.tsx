import type { Preview } from "@storybook/react";
import React from "react";
import { RecoilRoot } from 'recoil';
const preview: Preview = {
  decorators :[
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    )
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
