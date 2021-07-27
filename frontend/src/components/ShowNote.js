import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function ShowNote() {
    let { id } = useParams();
    const [errMsg, setErrMsg] = useState('')
    const [noteItems, setNoteItems] = useState({
        title: null,
        noteMsg: null,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`api/${id}`)
            .then(res => {
                setNoteItems({
                    title: res.data.title,
                    noteMsg: res.data.noteMsg,
                })
                setLoading(false);
            })
            .catch(err => setErrMsg(err.message))
    }, [id])

    const loadingDiv = (
        <ErrDiv>
            {errMsg == typeof (String) ? null : errMsg}
        </ErrDiv>
    );
    const noteDiv = (
        <NoteDiv>
            <p>Well, Your Note Is Here!</p>
            <input
                type="text"
                value={noteItems.title} />
            <textarea
                type="text"
                value={noteItems.noteMsg} />
            <a href="/" onClick={() => window.location.reload(false)}>Add Another Note!</a>
        </NoteDiv>
    );
    return (
        <Container>
            {loading ? loadingDiv : noteDiv}
        </Container>
    )
}

export default ShowNote;

const Container = styled.div`
    width: 100%;
    height: 800px;
    background-color: ${props => props.theme.bgColor};
`;

const ErrDiv = styled.div`
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: ${props => props.theme.mainTextColor};
`;

const NoteDiv = styled.div`
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & input {
        margin: 2rem 0 0.5rem 0;
        width: 400px;
        height: 25px;
        outline: none;
        border: none;
        border-bottom: 1px solid #ccc;
        background-color: ${props => props.theme.bgForNote};
        transition: .4s;
    }

    & input:focus {
        border-bottom: 1px solid ${props => props.theme.borderForNote};
    }

    & textarea {
        outline: none;
        width: 400px;
        height: 350px;
        border: none;
        background-color: ${props => props.theme.bgForNote};
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        transition: .6s;
        
    }
    
    & textarea:focus {
        border-left: 1px solid ${props => props.theme.borderForNote};
        border-bottom: 1px solid ${props => props.theme.borderForNote};
    }

    & p {
        color: ${props => props.theme.mainTextColor};
        font-size: 20px;
    }

    & a {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 55px;
    border: none;
    text-align: center;
    text-decoration: none;
    background-color: ${props => props.theme.btnSubmit};
    font-weight: bold;
    transition: .6s;
    color: ${props => props.theme.mainTextColor};

    &:hover {
        background-color: ${props => props.theme.hfbBgColor};
    }
}
`;