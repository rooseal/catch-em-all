import React from 'react'

export default props => {
  const { stats } = props

  return (
    <div className="stats">
      <h3>Stats</h3>
      {
        Object.keys(stats).map(stat => {
          const statValue = stats[stat]
          return (
            <div key={stat} className="flex-grid">
              <div className="stat" style={{flexGrow: 0.5}}>{stat}</div>
              <div>
                <div className="stat-bar" style={{width: (statValue / 180 * 100 + '%')}}></div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
