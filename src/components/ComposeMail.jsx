import { useState } from 'react';

import { Dialog, Box, Typography, styled, InputBase, TextField, Button } from '@mui/material';

import { Close, DeleteOutlined } from '@mui/icons-material'

const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',
}

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    background: '#f2f6fc',
    '& > p': {
        fontSize: 14,
        fontWeight: 500,
    }
})

const RecipientsWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
    '& > div ': {
        fontSize: 14,
        borderBottom: '1px solid #F5F5F5',
        marginTop: '10px'
    }
})


const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 15px',
    alignItems: 'center',
})

const SendButton = styled(Button)({
    background: '#0057d0',
    color: '#fff',
    foontWeight: 500,
    textTransform: 'none',
    borderRadius: '18px', 
    width: 100,
})

const ComposeMail = ({ openDialog, setOpenDialog }) => {

    const [data, setData] = useState({});



    const config = {
        Host: "smtp.elasticemail.com",
        Username: "dikkumail124421@yopmail.com",
        Password: "BF65F370D27EBA5BA8D064DE893055F7137C",
        Port: 2525,
    }

    const closeComposeMail = () => {
        // e.preventDefault();

        setOpenDialog(false);
    }

    const sendMail = (e) => {
        e.preventDefault();
        if (window.Email) {

            window.Email.send({
                ...config,
                To: data.to,
                From: "chintudixena456@gmail.com",
                Subject: data.subject,
                Body: data.body
            }).then(
                message => alert(message)
            );
        }
        setOpenDialog(false);
    }

    const onValuChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value});
       
    }

    return (
        <Dialog
            open={openDialog}
            PaperProps={{ sx: dialogStyle }}
        >
            <Header>
                <Typography>
                    New Message
                </Typography>
                <Close fontSize='small' onClick={() => closeComposeMail()} />
            </Header>
            <RecipientsWrapper>
                <InputBase placeholder='Recipient' name="to" onChange={(e) => onValuChange(e)} />
                <InputBase placeholder='Subject' name="subject" onChange={(e) => onValuChange(e)} />
            </RecipientsWrapper>

            <TextField
                multiline
                rows={28}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none'
                    }
                }}
                onChange={(e) => onValuChange(e)}
                name="body"
            />

            <Footer>
                <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>

                <DeleteOutlined onClick={() => setOpenDialog(false)} />
            </Footer>
        </Dialog>
    )
}

export default ComposeMail;