import CardLayout from '../../Layouts/CardLayout/CardLayout'
import Input from '../../../Utils/Component/Form/Input'
import SkillDetailRow from './SkillDetailRow'
import { useEffect, useState } from 'react'

const ProfileSkills = ({ lists }) => {
    
    const [searchValue, setSearchValue] = useState('')
    const [filteredList, setFilteredList] = useState(lists)

    const onChange = e => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        if(searchValue?.length > 2){
            const filtered = lists?.filter(list => {
                if(searchValue === ''){
                    return list
                } else if(list?.skillName?.toLowerCase().includes(searchValue?.toLowerCase())) {
                    return list
                }
            })
            setFilteredList(filtered)
        }
        if(searchValue?.length < 1){
            setFilteredList(lists)
        }
    },[searchValue])


  return (
    <CardLayout>
        <div className="profile-skill-card">
            <nav className='flex-between'>
                <h3 className="heading-main">Your Skills</h3>
                <div>
                    <Input type="text" value={searchValue} onChange={onChange} placeholder="Search" size="small"/>
                </div>
            </nav>
            <section className='flex-column'>
                {
                    filteredList?.map((skill, index) => <SkillDetailRow key={index} heading={skill?.skillName} skills={skill} fullControl={false}/>)
                }
            </section>
        </div>
    </CardLayout>
  )
}

export default ProfileSkills