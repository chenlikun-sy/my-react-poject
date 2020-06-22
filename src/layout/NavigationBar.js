import React , {Component} from "react"

class NavigationBar extends Component {
    
    render() {
        return (
            <div className="navigation-bar">
                <div className='nav-logo'>
                    <img className="logo-img" src="http://upload.jianshu.io/users/upload_avatars/2152694/e1c9a0f8-fd43-4c51-a432-270b04da7e48.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240"></img>
                    <p className="title">LN客户端</p>
                </div>
                <div className="nav-content">
                    <div className="nav-right">
                        
                    </div>
                </div>
            </div>
        );
    }

} 

export default NavigationBar;