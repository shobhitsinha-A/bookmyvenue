import React from 'react';
import {Rating, TableCell} from '@mui/material';

export default (props) => {
    return(
        <div>
            <TableCell component="th" scope="row">
                {props.venueName}
            </TableCell>
            {props.rating !== 0 ?
                <TableCell align="right"><Rating value={props.rating} readOnly/></TableCell> :
                <TableCell align="right"><Rating /></TableCell>
            }
        </div>
    )
}