export interface ILesson {
  _id?: string;
  name: string;
  filepath?: string;
  file?: File | null;
  progress?: number;
  isUploading?: boolean;
  course?: string;
  sectionId?: string;
  free: boolean;
  createdAt?: string;
  updatedAt?: string;
  position?: number;
}
