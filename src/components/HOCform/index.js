import React from 'react';

export default function HOCform(Comp) {
    return class WrapperComp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        handleChange = (key,val) => {
            this.setState({
                [key]: val
            });
        }
        render() {
            return (
                <Comp handleChange={this.handleChange} state={this.state} {...this.props}/>
            );
        }
    }
}
/* {...props}叫做属性穿透 */