import React from 'react'
import WidgetsClient from '../../../../../api/widgets_client'

const Home = () => {
  console.log(getWidgets())
  return (
    <h1>Home TheWashfountain</h1>
  )
}

async function getWidgets () {
  const response = await WidgetsClient.getRightSidebar()
  console.log(response)
}

export default Home
