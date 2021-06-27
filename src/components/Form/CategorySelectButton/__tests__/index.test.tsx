import React from 'react';

import { fireEvent, render } from 'test-utils';

import { CategorySelectButton, CategorySelectButtonProps } from '..';
import { categorySelectButtonProps } from './mocks';

function renderCategorySelectButton(props: CategorySelectButtonProps) {
  const utils = render(<CategorySelectButton {...props} />);
  const textElement = utils.queryByText(categorySelectButtonProps.title);

  return {
    ...utils,
    textElement,
  };
}

describe('CategorySelectButton', () => {
  describe('the component is rendered', () => {
    it('contains a text', () => {
      const { textElement } = renderCategorySelectButton(categorySelectButtonProps);

      expect(textElement).toBeTruthy();
    });
  });

  describe('the component is pressed', () => {
    it('calls the onPress function', () => {
      const { textElement } = renderCategorySelectButton(categorySelectButtonProps);

      fireEvent.press(textElement);

      expect(categorySelectButtonProps.onPress).toHaveBeenCalled();
    });
  });
});
