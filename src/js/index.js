import React from 'react';
import ReactDOM from 'react-dom';

export class CatchEmAll extends React.Component {
    render() {
        return (
            <div className='app-container'>
                <h1>Collect all pokemons</h1>
                <h2>List of your pokemons</h2>
                <div className='pokemon-container'>
                    <p className="pokemon-list-entry">Chamander<span>5</span></p>
                    <p className="pokemon-list-entry">Pidgey<span>3</span></p>
                </div>
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
