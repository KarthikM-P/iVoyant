import { useState } from "react";

const Header = () => {
    const names = ["Demos","Theme Builder","Docs","API","Community","Pricing"];
    const [isHovered, setIsHovered] = useState(null);
    return (
        <header className="flex justify-between items-center p-4 bg-blue-900">
          <div className="flex items-center px" >
                <span className="text-xl font-bold">DATA MATRIX</span>
           
          </div>
          <nav className="flex items-center  gap-8 justify-between ">
          {names.map((item, ind) => (
            <span
                key={ind}
                className={`transition-transform duration-300 ${isHovered === ind ? "scale-110 text-gray-900" : "scale-100"}`}
                onMouseEnter={() => setIsHovered(ind)}
                onMouseLeave={() => setIsHovered(null)}
            >
                <a href="#" className="text-white">{item}</a>
            </span>
          ))}
            
            <i className="fas fa-sun text-white"></i>
            <i className="fab fa-github text-white"></i>
          </nav>
        </header>
      );
}

export default Header