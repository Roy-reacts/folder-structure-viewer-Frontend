interface Folder {
    _id: string;
    name: string;
    parent: string | null;
    children: Folder[];
  }
  
  export default Folder;
  