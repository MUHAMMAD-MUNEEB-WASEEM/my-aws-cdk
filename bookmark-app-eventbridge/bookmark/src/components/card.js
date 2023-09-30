import React from 'react';
import './styles.css'
export function Card({ url, title }) {
    const abc = `https://${url}`
    return <div className="card">
        <a href={abc} className="url">{abc}</a>
        <p className="title">{title}</p>
    </div>
}