import { useState } from 'react';
import Folder from '../types/Folder';
// import './FolderTree.css';

interface Props {
  folders: Folder[];
  onFolderDelete: (id: string) => void;
}

function FolderTree(props: Props) {
  const [selectedFolderId, setSelectedFolderId] = useState('');

  const handleFolderClick = (id: string) => {
    setSelectedFolderId(id);
  };

  const handleFolderDelete = (id: string) => {
    props.onFolderDelete(id);
  };

  const renderFolder = (folder: Folder) => {
    return (
      <li key={folder._id}>
        <span className={`folder ${folder._id === selectedFolderId ? 'selected' : ''}`} onClick={() => handleFolderClick(folder._id)}>
          {folder.name}
        </span>
        <button onClick={() => handleFolderDelete(folder._id)}>Delete</button>
        {folder.children.length > 0 && (
          <ul className="subfolders">
            {folder.children.map((child: any) => (
              <li key={child._id}>{renderFolder(child)}</li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return <ul className="FolderTree">{props.folders.map((folder: any) => renderFolder(folder))}</ul>;
}

export default FolderTree;