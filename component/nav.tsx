import Image from 'next/image'
import Logo from "../public/src/images/laundry-shop-logo.png"


export default function NavbarMain() {
  return (
    <div className="navbar navbar-expand-md">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
      <Image
        alt="laundry shop logo"
        src={Logo}
        width={890}
        height={120} 
        style={{
          maxWidth: '350px',           
          height: 'auto',
        }}
      />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-end">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Machine</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Simulate</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link ">contact Me</a>
          </li>
        </ul>
        
      </div>
    </div>
  </div>
  )
}