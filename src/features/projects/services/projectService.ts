import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Project } from '@/types/database.types';
import { clientService } from '@/features/clients/services/clientService';

const STORAGE_KEY = 'freelance_os_projects';

const initialProjects: Project[] = [
  {
    id: 'prj-1',
    user_id: 'usr-demo-101',
    client_id: 'cli-1',
    title: '????? ???????? ????? ??????? ??????????',
    description: '???????? ???? ???? ?????? ?? ?????? ? ??????? ?? ????? ???????? ?????? ?????',
    budget: 45000000,
    status: 'in_progress',
    deadline: '2026-10-30',
    created_at: '2026-09-02T11:00:00Z',
  },
  {
    id: 'prj-2',
    user_id: 'usr-demo-101',
    client_id: 'cli-2',
    title: '????? ???????? ?????????? ???? ???????????',
    description: '?????????? ???? ? ?????? ?????? ??? ?? ???????',
    budget: 68000000,
    status: 'completed',
    deadline: '2026-09-20',
    created_at: '2026-09-11T16:00:00Z',
  },
  {
    id: 'prj-3',
    user_id: 'usr-demo-101',
    client_id: 'cli-3',
    title: '????? ???? ??????? ??????? ??????',
    description: '????? ????? ???????? ????? ?????? ? ??? ??????? ????',
    budget: 32000000,
    status: 'in_progress',
    deadline: '2026-11-15',
    created_at: '2026-09-16T10:00:00Z',
  },
];

const getStoredProjects = async (): Promise<Project[]> => {
  const data = localStorage.getItem(STORAGE_KEY);
  let projects: Project[] = initialProjects;
  if (data) {
    try {
      projects = JSON.parse(data);
    } catch {
      projects = initialProjects;
    }
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
  }

  const clients = await clientService.getClients();
  return projects.map((prj) => ({
    ...prj,
    client: clients.find((c) => c.id === prj.client_id),
  }));
};

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('projects')
        .select('*, client:clients(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
    return getStoredProjects();
  },

  createProject: async (projectData: Omit<Project, 'id' | 'user_id' | 'created_at'>): Promise<Project> => {
    if (isSupabaseConfigured) {
      const { data: { session } } = await supabase.auth.getSession();
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...projectData, user_id: session?.user.id }])
        .select('*, client:clients(*)')
        .single();
      if (error) throw error;
      return data;
    }

    const current = await getStoredProjects();
    const newProject: Project = {
      id: 'prj-' + Date.now(),
      user_id: 'usr-demo-101',
      created_at: new Date().toISOString(),
      ...projectData,
    };
    const clients = await clientService.getClients();
    newProject.client = clients.find((c) => c.id === newProject.client_id);

    const updated = [newProject, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newProject;
  },

  deleteProject: async (id: string): Promise<void> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      return;
    }

    const current = await getStoredProjects();
    const filtered = current.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};
