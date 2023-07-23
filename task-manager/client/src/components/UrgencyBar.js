const UrgencyBar = ({ urgency }) => {
  const renderedRectangles = () => {
    // rectangles from yellow to red, depending on urgency value [1 -> 5]
    const rectangleColors = ['#FFD700', '#FFBF00', '#FF8000', '#FF4000', '#FF0000']
    const rectangles = []

    for (let i = 1; i <= 5; i++) {
      let rectangleColor = i > urgency ? '#C0C0C0' : rectangleColors[i - 1]

      rectangles.push(
        <div
          key={i}
          style={{
            backgroundColor: rectangleColor,
            width: '20px',
            height: '20px',
            borderRadius: '10px',
            marginRight: '5px',
          }}
        />,
      )
    }
    return rectangles
  }

  return <div className="progress-bar">{renderedRectangles()}</div>
}

export default UrgencyBar
