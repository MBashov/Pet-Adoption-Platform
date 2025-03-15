import Bottomblock from "./components/bottom-block/BottomBlock"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import Page1Block from "./components/page1-block/Page1Block"
import TopBlok1 from "./components/top-block/TopBlock1"
import './css/form.css'
import './css/grid.css'
import './css/ie.css'
// import './css/reset.css'
// import './css/slider.css'
import './css/style.css'
import './css/superfish.css'

function App() {

  return (
    <>
      <Header />
      < TopBlok1 />
      < Page1Block />
      < Bottomblock />
      < Footer />
    </>
  )
}

export default App
