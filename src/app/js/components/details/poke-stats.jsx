import React from 'react'

const PokeStats = props => {
  const { stats } = props

  return (
    <div className="stats">
      <h3>Stats</h3>
      {
        Object.keys(stats.base).map(stat => {
          const statValue = stats.base[stat] + stats.ivs[stat] + stats.evs[stat]
          const barWidth = statValue / 200 * 100

          return (
            <div key={stat} className="flex-grid">
              <div className="stat" style={{flexGrow: 0.5}}>{stat}</div>
              <div>
                <div className="stat-bar" style={{width: barWidth + '%', backgroundColor: barWidth >= 70 ? 'green' : barWidth >= 40 ? 'orange' : 'red'}}></div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PokeStats
