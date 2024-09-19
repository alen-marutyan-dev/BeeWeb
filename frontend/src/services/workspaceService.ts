import { WorkspaceResponse } from "@/interfaces/workspaceInterface";
import customRequest from "@/utils/customRequest";

export const WorkspaceService = {
    createWorkspace: async (data: any): Promise<WorkspaceResponse> => {
        return await customRequest<WorkspaceResponse>({
            url: '/workspace',
            method: 'POST',
            auth: true,
            data
        });
    },

    allWorkspaces: async (): Promise<WorkspaceResponse> => {
        return await customRequest<WorkspaceResponse>({
            url: '/workspace/all',
            method: 'GET',
            auth: true
        });
    },

    updateWorkspace: async (workspaceId: string, data: any): Promise<WorkspaceResponse> => {
        return await customRequest<WorkspaceResponse>({
            url: `/workspace/${workspaceId}`,
            method: 'PUT',
            auth: true,
            data
        });
    },

    deleteWorkspace: async (workspaceId: string): Promise<WorkspaceResponse> => {
        return await customRequest<WorkspaceResponse>({
            url: `/workspace/${workspaceId}`,
            method: 'DELETE',
            auth: true
        });
    },

    checkSlugAvailability: async (slug: string): Promise<WorkspaceResponse> => {
        return await customRequest<WorkspaceResponse>({
            url: `/workspace/check-slug-availability?slug=${slug}`,
            method: 'GET',
            auth: true
        });
    },
};
