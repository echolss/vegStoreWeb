import React from 'react';
// import Triangle from './Triangle';

class Bubbly extends React.Component {
    
    render() {
        const triangle = this.props.triangle;
        if(triangle === 'left') {
            return (
                <span className="bubbly bg-red">
                    <div className="bubbly-content">{this.props.content}</div>
                    <div className="bubbly-triangle left-triangle"></div>
                </span>
            );
        }
        else if(triangle === 'right') {
            return (
                <span className="bubbly bg-green">
                    <div className="bubbly-content">{this.props.content}</div>
                    <div className="bubbly-triangle right-triangle"></div>
                </span>
            );
        } 
    }
}

export default Bubbly