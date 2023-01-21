import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import { Pokemon } from '../components';

describe('Testa o componente Pokemon', () => {
  const mockedPikachu = pokemonList[0];
  const {
    id,
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = mockedPikachu;
  it('Renderiza um card com as informações de determiando Pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ mockedPikachu } isFavorite />);

    const pokemonName = screen.getByText(name);
    const pokemonType = screen.getByText(type);
    const pokemonAverageWeight = screen.getByText(
      `Average weight: ${value} ${measurementUnit}`,
    );
    const pokemonImage = screen.getByAltText(`${name} sprite`);
    const favoriteImage = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteImage.src).toContain('/star-icon.svg');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonAverageWeight).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe(image);
  });

  it('Testa se renderiza corretamente o link no componente', () => {
    renderWithRouter(
      <Pokemon pokemon={ mockedPikachu } isFavorite />,
    );

    const linkToDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkToDetails).toBeInTheDocument();
    expect(linkToDetails.href).toContain(`/pokemon/${id}`);
  });

  it('Testa o funcionamento do link', () => {
    const { history } = renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkToDetails).toBeInTheDocument();
    expect(linkToDetails.href).toContain(`/pokemon/${id}`);

    userEvent.click(linkToDetails);

    const { pathname } = history.location;
    const detailsTitle = screen.getByRole('heading', { level: 2, name: `${name} Details` });

    expect(pathname).toBe(`/pokemon/${id}`);
    expect(detailsTitle).toBeInTheDocument();
  });
});
