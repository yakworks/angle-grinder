import Button from '../Button.svelte';
import { render, cleanup } from '@testing-library/svelte';

const renderButton = (text, props) => {
  const { container } = render(<Button {...props}>{text}</Button>);
    // render(Button, { props });
  return container;
};

beforeEach(cleanup);

describe('Button', () => {
  test('should render text and default color', () => {
    const container = renderButton("FOO", { children: 'Hello' });
    const button = container.querySelector('.button');
    expect(button.innerHTML).toContain('FOO');
    expect(button.className).toBe('button');
  });

});
