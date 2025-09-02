import React from 'react'
import Header from '../component/Header'
import Categories from '../component/CategoriesTile'
import RecentBlogs from '../component/RecentBlogs'

function Home() {
  return (
    <div >
        <Header/>
        <Categories/>
        <RecentBlogs/>
    
    </div>
  )
}

export default Home