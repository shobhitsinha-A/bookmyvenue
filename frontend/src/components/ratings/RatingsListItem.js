import React from 'react';
import {Rating, TableCell} from '@mui/material';

export default (props) => {
    return(
        <div className="ml-auto mr-auto">
            <TableCell component="th" scope="row">
                {props.venueName}
            </TableCell>
            {props.rating !== 0 ?
                <TableCell><Rating value={props.rating} readOnly/></TableCell> :
                <TableCell><Rating /></TableCell>
            }
        </div>
    )
}