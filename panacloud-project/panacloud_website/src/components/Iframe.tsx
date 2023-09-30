import React from 'react';

const Iframe = ({ source }) => {

    if (!source) {
        return <div>Loading...</div>;
    }

    const src = source;     
    return (
        <div className="col-md-12">
            <div className="emdeb-responsive">
                <iframe src={src} width="100%" height="400"></iframe>
            </div>
        </div>
    );
};

export default Iframe;