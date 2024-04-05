import Alert from '@mui/material/Alert';

const MUIalert = (props) => {

    return (
        <Alert className="card" style={{margin:'5px auto'}} variant="filled" severity={`${props.status}`}>This is an error Alert.</Alert>
    )
    
}

export default MUIalert;
