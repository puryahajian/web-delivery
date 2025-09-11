import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AvatarButton from './avatar-button';

describe('AvatarButton', () => {
  test('renders text label', () => {
    render(<AvatarButton text="عنوان" />);
    expect(screen.getByText('عنوان')).toBeInTheDocument();
  });

  test('renders icon when check is false', () => {
    render(<AvatarButton icon="★" check={false} />);
    expect(screen.getByText('★')).toBeInTheDocument();
  });

  test('renders background image when check is true', () => {
    const imageUrl = 'https://example.com/image.png';
    render(<AvatarButton check={true} image={imageUrl} />);
    const clickable = screen.getByRole('button');
    // Ensure the inner div with background image exists via style assertion
    const innerWithBg = clickable.querySelector('div');
    expect(innerWithBg).toBeInTheDocument();
    expect(innerWithBg).toHaveStyle(`background-image: url(${imageUrl})`);
  });

  test('calls onTap when clicked', () => {
    const onTap = jest.fn();
    render(<AvatarButton onTap={onTap} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onTap).toHaveBeenCalledTimes(1);
  });

  test('applies sizing and visual styles', () => {
    render(
      <AvatarButton
        width="120px"
        height="60px"
        padding={12}
        border="2px solid red"
        borderRadius={10}
        color="#eee"
      />
    );
    const clickable = screen.getByRole('button');
    expect(clickable).toHaveStyle({ width: '120px' });
    expect(clickable).toHaveStyle({ height: '60px' });
    expect(clickable).toHaveStyle({ padding: '12px' });
    expect(clickable).toHaveStyle({ border: '2px solid red' });
    expect(clickable).toHaveStyle({ borderRadius: '10px' });
    expect(clickable).toHaveStyle({ backgroundColor: '#eee' });
  });
});


