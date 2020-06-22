import React from "react"
import { Route,BrowserRouter,Link,Switch } from "react-router-dom"
import SliderMenu from "./layout/SlideMenu"
import NavigationBar from "./layout/NavigationBar"
import HomeIndex from "./views/home"
import ResumeIndex from "./views/resume"
class AppRouter extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <div class="app-container">
                    <NavigationBar />
                    <div class="app-content">
                        <SliderMenu />
                        <div class="container">
                            {/* Switch只显示一个组件。加exact表示精确匹配/。如果不加exact，/xxx也会匹配/。  */}
                            <Switch>
                                {/* exact */}
                                <Route exact path="/" component={HomeIndex} />
                                {/* resume */}
                                <Route exact path="/resume" component={ResumeIndex}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default AppRouter;