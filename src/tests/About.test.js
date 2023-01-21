import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente About', () => {
  it('Renderiza um título h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const titleElement = screen.getByRole('heading', { name: /about pokédex/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('Renderiza dois parágrafos com as informações sobre a pokédex', () => {
    const pokedexParagraph1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon';
    const pokedexParagraph2 = 'One can filter Pokémon by type, and see more details for each one of them';

    renderWithRouter(<About />);

    const descriptionElement1 = screen.getByText(pokedexParagraph1);
    const descriptionElement2 = screen.getByText(pokedexParagraph2);
    expect(descriptionElement1).toBeInTheDocument();
    expect(descriptionElement2).toBeInTheDocument();
  });

  it('Renderiza a imagem correta de uma Pokédex', () => {
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    renderWithRouter(<About />);

    const pokedexImg = screen.getByAltText('Pokédex');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toBe(imgURL);
  });
});
