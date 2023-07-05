
const Toogler = ({ options, onChange, current }) => {
  return (
    <nav className='request-toogle flex'>
        {
            options?.map((option, index) => <span key={index} onClick={() => onChange(option?.value)} className={current === option?.value ? 'selected' : ''}>{option?.label}</span>)
        }
    </nav>
  )
}

export default Toogler