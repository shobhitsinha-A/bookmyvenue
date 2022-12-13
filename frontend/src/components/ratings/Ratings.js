import React, {useState, useEffect} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import RatingsListItem from "./RatingsListItem";

export default () => {
    const [ratings, setRatings] = useState([]);
    useEffect(() => {
        async function getRatingsDetails() {
            let response = await fetch('https://bookmyvenue.live:6969/venues/past/reserved/'.concat(sessionStorage.getItem('user_name')), {
                method: 'GET'
            });
            let jsonResponse = await response.json();
            if (jsonResponse.status) {
                setRatings(jsonResponse.data.details);
            }
        }
        getRatingsDetails().catch(console.error);
    }, []);
    return (
        <TableContainer component={Paper}>
            <Table align="center" sx={{ minWidth: 650, marginLeft: 'auto', marginRight: 'auto' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Venue</TableCell>
                        <TableCell>Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ratings.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <RatingsListItem venueName={row.name} rating={row.rating}  />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}