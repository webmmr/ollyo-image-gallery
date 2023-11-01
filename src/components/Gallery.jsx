import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const images = [
  {
    id: "image1",
    src: "/images/image-1.webp",
  },
  {
    id: "image2",
    src: "/images/image-2.webp",
  },
  {
    id: "image3",
    src: "/images/image-3.webp",
  },
  {
    id: "image4",
    src: "/images/image-4.webp",
  },
  {
    id: "image5",
    src: "/images/image-5.webp",
  },
  {
    id: "image6",
    src: "/images/image-6.webp",
  },
  {
    id: "image7",
    src: "/images/image-7.webp",
  },
  {
    id: "image8",
    src: "/images/image-8.webp",
  },
  {
    id: "image9",
    src: "/images/image-9.webp",
  },
  {
    id: "image10",
    src: "/images/image-10.jpeg",
  },
  {
    id: "image11",
    src: "/images/image-11.jpeg",
  },
];

export default function Gallery() {
  const [isSelected, setIsSelected] = useState([]);
  const [gallery, setGallery] = useState(images);

  // Checking and Selecting which items are selected
  function handleChange(e) {
    const { value, checked } = e.target;

    if (checked) {
      setIsSelected((prev) => [...prev, value]);
    }
  }

  // Deleting Selected Items and updating the gallery
  function handleDelete() {
    const updatedGalley = gallery.filter((item) => {
      if (!isSelected.includes(item.id)) return item;
    });

    setGallery(updatedGalley);
  }

  // Rearranging the gallery after the drag and drop
  function handleOnDragEnd(final) {
    if (!final.destination) return;

    const updatedGallery = Array.from(gallery);
    const [reorderedItem] = updatedGallery.splice(final.source.index, 1);
    updatedGallery.splice(final.destination.index, 0, reorderedItem);

    setGallery(updatedGallery);
  }

  return (
    <section className="container">
      <div className="header">
        <p>{isSelected.length} Images Selected</p>
        {isSelected.length > 0 && (
          <button onClick={handleDelete}>Delete Images</button>
        )}
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <ul
              className="gallery"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {gallery.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <li
                        className={`gallery-item gallery-item-${index + 1}`}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <input
                          type="checkbox"
                          name="galleryImages"
                          id={item.id}
                          value={item.id}
                          onChange={handleChange}
                        />
                        <img src={item.src} alt={item.id} />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
}
