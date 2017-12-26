import React from 'react';
import ReactDOM from 'react-dom';

import * as pokemonService from './pokemon-service';

import '../scss/main.scss';

export class CatchEmAll extends React.Component {

    pokeData;

    constructor(props) {
        super(props);

        this.state = {
            team: []
        }

        this.pokeData = pokemonService.getPokemonData();
    }

    componentDidMount() {
        this.setState({
            team: pokemonService.getPokemonTeam()
        });
    }

    renderPokemon(pokemon) {
        let basePokemon = this.pokeData[pokemon.name];

        console.log(basePokemon);

        return <p key={pokemon.name + pokemon.id} className={'pokemon-list-entry ' + basePokemon.type[0]}>{pokemon.name}<span>{pokemon.level}</span></p>
    }

    render() {
        return (
            <div className='app-container'>
                <h1>Collect all pokemons</h1>
                <h2>List of your pokemons</h2>
                <div className='pokemon-container'>
                    { 
                        this.state.team.map(pokemon => this.renderPokemon(pokemon))
                    }
                </div>
                <button>get random pokemon</button>
                <button>release a pokemon</button>
                <button>go to battle map</button>
            </div>
        )
    }
}

ReactDOM.render(
    <CatchEmAll />,
    document.getElementById('reactApp')
);

if(module.hot) {
    module.hot.accept();
}
