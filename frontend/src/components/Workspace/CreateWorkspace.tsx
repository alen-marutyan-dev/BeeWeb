import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
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
import {AppDispatch} from '@/store';
import {createWorkspace, checkSlugAvailability} from '@/store/thunks/workspaceThunks';
import {useAppSelector} from "@/hooks";
import useDebounce from "@/hooks/useDebounce";
import {resetForm} from "@/store/slices/workspaceSlice";

const CreateWorkspace: React.FC = () => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [suggestedSlug, setSuggestedSlug] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const debouncedSlug = useDebounce(slug, 500);

    const {
        slugAvailable,
        loading: loadingSlug,
        suggestedSlug: suggestedSlugs,
        error
    } = useAppSelector((state) => state.workspace);

    useEffect(() => {
        if (debouncedSlug) {
            dispatch(checkSlugAvailability({ slug: debouncedSlug }));
        }
    }, [debouncedSlug, dispatch]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName('');
        setSlug('');
        setSuggestedSlug('');
        dispatch(resetForm());
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalSlug = slugAvailable ? slug : suggestedSlug || slug;
        const data = { name, slug: finalSlug };
        dispatch(createWorkspace({ data }));
        handleClose();
    };

    const isFormValid = () => {
        return (
            name.trim() !== '' &&
            (slug.trim() !== '' || suggestedSlug !== '') &&
            (slugAvailable || suggestedSlugs.length > 0)
        );
    };

    return (
        <Box width="95%" display="flex" justifyContent="end">
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add New Workspace
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Create New Workspace</DialogTitle>
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

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                padding: 1,
                                marginTop: 1,
                                borderRadius: 1,
                            }}
                        >
                            {suggestedSlugs.map((suggested, index) => (
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
                                    onClick={() => setSlug(suggested)}
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

                        {!loadingSlug && slug && (
                            <>
                                {slugAvailable ? (
                                    <Typography color="green" variant="body2" aria-live="polite">
                                        Slug is available!
                                    </Typography>
                                ) : (
                                    <Typography color="error" variant="body2" aria-live="polite">
                                        Slug is taken. Try one of these:
                                    </Typography>
                                )}
                            </>
                        )}

                        {error && (
                            <Typography color="error" variant="body2" aria-live="polite">
                                {error.message || 'Something went wrong. Please try again.'}
                            </Typography>
                        )}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loadingSlug || !isFormValid()}
                        >
                            Create Workspace
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </Box>
    );
};

export default CreateWorkspace;
