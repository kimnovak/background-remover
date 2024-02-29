import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useStore } from "../../store/StoreProvider";
import { Folder } from "../../store/types";

const FileManager = () => {
  // TODO extract to hook
  const { folders, setFolders, images } = useStore();

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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(folders).map(([folderId, folder]) => (
          <Droppable droppableId={folderId} key={folderId}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div>{folder.name}</div>
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
                            {images[imageId].name}
                          </li>
                        )}
                      </Draggable>
                    ))
                  ) : (
                    <p>No files yet!</p>
                  )}

                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </>
  );
};

export default FileManager;
