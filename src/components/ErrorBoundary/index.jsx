import * as React from 'react';
import './styles.css';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        console.log(this.state.hasError);
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h1>Error</h1>
                    <p>Something went wrong. Please try refreshing the page.</p>
                </div>
            );
        }

        return this.props.children;
    }
} 