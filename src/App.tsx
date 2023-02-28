import { useState, useEffect } from 'react';
import axios from 'axios';
import FolderTree from './components/FolderTree';
import './App.css';

function App() {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderParent, setNewFolderParent] = useState('');

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get('/api/folders');
        setFolders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFolders();
  }, []);

  const handleNewFolderSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post('/api/folders', { name: newFolderName, parent: newFolderParent });
      setNewFolderName('');
      setNewFolderParent('');
      const response = await axios.get('/api/folders');
      setFolders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFolderDelete = async (id: string) => {
    try {
      await axios.delete(`/api/folders/${id}`);
      const response = await axios.get('/api/folders');
      setFolders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Folder Structure Viewer</h1>
      <form onSubmit={handleNewFolderSubmit}>
        <label>
          Name:
          <input type="text" value={newFolderName} onChange={(event) => setNewFolderName(event.target.value)} />
        </label>
        <label>
          Parent:
          <select value={newFolderParent} onChange={(event) => setNewFolderParent(event.target.value)}>
            <option value="">(None)</option>
            {folders.map((folder: any) => (
              <option key={folder._id} value={folder._id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create Folder</button>
</form>
<FolderTree folders={folders} onFolderDelete={handleFolderDelete} />
</div>
);
}

export default App;
