import React from 'react';
import {useSelector} from "react-redux";
import {selectUserAuth} from "../redux/loginRegister";
import NestedModal from "./Modal";
import Box from "@mui/material/Box";

const Profile = () => {
        const userAuth = useSelector(selectUserAuth)


        if (userAuth.user !== null && userAuth.blocks.message !== "Internal Error") {
            return (
                <div style={{maxWidth: "600px", width: '100%', display: "inline-block", marginTop: "20px"}}>
                    <NestedModal/>

                    {
                        userAuth.blocks.map((el, i) => {

                            return (
                                <Box
                                    component="span"
                                    key={i}
                                    sx={{
                                        textAlign: " left",
                                        display: 'block',
                                        padding: 1,
                                        m: 1,
                                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                                        color: (theme) =>
                                            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                                        border: '1px solid',
                                        borderColor: (theme) =>
                                            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                                        borderRadius: 2,
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                    }}
                                >{i + 1}. {el.text}</Box>
                            )
                        })
                    }
                </div>
            );
        }
    }
;

export default Profile;