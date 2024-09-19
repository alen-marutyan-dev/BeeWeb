import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    allWorkspaces, checkSlugAvailability,
    createWorkspace,
    deleteWorkspace,
    updateWorkspace
} from "@/store/thunks/workspaceThunks";
import {AllWorkspacePayload, WorkspaceState} from "@/interfaces/workspaceInterface";
import notify from "@/utils/toastify";

const initialState: WorkspaceState = {
    list: [],
    item: {},
    loading: false,
    error: null,
    slugAvailable: true,
    suggestedSlug: [],
};

const workspaceSlice = createSlice({
    name: 'workspaces',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetForm: (state) => {
            state.item = {};
            state.slugAvailable = true;
            state.suggestedSlug = [];
        },
        setCurrentWorkspace(state, action: PayloadAction<{ id: string; name: string; slug: string } | null>) {
            state.item = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all workspaces
            .addCase(allWorkspaces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(allWorkspaces.fulfilled, (state, action: PayloadAction<AllWorkspacePayload>) => {
                state.loading = false;
                state.list = action.payload.data;
            })
            .addCase(allWorkspaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to load workspaces';
            })

            // Update workspace
            .addCase(updateWorkspace.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateWorkspace.fulfilled, (state, action: PayloadAction<AllWorkspacePayload>) => {
                state.loading = false;
                const updatedWorkspace = action.payload.data;
                state.list = state.list.map(workspace =>
                    workspace._id === updatedWorkspace._id ? updatedWorkspace : workspace
                );
                notify.success("Workspace updated successfully!");
            })
            .addCase(updateWorkspace.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update workspace';
                notify.error(state.error)
            })

            // Delete workspace
            .addCase(deleteWorkspace.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteWorkspace.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
                state.loading = false;
                const deletedId = action.meta.arg.workspaceId;
                state.list = state.list.filter(workspace => workspace._id !== deletedId);
                notify.success("Workspace deleted successfully!");
            })
            .addCase(deleteWorkspace.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete workspace';
                notify.error(state.error)
            })

            // Create workspace
            .addCase(createWorkspace.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createWorkspace.fulfilled, (state, action: PayloadAction<AllWorkspacePayload>) => {
                state.loading = false;
                state.list.push(action.payload.data);
                notify.success("Workspace created successfully!");
            })
            .addCase(createWorkspace.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create workspace';
                notify.error(state.error)
            })

            // Check slug availability
            .addCase(checkSlugAvailability.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkSlugAvailability.fulfilled, (state, action: PayloadAction<{
                available: boolean,
                suggestedSlug?: string
            }>) => {
                state.loading = false;
                if (action.payload.data.isAvailable) {
                    state.slugAvailable = true;
                    state.suggestedSlug = [];
                } else {
                    state.slugAvailable = false;
                    state.suggestedSlug = action.payload.data.suggestedSlug || '';
                }
            })
            .addCase(checkSlugAvailability.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to check slug availability';
            });
    },
});

export const {clearError, resetForm, setCurrentWorkspace} = workspaceSlice.actions;

export default workspaceSlice.reducer;
