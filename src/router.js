import React from "react"
import { Route, BrowserRouter, Link, Switch } from "react-router-dom"
import SliderMenu from "./layout/SlideMenu"
import NavigationBar from "./layout/NavigationBar"
import HomeIndex from "./views/home"
import CtOmcDataQuality from "./views/ct_omc_data_quality"
import CtSystemOperationStatus from "./views/ct_system_operation_status"
import CtCollectStatus from "./views/ct_collect_status/ct_collect_status"
import CtDataQuality from "./views/ct_data_quality/ct_data_quality"
import  CtHistorySeach from "./views/ct_history_seach"

class AppRouter extends React.Component {
    render() {
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
                                {/* CtOmcDataQuality */}
                                <Route exact path="/CtOmcDataQuality" component={CtOmcDataQuality} />
                                {/* CtCollectStatus */}
                                <Route exact path="/CtCollectStatus" component={CtCollectStatus} />
                                {/* CtCollectStatus */}
                                <Route exact path="/CtDataQuality" component={CtDataQuality} />
                                {/* CtSystemOperationStatus */}
                                <Route exact path="/CtSystemOperationStatus" component={CtSystemOperationStatus} />
                                {/* CtCollectStatus */}
                                <Route exact path="/CtHistorySeach" component={CtHistorySeach}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

export default AppRouter;