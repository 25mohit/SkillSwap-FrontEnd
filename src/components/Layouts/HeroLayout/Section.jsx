const Section = props => {
  return (
    <section className="home-section flex-column" id={props.id}>
        {props?.children}
    </section>
  )
}

export default Section