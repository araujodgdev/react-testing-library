import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App', () => {
  const favoriteLinkName = 'Favorite Pokémon';
  const aboutLinkName = 'About';
  const homeLinkName = 'Home';

  it('Contém um conjunto fixo de links de navegação no topo da aplicação', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: homeLinkName });
    const aboutLink = screen.getByRole('link', { name: aboutLinkName });
    const favoriteLink = screen.getByRole('link', { name: favoriteLinkName });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Redireciona para a página inicial, na URL /, ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: favoriteLinkName });

    userEvent.click(favoriteLink);

    const favoriteTitle = screen.getByRole('heading', { level: 2, name: favoriteLinkName });
    const homeLink = screen.getByRole('link', { name: homeLinkName });
    expect(favoriteTitle).toBeInTheDocument();

    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Redireciona para a página About Pokédex, na URL /about, ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: aboutLinkName });

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Redireciona para a página de Favorite Pokémon, na URL /favorites, ao clicar no link Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: favoriteLinkName });

    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Redireciona para a página Not Found, ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/unknown-url');
    });

    const notFoundTitle = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });

    expect(notFoundTitle).toBeInTheDocument();
  });
});
