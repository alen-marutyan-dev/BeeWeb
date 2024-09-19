"use client";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react";
import { allWorkspaces, deleteWorkspace } from "@/store/thunks/workspaceThunks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/hooks";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Column, Data} from "@/interfaces/workspaceInterface";

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
};

const columns: readonly Column[] = [
    { id: '_id', label: 'Id' },
    { id: 'name', label: 'Name' },
    { id: 'slug', label: 'Slug' },
    { id: 'createdAt', label: 'Created Time' },
    { id: 'updatedAt', label: 'Updated Time' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function WorkspaceList({ onWorkspaceUpdate }: { onWorkspaceUpdate: (workspace: Data) => void }) {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const dispatch = useDispatch<AppDispatch>();
    const { list: workspaces } = useAppSelector(state => state.workspace);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);
    const [selectedWorkspaceData, setSelectedWorkspaceData] = useState<Data | null>(null);

    useEffect(() => {
        dispatch(allWorkspaces()).unwrap();
    }, [dispatch]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, workspace: Data) => {
        setAnchorEl(event.currentTarget);
        setSelectedWorkspaceId(workspace._id);
        setSelectedWorkspaceData(workspace);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedWorkspaceId(null);
    };

    const handleUpdate = () => {
        if (selectedWorkspaceData) {
            onWorkspaceUpdate(selectedWorkspaceData);
        }
        handleCloseMenu();
    };

    const handleDelete = async () => {
        if (selectedWorkspaceId) {
            await dispatch(deleteWorkspace({ workspaceId: selectedWorkspaceId })).unwrap();
            handleCloseMenu();
        }
    };

    return (
        <Paper sx={{ width: '95%', mr: 10, mb: 10, ml: 10, mt: 2 }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workspaces.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((workspace) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={workspace._id}>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof workspace[column.id] === 'number'
                                            ? column.format(workspace[column.id])
                                            : column.id === 'createdAt' || column.id === 'updatedAt'
                                                ? formatDate(workspace[column.id])
                                                : workspace[column.id]}
                                    </TableCell>
                                ))}
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={(event) => handleClick(event, workspace)}
                                        sx={{
                                            padding: '0',
                                            minWidth: '0',
                                            height: '40px',
                                            width: '40px',

                                        }}
                                    >
                                        <MoreVertIcon />
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl) && selectedWorkspaceId === workspace._id}
                                        onClose={handleCloseMenu}
                                    >
                                        <MenuItem onClick={handleUpdate}>Update</MenuItem>
                                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={workspaces.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
