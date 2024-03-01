import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useStore } from "../../store/StoreProvider";
import { Folder } from "../../store/types";
import FolderItem from "../../components/Folder/Folder";
import FileItem from "../../components/File/File";
import "./FileManager.css";
import CreateFolder from "./CreateFolder/CreateFolder";

const FileManager = () => {
  const { folders, setFolders, images, setImagePreview } = useStore();

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    const sourceFolder = folders[source.droppableId];
    const destFolder = folders[destination.droppableId];
    const sourceItems = [...sourceFolder.items];
    const destItems =
      destination.droppableId === source.droppableId
        ? sourceItems
        : [...destFolder.items];

    // Moving items within the folder or to another folder
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    // Updating state with the new folders and items
    const newFolders: Record<string, Folder> = {
      ...folders,
      [source.droppableId]: { ...sourceFolder, items: sourceItems },
    };

    if (source.droppableId !== destination.droppableId) {
      newFolders[destination.droppableId] = { ...destFolder, items: destItems };
    }

    setFolders(newFolders);
  };

  return (
    <div data-testid="@file-manager/container">
      <CreateFolder />
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(folders).map(([folderId, folder]) => (
          <Droppable droppableId={folderId} key={folderId}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div>
                  <FolderItem name={folder.name} />
                </div>
                <ul>
                  {folder.items.length ? (
                    folder.items.map((imageId, index) => (
                      <Draggable
                        key={imageId}
                        draggableId={imageId}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <FileItem
                              name={images[imageId].name}
                              onClick={() =>
                                setImagePreview(images[imageId].resultBase64)
                              }
                            />
                          </li>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <li>
                      <p className="empty-folder">No files yet!</p>
                    </li>
                  )}

                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default FileManager;
