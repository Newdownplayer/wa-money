type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createAt?: string;
};
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated'
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void
}
type DataSourceItem = {
  text: string;
  value: string;
}
type RootState = {
  recordList: RecordItem[],
  createRecordError: Error | null,
  tagList: Tag[],
  currentTag?: any,
}
type Result = {
  title: string;
  items: RecordItem[];
  total?: number;
}

interface Window {


}
