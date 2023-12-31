import { useEffect, useState } from 'react'
import Form from '../../Layouts/Form/Form'
import Input from '../../../Utils/Component/Form/Input'
import Select from '../../../Utils/Component/Form/Select'
import { useNavigate, useParams } from 'react-router-dom'
import ProfileLayout from '../../Layouts/ProfileLayout/ProfileLayout'
import { AddNewSkill, GetSingleSkill, UpdateSkill } from '../../../Redux/Actions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import DeleteModal from '../../Common/DeleteModal/DeleteModal'

const options = {
    skillLevel: [
        {label: "Level 1", value:"Level 1"},
        {label: "Level 2", value:"Level 2"},
        {label: "Level 3", value:"Level 3"},
        {label: "Level 4", value:"Level 4"},
        {label: "Level 5", value:"Level 5"},
    ],
    skillPrice:[
        {label: "Paid", value:"paid"},
        {label: "Free", value:"free"},
    ],
    skillVisiblity:[
        {label: "Private", value:"private"},
        {label: "Public", value:"public"},
    ],
}

const AddSkill = () => {

    const [skillForm, setSkillForm] = useState({
        skillName:"",
        skillDescription:"",
        skillTechnologies:"",
    })
    const [priceTerm, setPriceTerm] = useState('')
    const [skillLevel, setSkillLevel] = useState('')
    const [skillVisibility, setSkillVisibility] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [skillId, setSkillId] = useState('')
    const [errors, setErrors] = useState({})

    const {actionMode} = useParams()
    const dispatch = useDispatch()
    const naviagte = useNavigate()
    const editData = useSelector(state => state.home.singleSkill)?.skill
    const response = useSelector(state => state.home.APIRESPONSE)

    useEffect(() => {
        if(response?.status){
            naviagte('/profile/skills')
        }
    },[response])

    useEffect(() => {
        if(actionMode.split('--')?.[0]==="update"){
            setIsEdit(true)
        }
    },[actionMode])

    const onChangeHandler = e => {
        const { name, value } = e.target
        setSkillForm({...skillForm, [name]:value})
    }
    
    useEffect(() => {
        if(isEdit){
            dispatch(GetSingleSkill({uuid:actionMode.split('--')?.[1]}))
        }
    },[isEdit])

    useEffect(() => {
        if(editData && isEdit){
            setSkillForm(editData)
            setSkillLevel({value:editData?.skillLevel, label:editData?.skillLevel})
            setSkillVisibility({value:editData?.skillVisibility, label:editData?.skillVisibility})
            setPriceTerm({value:editData?.priceTerm, label:editData?.priceTerm})
        }
    },[editData])

    const onValidate = () => {
        setErrors(() => {
            let err = {}
            if(!skillForm?.skillName){
                err.skillName = true
            }
            if(!skillForm?.skillDescription){
                err.skillDescription = true
            }
            if(!priceTerm?.value){
                err.priceTerm = true
            }
            if(!skillLevel?.value){
                err.skillLevel = true
            }
            if(!skillVisibility?.value){
                err.skillVisibility = true
            }
            if(!skillForm?.skillTechnologies){
                err.skillTechnologies = true
            }
            return err
        })
    }

    const onSubmitHandler = e =>{
        e.preventDefault()
        onValidate()
        if(skillForm?.skillName === '' || skillForm?.skillDescription === '' || priceTerm === '' || skillLevel === '' || skillVisibility === '' || skillForm?.skillTechnologies === ''){
            return false
        }
        setIsLoading(true)
        if(isEdit){
            const payload = {
                uuid:actionMode.split('--')?.[1],
                data: {...skillForm, skillTechnologies: skillForm?.skillTechnologies.toString(), skillLevel: skillLevel.value, skillVisibility: skillVisibility.value, priceTerm: priceTerm.value }
            }
            dispatch(UpdateSkill(payload))
        } else {
            dispatch(AddNewSkill({...skillForm, skillTechnologies: skillForm?.skillTechnologies, skillLevel: skillLevel.value, skillVisibility: skillVisibility.value, priceTerm: priceTerm.value }))
        }
    }

    const onBack = {
        show:true,
        link:'/profile/skills',
    }
    
    const addEditButton = () => {
        return <button className="btn-primary" onClick={onSubmitHandler}>{isLoading ? 'Loading...' : isEdit ? 'Edit Skill' : 'Add Skill'}</button>
    }

    const onDeleteHandler = e => {
        e.preventDefault()
        setShowDeleteModal(true)
        setSkillId(actionMode.split('--')?.[1])
    }
    
  return (
        <ProfileLayout>
            <DeleteModal skillId={skillId} showDelete={showDeleteModal} onHide={setShowDeleteModal}/>
            <Form width="100%" heading={`${isEdit ? 'Edit' : 'Add New'} Skill`} onBack={onBack}>
                <Input error={errors?.skillName} onInput={() => setErrors({...errors, skillName: false})} onChange={onChangeHandler} name="skillName" value={skillForm?.skillName} type="text" placeholder="Enter your skill name"/>
                <Input error={errors?.skillDescription} onInput={() => setErrors({...errors, skillDescription: false})} onChange={onChangeHandler} name="skillDescription" value={skillForm?.skillDescription} type="text" placeholder="Enter skill description"/>
                <div className="flex-row">
                    <div className="div">
                        <Select error={errors?.priceTerm} onSelectChange={() => setErrors({...errors, priceTerm: false})} onChange={setPriceTerm} name="priceTerm" value={priceTerm} options={options.skillPrice} placeholder="Skill price term" />
                    </div>
                    <div className="div">
                        <Select error={errors?.skillLevel} onSelectChange={() => setErrors({...errors, skillLevel: false})} onChange={setSkillLevel} name="skillLevel" value={skillLevel} options={options.skillLevel} placeholder="Select skill level" />
                    </div>
                </div>
                <div className="flex-row">
                    <div className="div">
                        <Select error={errors?.skillVisibility} onSelectChange={() => setErrors({...errors, skillVisibility: false})} onChange={setSkillVisibility} name="skillVisibility" value={skillVisibility} options={options.skillVisiblity} placeholder="Skill Visiblity" />
                    </div>
                    <div className="div empty"></div>
                </div>
                <Input error={errors?.skillTechnologies} onInput={() => setErrors({...errors, skillTechnologies: false})} onChange={onChangeHandler} name="skillTechnologies" value={skillForm?.skillTechnologies} type="text" placeholder="Enter skill technologies or services you known, releated with your skill. Seperate with comma ( , )"/>
                {isEdit ? <div className="flex-row">
                    <div className="div">
                        {addEditButton()}
                    </div>
                    <div className="div">
                        <button className="btn-primary danger" onClick={onDeleteHandler}>Remove Skill</button>
                    </div>
                </div> :
                addEditButton() }
            </Form>
        </ProfileLayout>
  )
}

export default AddSkill