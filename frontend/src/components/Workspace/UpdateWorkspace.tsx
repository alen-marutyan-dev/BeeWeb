"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Button,
    TextField,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Typography
} from '@mui/material';
import { AppDispatch } from '@/store';
import { updateWorkspace, checkSlugAvailability } from '@/store/thunks/workspaceThunks';
import { useAppSelector } from "@/hooks";
import { UpdateWorkspaceProps } from "@/interfaces/workspaceInterface";
import useDebounce from "@/hooks/useDebounce";

const UpdateWorkspace: React.FC<UpdateWorkspaceProps> = ({ isOpen, onClose }) => {
    const workspaceData = useAppSelector(state => state.workspace.item);
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState(workspaceData?.name || '');
    const [slug, setSlug] = useState(workspaceData?.slug || '');
    const [loadingSlug, setLoadingSlug] = useState(false);
    const { slugAvailable, suggestedSlug: suggestedSlugs, error } = useAppSelector(state => state.workspace);

    // Debounce slug input
    const debouncedSlug = useDebounce(slug, 500);

    useEffect(() => {
        if (workspaceData) {
            setName(workspaceData.name);
            setSlug(workspaceData.slug);
        }
    }, [workspaceData]);

    useEffect(() => {
        // Clear suggested slugs if the slug matches the current workspace slug
        if (slug === workspaceData?.slug) {
            return;
        }

        if (debouncedSlug) {
            setLoadingSlug(true);
            dispatch(checkSlugAvailability({ slug: debouncedSlug })).finally(() => {
                setLoadingSlug(false);
            });
        }
    }, [debouncedSlug, dispatch, workspaceData]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { name, slug: slugAvailable ? slug : workspaceData?.slug };
        dispatch(updateWorkspace({ workspaceId: workspaceData._id, data }));
        onClose();
    };

    const handleClose = () => {
        setName(workspaceData?.name || '');
        setSlug(workspaceData?.slug || '');
        onClose();
    };

    const isFormChanged = name !== workspaceData?.name || slug !== workspaceData?.slug;

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Update Workspace</DialogTitle>
            <Box component="form" onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Workspace Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: 1, marginTop: 1 }}>
                        {slug !== workspaceData?.slug && suggestedSlugs.map((suggested, index) => (
                            <Typography
                                key={index}
                                variant="body2"
                                sx={{
                                    cursor: 'pointer',
                                    color: 'blue',
                                    borderRadius: 1,
                                    padding: '4px 8px',
                                    marginRight: 1,
                                    backgroundColor: 'grey.200',
                                    '&:hover': {
                                        backgroundColor: 'grey.500',
                                    },
                                }}
                                onClick={() => setSlug(suggested)} // Set clicked suggestion as the slug
                            >
                                {suggested}
                            </Typography>
                        ))}
                    </Box>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Workspace Slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        error={!!error}
                        required
                    />

                    {loadingSlug && <CircularProgress size={24} />}

                    {!loadingSlug && slug && slug !== workspaceData?.slug && (
                        <>
                            {slugAvailable ? (
                                <Typography color="green" variant="body2">
                                    Slug is available!
                                </Typography>
                            ) : (
                                <Typography color="error" variant="body2">
                                    Slug is taken. Please choose another.
                                </Typography>
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary"
                            disabled={loadingSlug || !isFormChanged || (slug && !slugAvailable)}>
                        Update Workspace
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default UpdateWorkspace;
