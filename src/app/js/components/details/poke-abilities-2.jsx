import React from 'react'

export default props => {
  const { abilities } = props

  return (
    <div className="abilities">
      <h3>Abilities</h3>
      {
        abilities.map(ability => (
          <div key={ability.name} className="flex-grid">
            <div className="ability">{ability.name}</div>
            <div>
              <div className={`${ability.type.toLowerCase()}-text`}>{ability.type}</div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
