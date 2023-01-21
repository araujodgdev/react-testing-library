import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';


describe('Testa o componente NotFound', () => {
  it('Renderiza um título com o texto correto da página', () => {
    const notFoundWarning = 'Page requested not found';
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/unknown-page');
    });

    const notFoundTitle = screen.getByRole('heading', { level: 2, name: notFoundWarning });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Renderiza a imagem correta na página', () => {
    const IMG_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = 'Pikachu crying because the page requested was not found';

    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/unknown-page');
    });

    const notFoundImg = screen.getByAltText(altText);
    expect(notFoundImg.src).toBe(IMG_URL);
  });
});
