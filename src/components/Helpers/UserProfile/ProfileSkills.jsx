import CardLayout from '../../Layouts/CardLayout/CardLayout'
import Input from '../../../Utils/Component/Form/Input'
import SkillDetailRow from './SkillDetailRow'

const ProfileSkills = ({ lists }) => {
    
  return (
    <CardLayout>
        <div className="profile-skill-card">
            <nav className='flex-between'>
                <h3 className="heading-main">Your Skills</h3>
                <div>
                    <Input type="text" placeholder="Search" size="small"/>
                </div>
            </nav>
            <section className='flex-column'>
                {
                    lists?.map((skill, index) => <SkillDetailRow key={index} heading={skill?.skillName} skills={skill} fullControl={false}/>)
                }
            </section>
        </div>
    </CardLayout>
  )
}

export default ProfileSkills