import React from 'react';
import ReactDOM from 'react-dom';

export class CatchEmAll extends React.Component {
    render() {
        return (
            <div className='container'>
                <h1>Collect all pokemons</h1>
                <h2>List of your pokemons</h2>
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
