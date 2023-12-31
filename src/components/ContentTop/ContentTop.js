import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";

const ContentTop = () => {
    const { toggleSidebar } = useContext(SidebarContext);
    return (
        <div className="main-content-top">
            <div className="content-top-left">
                <button type="button" className="sidebar-toggler" onClick={() => toggleSidebar()}>
                    <img src={iconsImgs.menu} alt="icons" />
                </button>
                <h3 className="content-top-title">Home</h3>
            </div>

        </div>
    )
}

export default ContentTop
