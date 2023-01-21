import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('Testa o componente Pokédex', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const encounteredEl = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });

    expect(encounteredEl).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });

    pokemonList.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();

      userEvent.click(nextPokemonBtn);
    });
  });

  it('Testa se a pokédex tem os botões de filtro', () => {
    const pokemonType = ['Fire', 'Electric', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    renderWithRouter(<App />);

    pokemonType.forEach((type) => {
      const filterBtn = screen.getAllByTestId('pokemon-type-button').filter((btn) => btn.innerHTML === type);
      expect(filterBtn[0]).toBeInTheDocument();
      expect(filterBtn[0].innerHTML).toBe(type);

      userEvent.click(filterBtn[0]);
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(type);
    });
    const filterAllBtn = screen.getByRole('button', { name: 'All' });
    expect(filterAllBtn).toBeInTheDocument();
  });

  it('Testa se é possível clicar no botão All', () => {
    renderWithRouter(<App />);

    const filterAllBtn = screen.getByRole('button', { name: 'All' });
    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(nextPokemonBtn).toBeInTheDocument();
    expect(filterAllBtn).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);

    userEvent.click(filterAllBtn);

    const displayingPokemon = screen.getByText('Pikachu');
    expect(displayingPokemon).toBeInTheDocument();
  });
});
