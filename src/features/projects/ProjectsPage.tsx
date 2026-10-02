import React, { useState } from 'react';
import { Plus, Briefcase, Calendar, DollarSign, User, Trash2 } from 'lucide-react';
import { useProjects, useCreateProject, useDeleteProject } from './hooks/useProjects';
import { useClients } from '@/features/clients/hooks/useClients';
import { ProjectStatus } from '@/types/database.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatDate } from '@/lib/utils';

export const ProjectsPage: React.FC = () => {
  const { data: projects = [], isLoading } = useProjects();
  const { data: clients = [] } = useClients();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [clientId, setClientId] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('in_progress');

  const filteredProjects = projects.filter((p) => {
    if (filterStatus === 'all') return true;
    return p.status === filterStatus;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !clientId) return;

    await createProject.mutateAsync({
      title,
      description,
      client_id: clientId,
      budget: Number(budget) || 0,
      deadline,
      status,
    });

    setTitle('');
    setDescription('');
    setClientId('');
    setBudget('');
    setDeadline('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">?????? ????????</h1>
          <p className="text-sm text-muted-foreground mt-1">
            ???????????? ?????????? ? ?????? ????? ?????????? ????
          </p>
        </div>
        <Button onClick={() => setShowModal(true)} size="sm" className="gap-2 shadow-md cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>????? ????? ????</span>
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 border-b pb-3">
        {[
          { key: 'all', label: '??? ????????' },
          { key: 'in_progress', label: '?? ??? ?????' },
          { key: 'completed', label: '????? ???' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={
              'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ' +
              (filterStatus === tab.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground')
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="group relative hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant={project.status === 'completed' ? 'paid' : 'pending'}>
                    {project.status === 'completed' ? '????? ???' : '?? ??? ?????'}
                  </Badge>
                  <button
                    onClick={() => deleteProject.mutate(project.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive p-1 rounded transition-all cursor-pointer"
                    title="??? ?????"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <CardTitle className="text-base font-bold mt-2">{project.title}</CardTitle>
                {project.description && (
                  <CardDescription className="text-xs line-clamp-2 mt-1">
                    {project.description}
                  </CardDescription>
                )}
              </CardHeader>
            </div>

            <CardContent className="space-y-3 pt-0 text-xs border-t pt-3 mt-4">
              <div className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <span>?????:</span>
                </div>
                <span className="font-semibold text-foreground">
                  {project.client?.name || '????? ??????'}
                </span>
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                  <span>????? ????? ???:</span>
                </div>
                <span className="font-bold text-foreground">
                  {formatPrice(project.budget)}
                </span>
              </div>

              {project.deadline && (
                <div className="flex items-center justify-between text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>???? ?????:</span>
                  </div>
                  <span>{formatDate(project.deadline)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Dialog for New Project */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-card w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg">????? ????? ????</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm cursor-pointer"
              >
                ?
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">????? ????? *</label>
                <Input
                  required
                  placeholder="????: ????? ???????? ?????????? ????"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">????? ?????? *</label>
                <select
                  required
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">-- ?????? ????? --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.company ? '(' + c.company + ')' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">??????? ? ???????????</label>
                <Input
                  placeholder="??? ?????? ?? ????? ? ?????..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">????? ????? (?????)</label>
                  <Input
                    type="number"
                    dir="ltr"
                    placeholder="35000000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold">???? ?????</label>
                  <Input
                    type="date"
                    dir="ltr"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer"
                >
                  ??????
                </Button>
                <Button type="submit" size="sm" className="cursor-pointer">
                  ????? ?????
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
