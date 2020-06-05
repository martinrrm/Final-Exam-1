import React from 'react';

// 1) Title of the book
// 2) Just 1 author
// 3) Thumbnail of the book
// 4) TextSnippet of the book
function Book( props ){
    return(
        <div>
            <div>
                <img src={props?.volumeInfo?.imageLinks?.thumbnail}/>
            </div>
            <div>
                <h1>{props?.volumeInfo?.title}</h1>
                <p>
                    {props?.searchInfo?.textSnippet}
                </p>
                <ul>
                    {props?.volumeInfo?.authors?.map((item, i) => 
                        <li key={i}>{item}</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Book;