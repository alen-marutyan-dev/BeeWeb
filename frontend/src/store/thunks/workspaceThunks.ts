import {createAsyncThunk} from '@reduxjs/toolkit';
import {Workspace, WorkspaceResponse} from "@/interfaces/workspaceInterface";
import {WorkspaceService} from "@/services/workspaceService";

export const allWorkspaces = createAsyncThunk<WorkspaceResponse>(
    'workspaces/all',
    async (_, thunkAPI) => {
        try {
            return await WorkspaceService.allWorkspaces();
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const updateWorkspace = createAsyncThunk<WorkspaceResponse>(
    'workspaces/update',
    async ({workspaceId, data}, thunkAPI) => {
        try {
            return await WorkspaceService.updateWorkspace(workspaceId, data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteWorkspace = createAsyncThunk<WorkspaceResponse, {workspaceId: string}>(
    'workspaces/delete',
    async ({workspaceId}, thunkAPI) => {
        try {
            return await WorkspaceService.deleteWorkspace(workspaceId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const createWorkspace = createAsyncThunk<WorkspaceResponse, Workspace>(
    'workspaces/create',
    async ({data}, thunkAPI) => {
        try {
            return await WorkspaceService.createWorkspace(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const checkSlugAvailability = createAsyncThunk<WorkspaceResponse, {slug: string}>(
    'workspaces/checkSlugAvailability',
    async ({slug}, thunkAPI) => {
        try {
            return await WorkspaceService.checkSlugAvailability(slug);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);