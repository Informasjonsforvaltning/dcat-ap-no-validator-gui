import React, { ComponentType } from 'react';
import { render, cleanup } from '@testing-library/react';

import * as renderers from './renderers';
import { flushPromises } from './utils';

import { Union } from '../../src/types';

interface StyleRule {
  property: string;
  value: string;
  options?: {
    media?: string;
    modifier?: string;
    supports?: string;
  };
}

type Renderer = Union<typeof renderers> | typeof render;

export const expectCorrectRootElement = async (
  Component: ComponentType,
  tagName: string,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  cleanup();

  await flushPromises();

  const { container } = renderer(<Component />, renderOptions);

  expect(container).not.toBeEmpty();
  expect(container.children).toHaveLength(1);
  expect(container.childNodes).toHaveLength(1);
  expect(container.firstElementChild!.tagName.toLowerCase()).toEqual(
    tagName.toLowerCase()
  );
};

export const expectNoRootElement = async (
  Component: ComponentType,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  cleanup();

  await flushPromises();

  const { container } = renderer(<Component />, renderOptions);

  expect(container).toBeEmpty();
  expect(container.children).toHaveLength(0);
  expect(container.childNodes).toHaveLength(0);
};

export const expectNoChildren = async (
  Component: ComponentType,
  hasRootElement: boolean = true,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  cleanup();

  await flushPromises();

  const { container } = renderer(<Component />, renderOptions);

  if (hasRootElement) {
    expect(container).not.toBeEmpty();
    expect(container.children).toHaveLength(1);
    expect(container.childNodes).toHaveLength(1);
    expect(container.firstElementChild).not.toBeNull();
    expect(container.firstElementChild).toBeEmpty();
    expect(container.firstElementChild!.children).toHaveLength(0);
    expect(container.firstElementChild!.childNodes).toHaveLength(0);
  } else {
    expect(container).toBeEmpty();
    expect(container.children).toHaveLength(0);
    expect(container.childNodes).toHaveLength(0);
  }
};

export const expectSingleTextChild = async (
  Component: ComponentType,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  cleanup();

  await flushPromises();

  const text = 'text child';

  const { container } = renderer(<Component>{text}</Component>, renderOptions);

  expect(container).not.toBeEmpty();
  expect(container.children).toHaveLength(1);
  expect(container.childNodes).toHaveLength(1);
  expect(container.firstElementChild).not.toBeNull();
  expect(container.firstElementChild).not.toBeEmpty();
  expect(container.firstElementChild!.children).toHaveLength(0);
  expect(container.firstElementChild!.childNodes).toHaveLength(1);
  expect(container.firstElementChild).toHaveTextContent(text);
};

export const expectSingleElementChild = async (
  Component: ComponentType,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  cleanup();

  await flushPromises();

  const childTestId = 'child';

  const { container, getByTestId } = renderer(
    <Component>
      <span data-testid={childTestId}>child</span>
    </Component>,
    renderOptions
  );

  expect(container).not.toBeEmpty();
  expect(container.children).toHaveLength(1);
  expect(container.childNodes).toHaveLength(1);
  expect(container.firstElementChild).not.toBeNull();
  expect(container.firstElementChild).not.toBeEmpty();
  expect(container.firstElementChild!.children).toHaveLength(1);
  expect(container.firstElementChild!.childNodes).toHaveLength(1);
  expect(getByTestId(childTestId)).not.toBeNull();
};

export const expectMultipleElementChildren = async (
  Component: ComponentType,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  cleanup();

  await flushPromises();

  const childTestId = 'child';

  const { container, getAllByTestId } = renderer(
    <Component>
      <span data-testid={childTestId}>child 1</span>
      <span data-testid={childTestId}>child 2</span>
    </Component>,
    renderOptions
  );

  expect(container).not.toBeEmpty();
  expect(container.children).toHaveLength(1);
  expect(container.childNodes).toHaveLength(1);
  expect(container.firstElementChild).not.toBeNull();
  expect(container.firstElementChild).not.toBeEmpty();
  expect(container.firstElementChild!.children).toHaveLength(2);
  expect(container.firstElementChild!.childNodes).toHaveLength(2);
  expect(getAllByTestId(childTestId)).toHaveLength(2);
};

export const expectTextAndElementChildren = async (
  Component: ComponentType,
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  cleanup();

  await flushPromises();

  const textBefore = 'text before';
  const textAfter = 'text after';
  const childTestId = 'child';

  const { container, getAllByTestId } = renderer(
    <Component>
      {textBefore}
      <span data-testid={childTestId}>child 1</span>
      <span data-testid={childTestId}>child 2</span>
      {textAfter}
    </Component>,
    renderOptions
  );

  expect(container).not.toBeEmpty();
  expect(container.children).toHaveLength(1);
  expect(container.childNodes).toHaveLength(1);
  expect(container.firstElementChild).not.toBeNull();
  expect(container.firstElementChild).not.toBeEmpty();
  expect(container.firstElementChild!.children).toHaveLength(2);
  expect(container.firstElementChild!.childNodes).toHaveLength(4);
  expect(container.firstElementChild!.firstChild!.textContent).toEqual(
    textBefore
  );
  expect(container.firstElementChild!.lastChild!.textContent).toEqual(
    textAfter
  );
  expect(getAllByTestId(childTestId)).toHaveLength(2);
};

export const expectStyleRules = async (
  Component: ComponentType,
  styleRules: StyleRule[],
  renderer: Renderer = render,
  renderOptions: Record<string, unknown> = {}
) => {
  cleanup();

  await flushPromises();

  const { container } = renderer(<Component />, renderOptions);

  styleRules.forEach(({ property, value, options }) =>
    (expect(container.firstElementChild) as any).toHaveStyleRule(
      property,
      value,
      options
    )
  );
};
