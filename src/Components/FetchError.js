import React from 'react';

const FetchError = ({errorMessage, retry}) => (
    <div>
        <p>An error occured : {errorMessage}</p>
        <button onClick={retry}>Retry</button>
    </div>
)

export default FetchError;