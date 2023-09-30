import React, { useEffect, useState } from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import "./style.css";
import {Card} from '../components/card';
import shortid from 'shortid';
import { randomBytes } from 'crypto';
const GET_BOOKMARKS = gql`

{
    bookmarks {
        id
        url
        title
    }
}
`

const ADD_BOOKMARK = gql`
    mutation addBookmar($bookmark : BookmarkInput!){
        addBookmark(bookmark: $bookmark){
            result
        }
    }
`

export default function Home() {

    let titleField;
    let urlField;

    const { error, loading, data } = useQuery(GET_BOOKMARKS);
    const [addBookmark] = useMutation(ADD_BOOKMARK);
    const handleSubmit = () => {
        console.log(titleField.value)
        console.log(urlField.value)
        addBookmark({
            variables:{ 
                bookmark:{   
                id: randomBytes(4).toString("hex"),
                url: urlField.value,
                title: titleField.value
        }},
            refetchQueries: [{ query: GET_BOOKMARKS }]
        })
        urlField.value=""
        titleField.value=""
    }

    if (error)
        return <h3>{error}</h3>

    if (loading)
        return <h3>Loading..</h3>

        return <div className="fullscreen"> 
        <div className="container">
    
            <h2>Add New Bookmark</h2>
            <form>
                <label>
                    <input type="text" ref={node => titleField = node} placeholder="Enter Bookmark Title:"/>
                </label>
    
                <br />
                <label> 
                    <input type="text" ref={node => urlField = node} placeholder="Enter Bookmark Url:" />
                </label>
            </form>
    
            <br />
            <br />
            <button onClick={handleSubmit} className="btn">Add Bookmark</button>
    
            <h2>My Bookmark List</h2>
            {/* {JSON.stringify(data.bookmarks)} */}
    
            <div className="card-container">
                {data?.bookmarks?.map((bm) => <Card key={bm.id} url={bm.url} title={bm.title} />)}
            </div>
    
        </div>
        </div>
    }