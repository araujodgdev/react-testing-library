import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  // const mockedPikachu = pokemonList[0];
  // const {
  //   id,
  //   name,
  //   type,
  //   averageWeight: { value, measurementUnit },
  //   image,
  // } = mockedPikachu;
  const mewPath = '/pokemon/151';
  it('Renderiza as informações detalhadas do Pokémon', () => {
    const mewSummary = 'Apparently, it appears only to those people who are pure of heart and have a strong desire to see it.';

    const { history } = renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });

    act(() => {
      history.push(mewPath);
    });

    const pokemonDetailsTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Mew Details',
    });
    const pokemonSummaryTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const pokemonSummary = screen.getByText(mewSummary);

    expect(pokemonDetailsTitle).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
    expect(pokemonSummaryTitle).toBeInTheDocument();
    expect(moreDetailsLink).not.toBeInTheDocument();
  });

  it('Testa a seção contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(mewPath);
    });

    const locationSectionTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Mew',
    });
    const locationImages = screen.getAllByAltText('Mew location');
    const locationName = screen.getByText('Faraway Island');

    expect(locationImages.length).toBe(1);
    expect(locationImages[0].src).toBe(
      'https://archives.bulbagarden.net/media/upload/e/e4/Hoenn_Faraway_Island_Map.png',
    );
    expect(locationSectionTitle).toBeInTheDocument();
    expect(locationName).toBeInTheDocument();
  });

  it('Testa se é possível favoritar o Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push(mewPath);
    });

    const favoriteCheckbox = screen.getByRole('checkbox', { id: 'favorite' });
    const favoriteLabel = screen.getByText('Pokémon favoritado?');

    expect(favoriteCheckbox).toBeInTheDocument();
    expect(favoriteLabel).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);

    const favoriteStar = screen.getByRole('img', {
      name: /mew is marked as favorite/i,
    });
    expect(favoriteStar).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);

    expect(favoriteStar).not.toBeInTheDocument();
  });
});
