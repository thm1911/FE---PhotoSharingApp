import { Button } from '@mui/material';

const CircleButton = ({ children, primary, secondary, ...props }) => {
    return (
        <Button
            sx={{
                borderRadius: '50%',
                minWidth: '25px',
                width: '25px',
                height: '25px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: primary,
                color: 'white',
                '&:hover': {
                    backgroundColor: secondary
                }
            }}
            {...props}
        >
            {children}
        </Button>
    )
}

export default CircleButton;