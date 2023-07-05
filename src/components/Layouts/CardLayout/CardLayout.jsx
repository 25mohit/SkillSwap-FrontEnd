const CardLayout = props => {
  return (
    <div className={`${props?.type ==="profleInfo" ? 'card-layout-2' : 'card-layout'} 'flex-column'`}>{props.children}</div>
  )
}

export default CardLayout