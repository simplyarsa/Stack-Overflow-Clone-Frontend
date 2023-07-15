import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import '../../App.css'
import QuestionsDetail from './QuestionsDetail'


const DisplayQuestion = () => {
  return (
    <div className='home-container-1'>
       <LeftSidebar />
      <div className='home-container-2'>
        <QuestionsDetail />
        <RightSidebar />
      </div>
    </div>
  )
}

export default DisplayQuestion