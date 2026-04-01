import { useMemo, useState } from 'react';
import MainHeader from '../components/layout/MainHeader';
import RequestFilters from '../components/requests/RequestFilters';
import RequestTable from '../components/requests/RequestTable';
import Card from '../components/ui/Card';
import { useRequests } from '../hooks/useRequests';
import { requestService } from '../services/requestService';

const initialFilters = {
  searchTitle: '',
  filterCategory: '',
  filterCollaborator: '',
  filterStatus: '',
  sortOrder: 'desc',
};

export default function Requests() {
  const { requests } = useRequests();
  const [filters, setFilters] = useState(initialFilters);
  const categories = requestService.getUniqueCategories();

  const filteredRequests = useMemo(() => {
    let data = [...requests];

    if (filters.searchTitle) {
      data = data.filter((request) => request.titulo.toLowerCase().includes(filters.searchTitle.toLowerCase()));
    }

    if (filters.filterCategory) {
      data = data.filter((request) => request.categoria === filters.filterCategory);
    }

    if (filters.filterCollaborator) {
      data = data.filter((request) => request.nome_completo.toLowerCase().includes(filters.filterCollaborator.toLowerCase()));
    }

    if (filters.filterStatus) {
      data = data.filter((request) => request.status === filters.filterStatus);
    }

    data.sort((a, b) => {
      const dateA = new Date(a.data_abertura).getTime();
      const dateB = new Date(b.data_abertura).getTime();
      return filters.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return data;
  }, [filters, requests]);

  const updateFilter = (field, value) => setFilters((previous) => ({ ...previous, [field]: value }));

  return (
    <div className="bg-gradient min-page">
      <MainHeader title="Todas as Solicitações" subtitle={`${filteredRequests.length} solicitação(ões) encontrada(s)`} backTo="/dashboard" />

      <main className="content-container max-w-7xl">
        <RequestFilters categories={categories} filters={filters} onChange={updateFilter} onClear={() => setFilters(initialFilters)} />
        <Card className="shadow-lg overflow-hidden">
          <RequestTable requests={filteredRequests} />
        </Card>
      </main>
    </div>
  );
}
