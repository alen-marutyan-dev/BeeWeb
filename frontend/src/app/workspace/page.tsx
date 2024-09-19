"use client";
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import UserLayout from "@/layouts/UserLayout";
import WorkspaceList from "@/components/Workspace/WorkspaceList";
import CreateWorkspace from "@/components/Workspace/CreateWorkspace";
import UpdateWorkspace from "@/components/Workspace/UpdateWorkspace";
import { setCurrentWorkspace } from '@/store/slices/workspaceSlice';
import {Box, Typography} from "@mui/material";

const Workspace = () => {
    const dispatch = useDispatch();
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const handleUpdateClose = () => {
        setUpdateDialogOpen(false);
        dispatch(setCurrentWorkspace(null));
    };

    const handleWorkspaceUpdate = (workspace) => {
        dispatch(setCurrentWorkspace(workspace));
        setUpdateDialogOpen(true);
    };


    return (
        <UserLayout>
            <Typography variant="h5" component="h1" width="100%" >
                <Box display="flex" flexDirection="column" justifyContent="end" alignItems="baseline">
                    <CreateWorkspace />
                    <WorkspaceList onWorkspaceUpdate={handleWorkspaceUpdate} />

                </Box>
                <UpdateWorkspace
                    isOpen={updateDialogOpen}
                    onClose={handleUpdateClose}
                />
            </Typography>
        </UserLayout>
    );
};

export default Workspace;
