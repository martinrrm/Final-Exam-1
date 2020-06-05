import React from 'react';

function BookForm( props ){
    return(
        <div>
            <form onSubmit={props.handleSubmit}>
                <label>Search</label>
                <input type="text" name="Text" id="text" required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default BookForm;