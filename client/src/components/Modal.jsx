import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useState} from "react";
import {Editable, Slate, withReact} from "slate-react";
import {createEditor} from 'slate'
import {useDispatch, useSelector} from "react-redux";
import {selectUserAuth, setBlockText, setUser, userAutoCheck} from "../redux/loginRegister";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../config/firebase-config";
import Swal from "sweetalert2";
import RichTextExample from "./Slate";
import TextField from "@mui/material/TextField";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


// const initialValue = [
//     {
//         type: 'text',
//         children: [{text: '...'}],
//     },
// ]

export default function NestedModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const dispatch = useDispatch();

    // const [editor] = useState(() => withReact(createEditor()))

    const userAuth = useSelector(selectUserAuth)
    const sendBlock = (e) => {

        if (e !== undefined) {
            if (e.trim() !== "") {
                fetch(`http://localhost:8080/blocks`, {
                    method: 'POST',
                    body: JSON.stringify({
                        "text": e
                    }),
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        "Authorization": `Bearer ${userAuth?.user?.stsTokenManager?.accessToken}`
                    }
                }).then(res => res.json().then(res => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setOpen(false);
                    onAuthStateChanged(auth, (currentUser) => {
                        dispatch(userAutoCheck(currentUser))
                        dispatch(setUser(currentUser))
                    })
                }));
            }
        }


    }
    const logOut = async () => {
        console.log(await signOut(auth))
        await signOut(auth);
    }

    return (
        <div>
            <Stack spacing={2} direction="row" justifyContent="center">
                <Button variant="contained" onClick={handleOpen}>Open modal</Button>
                <Button variant="outlined" onClick={logOut}>Sign Out</Button>
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{...style, width: 400}}>
                    {/*<Slate editor={editor} value={initialValue} */}
                    {/*       onChange={(e) => dispatch(setBlockText(e[0].children[0]))}>*/}
                    {/*    <Editable/>*/}
                    {/*<RichTextExample/>*/}
                    {/*</Slate>*/}
                    <TextField
                        onChange={(e) => dispatch(setBlockText(e.target.value))}
                    />
                    <Button variant="text" onClick={(e) => {
                        sendBlock(userAuth.blockText)
                    }}
                    >Add Block</Button>
                </Box>
            </Modal>
        </div>
    );
}