import { TermsJSONData } from "./TermsJSON"

const TermsAndConditions = () => {
  return (
    <div className='terms flex-column'>
        <header>
            <h1 className="main-heading-text">Terms & Conditions - SkillSwap</h1>
        </header>
        {
            TermsJSONData?.map((data, index) => 
                <section className="flex-column">
                    <h2>{index + 1}. {data?.heading}</h2>
                    { data?.content && <p>{data?.content}</p> }
                    { data?.subHeading?.length > 0 && data?.subHeading?.map((subData, inde) => 
                    <div>
                        <h3>{index+1}.{inde+1} {subData?.heading}</h3>
                        <p>{subData?.content}</p>
                    </div>)}
                </section>
            )
        }
    </div>
  )
}

export default TermsAndConditions