import React from 'react'
import propTypes from 'prop-types'

// Grid Sizing
const sizeChart = [
  '100%',
  '100%',
  '50%',
  '33%',
  '25%',
  '20%'
]

const getSize = columns => columns === undefined 
  ? columns > 5 
    ? columns[5] 
    : sizeChart[columns] 
  : sizeChart[0]

// Grid Styling
const styles = {
  grid (props) {
    return {
      display: 'flex',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap'
    }
  },
  item (props) {
    return {
      width: getSize(props.columns)
    }
  }
}

// Grid Component
class Grid extends React.Component {
  static propTypes = {
    list: propTypes.array,
    columns: propTypes.number
  }

  state = {
    hightlighted: undefined
  }

  render () {
    const { }

    return (
      <div className="arui-grid" style={{}}>
        {

        }
      </div>
    )
  }
}