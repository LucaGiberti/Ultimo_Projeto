import { Filter, Search } from 'lucide-react';

export default function RequestFilters({
  categories,
  filters,
  onChange,
  onClear,
}) {
  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={18} />
        <h2 className="font-bold text-gray-800">Filtros e Busca</h2>
      </div>

      <div className="grid requests-filters-grid gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por Título</label>
          <div className="input-wrapper">
            <Search size={18} />
            <input
              type="text"
              className="input-field-small"
              placeholder="Digite o título..."
              value={filters.searchTitle}
              onChange={(e) => onChange('searchTitle', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Categoria</label>
          <select
            className="input-field-small-inline full-width"
            value={filters.filterCategory}
            onChange={(e) => onChange('filterCategory', e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Colaborador</label>
          <input
            type="text"
            className="input-field-small-inline full-width"
            placeholder="Nome do colaborador..."
            value={filters.filterCollaborator}
            onChange={(e) => onChange('filterCollaborator', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Status</label>
          <select
            className="input-field-small-inline full-width"
            value={filters.filterStatus}
            onChange={(e) => onChange('filterStatus', e.target.value)}
          >
            <option value="">Todos os status</option>
            <option value="ABERTA">Aberta</option>
            <option value="EM_ANDAMENTO">Em Andamento</option>
            <option value="CONCLUIDA">Concluída</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4 wrap-mobile">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Ordenar:</label>
          <select
            className="input-field-small-inline"
            value={filters.sortOrder}
            onChange={(e) => onChange('sortOrder', e.target.value)}
          >
            <option value="desc">Mais recentes primeiro</option>
            <option value="asc">Mais antigas primeiro</option>
          </select>
        </div>

        <button type="button" onClick={onClear} className="btn-text text-sm">
          Limpar filtros
        </button>
      </div>
    </div>
  );
}
