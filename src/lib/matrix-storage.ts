'use client';

export interface MatrixRecord {
  id: string;
  name: string;
  qr_type: string;
  is_dynamic: boolean;
  short_code?: string;
  content: string;
  destination_url?: string;
  encoded_data?: any;
  customization?: any;
  folder_id?: string | null;
  status: 'active' | 'archived' | 'inactive';
  total_scans: number;
  created_at: string;
  last_scan_at?: string | null;
}

export interface FolderRecord {
  id: string;
  name: string;
  color: string;
  qr_count?: number;
  created_at: string;
}

const STORAGE_KEY_MATRICES = 'formqr_matrices_registry_v1';
const STORAGE_KEY_FOLDERS = 'formqr_folders_registry_v1';
const STORAGE_KEY_PREFS = 'formqr_operator_prefs_v1';

const INITIAL_SPECIMENS: MatrixRecord[] = [
  {
    id: 'mat-specimen-001',
    name: 'Atelier Portfolio Specimen',
    qr_type: 'url',
    is_dynamic: true,
    short_code: 'spec01',
    content: 'https://atelier-studio.design/archive/2026',
    destination_url: 'https://atelier-studio.design/archive/2026',
    customization: {
      fgColor: '#101216',
      bgColor: '#F8F6F0',
      dotStyle: 'square',
      size: 512,
    },
    folder_id: null,
    status: 'active',
    total_scans: 42,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    last_scan_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'mat-specimen-002',
    name: 'Studio Guest Wi-Fi Key',
    qr_type: 'wifi',
    is_dynamic: false,
    content: 'WIFI:T:WPA;S:ATELIER_5G_GUEST;P:bauhaus_craft_1919;;',
    destination_url: '',
    customization: {
      fgColor: '#000000',
      bgColor: '#FFFFFF',
      dotStyle: 'rounded',
      size: 512,
    },
    folder_id: null,
    status: 'active',
    total_scans: 19,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    last_scan_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'mat-specimen-003',
    name: 'Architect Elena Vogel vCard',
    qr_type: 'vcard',
    is_dynamic: true,
    short_code: 'elena-vcard',
    content: 'BEGIN:VCARD\nVERSION:3.0\nN:Vogel;Elena;;;\nFN:Elena Vogel\nORG:Atelier Form Studio\nTITLE:Lead Typographer & Architect\nTEL:+49 30 555 0192\nEMAIL:elena@formqr.studio\nURL:https://formqr.studio\nEND:VCARD',
    destination_url: 'https://formqr.studio/press/elena',
    customization: {
      fgColor: '#171717',
      bgColor: '#FFFFFF',
      dotStyle: 'square',
      size: 512,
    },
    folder_id: null,
    status: 'active',
    total_scans: 87,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    last_scan_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

const INITIAL_FOLDERS: FolderRecord[] = [
  {
    id: 'folder-editorial',
    name: 'Editorial Client Proofs',
    color: 'amber',
    qr_count: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: 'folder-hardware',
    name: 'Exhibition Signage 2026',
    color: 'emerald',
    qr_count: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
];

// Read all matrices
export function getLocalMatrices(): MatrixRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MATRICES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_MATRICES, JSON.stringify(INITIAL_SPECIMENS));
      return INITIAL_SPECIMENS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read local matrices:', err);
    return [];
  }
}

// Save or prepend matrix
export function saveLocalMatrix(matrix: Omit<MatrixRecord, 'id' | 'created_at' | 'total_scans'> & { id?: string }): MatrixRecord {
  const all = getLocalMatrices();
  const id = matrix.id || `mat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const newRecord: MatrixRecord = {
    ...matrix,
    id,
    created_at: new Date().toISOString(),
    total_scans: 0,
    status: matrix.status || 'active',
  };

  const existingIdx = all.findIndex((m) => m.id === id);
  let updated: MatrixRecord[];
  if (existingIdx >= 0) {
    updated = all.map((m) => (m.id === id ? { ...m, ...newRecord } : m));
  } else {
    updated = [newRecord, ...all];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_MATRICES, JSON.stringify(updated));
  }
  return newRecord;
}

// Find matrix by id
export function getLocalMatrixById(id: string): MatrixRecord | null {
  const all = getLocalMatrices();
  return all.find((m) => m.id === id) || null;
}

// Update matrix
export function updateLocalMatrix(id: string, updates: Partial<MatrixRecord>): MatrixRecord | null {
  const all = getLocalMatrices();
  const idx = all.findIndex((m) => m.id === id);
  if (idx === -1) return null;

  const updatedRecord = { ...all[idx], ...updates };
  all[idx] = updatedRecord;

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_MATRICES, JSON.stringify(all));
  }
  return updatedRecord;
}

// Delete matrix
export function deleteLocalMatrix(id: string): boolean {
  const all = getLocalMatrices();
  const filtered = all.filter((m) => m.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_MATRICES, JSON.stringify(filtered));
  }
  return filtered.length !== all.length;
}

// Folders Management
export function getLocalFolders(): FolderRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FOLDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_FOLDERS, JSON.stringify(INITIAL_FOLDERS));
      return INITIAL_FOLDERS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read local folders:', err);
    return [];
  }
}

export function saveLocalFolder(folder: { name: string; color: string }): FolderRecord {
  const all = getLocalFolders();
  const newFolder: FolderRecord = {
    id: `folder-${Date.now()}`,
    name: folder.name,
    color: folder.color,
    qr_count: 0,
    created_at: new Date().toISOString(),
  };

  const updated = [newFolder, ...all];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_FOLDERS, JSON.stringify(updated));
  }
  return newFolder;
}

export function deleteLocalFolder(id: string): boolean {
  const all = getLocalFolders();
  const filtered = all.filter((f) => f.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_FOLDERS, JSON.stringify(filtered));
  }
  return filtered.length !== all.length;
}

// Operator Preferences
export function getLocalPreferences(): { analyticsEnabled: boolean; locationTracking: boolean } {
  if (typeof window === 'undefined') return { analyticsEnabled: true, locationTracking: true };
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFS);
    if (!raw) return { analyticsEnabled: true, locationTracking: true };
    return JSON.parse(raw);
  } catch {
    return { analyticsEnabled: true, locationTracking: true };
  }
}

export function saveLocalPreferences(prefs: { analyticsEnabled: boolean; locationTracking: boolean }) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_PREFS, JSON.stringify(prefs));
  }
}

// Purge all workspace data
export function purgeLocalWorkspace(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_MATRICES);
    localStorage.removeItem(STORAGE_KEY_FOLDERS);
    localStorage.removeItem(STORAGE_KEY_PREFS);
  }
}
