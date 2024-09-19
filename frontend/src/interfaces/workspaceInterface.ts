import {User} from "@/interfaces/authInterface";

interface Workspace {
    _id: string;
    userId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface WorkspaceResponse {
    status: number;
    message: string;
    data: Array<Workspace>
}


export interface WorkspaceState {
    list: Array<Workspace> | [];
    item: Workspace | {}
    loading: boolean;
    error: string | null;
    slugAvailable: boolean, // Add this to track slug availability
    suggestedSlug: Array<string>,   // Add this to store the suggested slug
}

export interface AllWorkspacePayload {
    data: Array<Workspace>
}


interface UpdateWorkspaceProps {
    isOpen: boolean;
    onClose: () => void;
}


interface Column {
    id: 'id' | 'name' | 'slug' | 'createdAt' | 'updatedAt' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: string | number) => string;
}

interface Data {
    _id: string;
    userId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export type { WorkspaceResponse, WorkspaceState, Workspace, AllWorkspacePayload, UpdateWorkspaceProps, Data, Column }