import React from 'react';

import { fireEvent, render } from 'test-utils';

import { Button, ButtonProps } from '..';
import { buttonMock } from './mocks';

function renderButton(props: ButtonProps) {
  const utils = render(<Button {...props} />);
  const textElement = utils.queryByText(props.title);

  return {
    ...utils,
    textElement,
  };
}

describe('Button', () => {
  describe('the component is rendered', () => {
    it('contains a button text', () => {
      const { textElement } = renderButton(buttonMock);

      expect(textElement).toBeTruthy();
    });
  });

  describe('the component is pressed', () => {
    it('calls the onPress function', () => {
      const { textElement } = renderButton(buttonMock);

      fireEvent.press(textElement);

      expect(buttonMock.onPress).toHaveBeenCalled();
    });
  });
});
