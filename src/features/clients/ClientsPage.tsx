import React, { useState } from 'react';
import { Plus, Users, Mail, Phone, MapPin, Building, Trash2, Search } from 'lucide-react';
import { useClients, useCreateClient, useDeleteClient } from './hooks/useClients';
import { useAppSelector } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const ClientsPage: React.FC = () => {
  const { data: clients = [], isLoading } = useClients();
  const createClient = useCreateClient();
  const deleteClient = useDeleteClient();
  const { globalSearch } = useAppSelector((state) => state.ui);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const activeSearch = globalSearch || searchTerm;

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(activeSearch.toLowerCase())) ||
      c.email.toLowerCase().includes(activeSearch.toLowerCase())
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    await createClient.mutateAsync({
      name,
      company,
      email,
      phone,
      address,
    });

    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setAddress('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">?????? ???????</h1>
          <p className="text-sm text-muted-foreground mt-1">
            ??????? ????? ??????? ? ?????? ?? ????? ???????
          </p>
        </div>
        <Button onClick={() => setShowModal(true)} size="sm" className="gap-2 shadow-md cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>?????? ????? ????</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="?????? ??? ????? ?? ????..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-9 text-xs"
          />
        </div>
        <span className="text-xs text-muted-foreground mr-auto">
          {filteredClients.length} ????? ???? ??
        </span>
      </div>

      {/* Clients Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="relative group hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-base font-bold">{client.name}</CardTitle>
                    {client.company && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Building className="h-3 w-3" />
                        <span>{client.company}</span>
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteClient.mutate(client.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive p-1.5 rounded transition-all cursor-pointer"
                  title="??? ?????"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 pt-0 text-xs text-muted-foreground border-t mt-2 pt-3">
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span dir="ltr" className="text-left font-mono">{client.phone}</span>
              </div>
              {client.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <span dir="ltr" className="text-left">{client.email}</span>
                </div>
              )}
              {client.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="truncate">{client.address}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal Dialog for New Client */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-card w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-lg">??? ????? ????</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm cursor-pointer"
              >
                ?
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">??? ? ??? ???????? ??? ???? *</label>
                <Input
                  required
                  placeholder="????: ????? ?????"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">??? ???? / ??????</label>
                <Input
                  placeholder="????: ???? ???? ?????"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">????? ???? *</label>
                <Input
                  required
                  dir="ltr"
                  placeholder="09121234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">???? ?????</label>
                <Input
                  type="email"
                  dir="ltr"
                  placeholder="client@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">???? ????</label>
                <Input
                  placeholder="???? ??????? ????..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
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
                  ??? ?????
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
