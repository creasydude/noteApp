import { useRef, useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";

function AddNote() {
    const [title, setTitle] = useState('');
    const [noteMsg, setNoteMsg] = useState('');
    const [link, setLink] = useState('');
    const [copySuccess, setCopySuccess] = useState('Click To Copy!');
    const [errMsg, setErrMsg] = useState('');
    const [svErrMsg, setSvErrMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const textAreaRef = useRef(null);

    const submitFormHandler = () => {
        if ((title === '') && (noteMsg === '')) {
            setErrMsg('You Should Write Something In Title & Note Section')
            setTimeout(() => {
                setErrMsg('')
            }, 5000);
        } else if (noteMsg === '') {
            setErrMsg("You Should Write Something In Note Section !")
            setTimeout(() => {
                setErrMsg('')
            }, 5000);
        } else if (title === '') {
            setErrMsg("You Should Write Something In Title Section!")
            setTimeout(() => {
                setErrMsg('')
            }, 5000);
        } else {
            setErrMsg('');
            axios.post('/api', {
                title: title,
                noteMsg: noteMsg,
            })
                .then(res => {
                    setLink(res.data.link)
                    setDisabled(true);
                    setLoading(false);
                })
                .catch(err => {
                    setSvErrMsg(err.message)
                    setTimeout(() => {
                        setSvErrMsg('')
                    }, 5000);
                })
        }

    }

    const copyToClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
    }


    const ErrSection = (
        <MsgErrDiv>
            <p>{errMsg}</p>
            <p>{svErrMsg}</p>
        </MsgErrDiv>
    );

    const whenAddNote = (
        <InputsDiv>
            <p>Create New Note!</p>
            {(errMsg || svErrMsg) !== '' ? ErrSection : null}
            <input
                type="text"
                placeholder="Enter The Title..."
                onChange={e => setTitle(e.target.value)} />
            <textarea
                type="text"
                placeholder="Enter The Note..."
                onChange={e => setNoteMsg(e.target.value)} />
            <SubmitBtn onClick={submitFormHandler} disabled={disabled} >SAVE NOTE</SubmitBtn>

        </InputsDiv>
    );
    const whenNoteAdded = (
        <NoteAdded>
            <span>Note Added!</span>
            <div>
                <input readOnly type="text" value={`${window.location}${link}`} ref={textAreaRef} />
                <button onClick={copyToClipboard} >{copySuccess}</button>
            </div>
            <a href="#" onClick={() => window.location.reload(false)}>Add Another Note!</a>
        </NoteAdded>
    );

    return (
        <Container>
            {loading ? whenAddNote : whenNoteAdded}
        </Container>
    )
}

export default AddNote;

const Container = styled.section`
    width: 100%;
    height: 800px;
    background-color: ${props => props.theme.bgColor};
`;

const InputsDiv = styled.div`
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
`;

const SubmitBtn = styled.button`
    margin-top: 2rem;
    width: 125px;
    height: 35px;
    border: none;
    background-color: ${props => props.theme.btnSubmit};
    font-weight: bold;
    transition: .6s;
    color: ${props => props.theme.mainTextColor};


    &:hover {
        background-color: ${props => props.theme.hfbBgColor};
    }
    
`

const FadeIn = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`;

const MsgErrDiv = styled.div`
    margin: 2rem;
    position:relative;
    width: 400px;
    height: 50px;
    background-color: ${props => props.theme.hfbBgColor};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    animation: ${FadeIn} 2s forwards;
    

    & p {
        text-align: center;
        font-size: 18px;
    }

`;

const NoteAdded = styled.div`
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & span {
        font-size: 20px;
        color: ${props => props.theme.mainTextColor};
    }

    & button {
    display: inline;
    margin-top: 2rem;
    width: 125px;
    height: 35px;
    border: none;
    background-color: ${props => props.theme.btnSubmit};
    font-weight: bold;
    transition: .6s;
    color: ${props => props.theme.mainTextColor};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.hfbBgColor};
    }

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

    & input {
    height: 35px;
    border: none;
    outline: none;
    background-color: ${props => props.theme.bgForNote};

    }
`