import React from 'react'
import './home.css'

const HomeIndex = () => {
  return (
    <div id='homepage'>
      <div className='leftDiv'>
        <h1 id='firstH'>Manage your Tasks on</h1>
        <h1 id='secondH'>TaskDuty</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae non aperiam distinctio ullam quas pariatur incidunt, cumque amet, iusto dignissimos dolores vitae eligendi repudiandae quo officia! Assumenda magnam eius veniam!</p>
        <a href="/mytasks"><button className='taskBtn'>Go to My Tasks</button></a>

      </div>
      <div className='rightDiv'>
        <img src="/src/assets/homeImg.png" alt="Tasks" />
      </div>
    </div>
  )
}

export default HomeIndex