import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        margin: "auto"
    },
});

function createData(name: string, property: string) {
    return { name, property };
}



export default function BasicTable({ title, type, id, visibility, description, schema_uri }) {
    const classes = useStyles();
    const rows = [
        createData('Title', title),
        createData('ID', id),
        createData('Type', type),
        createData('Visibility', visibility),
        createData('Description', description),
        createData('Schema Uri', schema_uri),
    ];
    return (
        <TableContainer data-testId="detailComp" component={Paper} className={classes.table} >
            <Table aria-label="simple table">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.property}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
