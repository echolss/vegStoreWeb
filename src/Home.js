import React from 'react';
import {  
    Route,
    Switch
} from 'react-router-dom';
import Login  from './containers/Login';
import Register from './containers/Register';
import AuthRoute from './components/AuthRoute';
import BossInfo from './containers/BossInfo';
import WorkerInfo from './containers/WorkerInfo';
import Dashboard from './containers/Dashboard';
import Chat from './containers/Chat';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(err, info) {
        console.log(err, info);
        this.setState({hasError: true});
    }
    render() {
        return this.state.hasError ? (<h1>页面出错了！</h1>) : (
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path="/workerinfo" component={WorkerInfo}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/chat/:user" component={Chat} />
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        )
    }
}

export default Home