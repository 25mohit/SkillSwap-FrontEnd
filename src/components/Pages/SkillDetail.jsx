import React from 'react'
import AuthWraper from '../../Utils/Component/AuthWraper'
import Main from '../Layouts/Main/Main'
import Loading from '../../Utils/Component/Loading/Loading'

const SkillDetail = () => {
  return (
    <AuthWraper>
        <Main>
            {/* <Loading /> */}
        </Main>
    </AuthWraper>
  )
}

export default SkillDetail