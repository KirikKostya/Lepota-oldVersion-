import React from 'react'
import BackButton from '../Components/BackButton'
import WorkCatalog from '../Components/WorkCatalog'

export default function NavCatalog({setOpenID}) {
  return (
    <>
        <BackButton Link='/' />
        <WorkCatalog setOpenID={setOpenID}/>
    </>
  )
}
