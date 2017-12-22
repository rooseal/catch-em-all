import React from 'react';
import ReactDOM from 'react-dom';

export class CatchEmAll extends React.Component {
    render() {
        return (
            <div className='container'>
                <h1>Collect all pokemons</h1>
            </div>
        )
    }
}

ReactDOM.render(document.getElementById('reactApp'), CatchEmAll);