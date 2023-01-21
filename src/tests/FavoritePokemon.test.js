import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

const mockedMew = {
  id: 151,
  name: 'Mew',
  type: 'Psychic',
  averageWeight: {
    value: '4.0',
    measurementUnit: 'kg',
  },
  image: 'https://archives.bulbagarden.net/media/upload/4/43/Spr_5b_151.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Faraway Island',
      map: 'https://archives.bulbagarden.net/media/upload/e/e4/Hoenn_Faraway_Island_Map.png',
    },
  ],
  summary: 'Apparently, it appears only to those people who are pure of heart and have a strong desire to see it.',
};

describe('Testa o componente FavoritePokemon', () => {
  it('Renderiza um aviso, quando a lista de favoritos está vazia', () => {
    const warningText = 'No favorite Pokémon found';
    const pokemonList = [];
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    const warningElement = screen.getByText(warningText);
    expect(warningElement).toBeInTheDocument();
  });

  it('Renderiza na tela apenas os pokémon favoritados', () => {
    const pokemonList = [mockedMew];

    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    const pokemonName = screen.getByText('Mew');
    expect(pokemonName).toBeInTheDocument();
  });
});
