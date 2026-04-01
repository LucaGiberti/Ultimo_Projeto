export function formatDateTime(dateString) {
  if (!dateString) return '-';

  try {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

export function formatLongDate(dateString) {
  if (!dateString) return '-';

  try {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatTime(dateString) {
  if (!dateString) return '-';

  try {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}
