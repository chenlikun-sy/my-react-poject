import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from "mobx-react"
import AppRouter from "./router"
import "./app.less"
import store from "./store"

//antd 提供了一个 React 组件 ConfigProvider 用于全局配置国际化文案。
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

class App extends React.Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <Provider {...store}>
                    <AppRouter />
                </Provider>
            </ConfigProvider>
        )
    }
}

ReactDom.render(<App />, document.getElementById("app"))